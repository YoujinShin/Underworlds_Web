var margin = { top: 10, right: 30, bottom: 30, left: 30 };

var width = 1000,
	width = width - margin.left - margin.right,
	height = width * 0.63, // 0.66
	height = height - margin.top - margin.bottom;

var svg = d3.select('#viz').append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);

var tooltip = d3.select("body")
		.append("div")
		.attr("id", "tooltip");

svg.append('rect')
		.attr('x', -margin.left)
		.attr('y', -margin.top)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.style('fill', '#15202D'); // dark blue

var tx = width/2 + margin.left - 25;
var ty = height/2 + margin.top;

var g = svg.append('g')
			.attr('transform', 'translate('+ tx +','+ ty +')');

var innerRadius = height*0.27; // 0.3
var outerRadius = height*0.476; // 0.48

var linearScale = d3.scale.linear()
					.domain([0, 4.524]) // [0, max log value] -> radius
					.range([innerRadius, outerRadius]);

var angleScale = d3.scale.linear()
					.domain([0, 510]) // [0, size of data] -> axis
					// .range([0, 2 * Math.PI]); // 0 - 360 degree
					.range([-0.5 * Math.PI, 1.5 * Math.PI]);

queue()
	.defer(d3.csv, 'taxonomy_final_color.csv')
	.defer(d3.json, 'bacteria.json')
	.await(draw);

var radius = Math.min(width, height) / 2,
	radius = innerRadius * 1.095, 
    color = d3.scale.category20c();

var partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return 1; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { 
    	return innerRadius * (0.7 * 0.2 * d.depth + 0.3);
    })
    .outerRadius(function(d) { 
    	return innerRadius * (0.7 * 0.2 * (d.depth+1) + 0.3) - 1; 
    });
    // .innerRadius(function(d) { return Math.sqrt(d.y); })
    // .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

var lines;
var dots;
var path;

function draw(error, genus, root) {

	radiusGuide();
	textGuide();
	texonomyList();
	makeButton();

	lines = g.selectAll('.line')
					.data(genus)
				.enter().append('line')
					.attr('x1', function(d, i) { return getX1(d.value, i); })
					.attr('y1', function(d, i) { return getY1(d.value, i); })
					.attr('x2', function(d, i) { return getX(d.value, i); })
					.attr('y2', function(d, i) { return getY(d.value, i); })
					.style('opacity', 0.22) // 0.18 // 0.22
					.attr('stroke-width', 1.2)
					.attr('stroke', '#92A7B4')
					.on("mouseover", function(d, i) {

						unselectLine();
						unselectDots();

						order = i;
						clicked = true;
						// animation();

						var currentColor = getColor(d.phylum);
						
						d3.select(this).attr("stroke-width", 2);
						d3.select(this).style('opacity', 0.99);
						d3.select(this).attr("stroke", currentColor);
						
						selectParents2(d, path);

						selectDots2(d.genus, d.family, currentColor);
						selectArc(path, d.genus, d.family, d.order, d.class, d.phylum, 5);
					})
					.on("mousemove", function(){
						tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
					})
					.on("mouseout", function(d) {

						clicked = false;
						// animation();
						tooltip.style("visibility", "hidden");
					});

	dots = g.selectAll('.dot')
					.data(genus)
				.enter().append('circle')
					.style('opacity', 0.8)
					.attr('r', 1.7) //1.6
					.attr('cx', function(d, i) { return getX(d.value, i); })
					.attr('cy', function(d, i) { return getY(d.value, i); })
					.style('fill', '#92A7B4')
					.on("mouseover", function(d) {

						unselectLine();
						unselectDots();

						clicked = true;
						// animation();

						var currentColor = getColor(d.phylum);

						d3.select(this).style('fill', currentColor);
						d3.select(this).style('opacity', 0.99);

						selectParents2(d, path);
						selectLine(d.genus, d.family, currentColor);

						d3.select(this).transition().duration(480).attr('r', 5);
						selectArc(path, d.genus, d.family, d.order, d.class, d.phylum, 5);

						tooltip.text(d.genus +", " + d.value);
					})
					.on("mousemove", function(){

						tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
					})
					.on("mouseout", function(d) {

						clicked = false;
						// animation();

						tooltip.style("visibility", "hidden");
					});

	path = g.datum(root).selectAll("path") // ARC
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style('stroke', 'rgba(146,167,180,0.2)')
      .attr("stroke-width", 1.2) // 0.4,  1.1
      .style("fill", function(d) {

      	var phylum = getPhylum(d);
      	return getColor(phylum);
      }) // white
      .style("fill-opacity", 0.0) // 0.2
      .style("fill-rule", "evenodd")
      .style('visibility', function(d) {
      	if(d.depth == 5) {
      		return 'hidden';
      	} else {
      		return 'visible';
      	}
      })
      .each(stash)
      .on("mouseover", function(d) {

			clicked = true;
			// animation();

			d3.select(this).style("fill-opacity", 0.9);

			var currentColor = d3.select(this).style("fill");;

			tooltip.text(d.name);
			selectParents(d, path);
			selectChildren(d, currentColor);
		})
		.on("mousemove", function(){

			tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
		})
		.on("mouseout", function(d) {

			clicked = false;
			// animation();
			tooltip.style("visibility", "hidden");
		});

	selectOne();
	// animation();
}

function getX(d, i) {
	var r = linearScale( Math.log10(d) );
	var th = angleScale(i);

	return r * Math.cos(th);
} 

function getY(d, i) {
	var r = linearScale( Math.log10(d) );
	var th = angleScale(i);

	return r * Math.sin(th);
}

function getX1(d, i) {
	var r = innerRadius;
	var th = angleScale(i);

	return r * Math.cos(th);
} 

function getY1(d, i) {
	var r = innerRadius;
	var th = angleScale(i);

	return r * Math.sin(th);
}

// Stash the old values for transition.
function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
  var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
  return function(t) {
    var b = i(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
  };
}

d3.select(self.frameElement).style("height", height + "px");

var valueScale = d3.scale.linear()
					.domain([0, 1]) // [0, max log value] -> radius
					// .range([276, 475]);
					.range([0+1, 510-1]);

var order = Math.floor(valueScale(Math.random()) + 1);
// var order = 475;

function selectOne() {
	unselectDots();
	unselectLine();

	lines.each(function(d, i) {
		if(i == order) {
			var currentColor = getColor(d.phylum);

			d3.select(this).attr("stroke", currentColor);
			d3.select(this).attr("stroke-width", 1.6);
			d3.select(this).style('opacity', 0.9);

			selectParents2(d, path);

			selectDots3(d.genus, d.family, currentColor);
			selectArc(path, d.genus, d.family, d.order, d.class, d.phylum, 5);
		}
	});
}
