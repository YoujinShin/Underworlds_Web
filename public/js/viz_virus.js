var margin2 = { top: 20, right: 30, bottom: 20, left: 30 };

var width2 = 1000,
	width2 = width2 - margin2.left - margin2.right,
	height2 = width2 * 0.5,
	height2 = height2 - margin2.top - margin2.bottom;

var svg2 = d3.select('#viz_virus').append('svg')
	.attr('width', width2 + margin2.left + margin2.right)
	.attr('height', height2 + margin2.top + margin2.bottom);

svg2.append('rect')
	// .attr('x', -margin2.left)
	// .attr('y', -margin2.top)
	.attr('width', width2 + margin2.left + margin2.right)
	.attr('height', height2 + margin2.top + margin2.bottom)
	.style('fill', '#14202D');

var g = svg2.append('g')
	.attr('transform', 'translate('+ margin2.left +','+ margin2.top +')');

var tooltip = d3.select('body')
				.append('div')
				.attr('id', 'tooltip');

var xScale = d3.scale.linear()
	.domain([0, 70])
	.range([10, width2 - 10]);

var yScale = d3.scale.linear()
	.domain([0, getLogValue(23816) ])
	.range([height2 - 10, 10]);

// console.log(yScale( 0 ));

queue()
	.defer(d3.csv, 'viruses.csv')
	.await(ready);

function ready(error, viruses) {

	// console.log(viruses.length);
	lines = g.selectAll('.line')
			.data(viruses)
				.enter()
			.append('line')
				.attr('x1', function(d,i) { return xScale(i); })
				.attr('y1', function() { return yScale(0); })
				.attr('x2', function(d,i) { return xScale(i); })
				.attr('y2', function(d,i) {  return yScale( getLogValue(d.Count)); })
				.attr('stroke', 'rgba(255,255,255,0.3)')
				.attr('stroke-width', 1.3)
			.on('mouseover', function(d) {
				tooltip.text(d.Virus_name + ': ' + d.Count);
				tooltip.style('visibility', 'visible');
			})
			.on('mousemove', function() {
				tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
			})
			.on('mouseout', function(d) {
				tooltip.style('visibility', 'hidden');
			});

	dots = g.selectAll('.dot')
			.data(viruses)
				.enter()
			.append('circle')
				.attr('cx', function(d,i) { return xScale(i); })
				.attr('cy', function(d,i) {  return yScale( getLogValue(d.Count)); })
				.attr('r', 4)
				.attr('stroke', '#fff')
				.attr('stroke-width', 0)
				.style('fill', 'rgba(255,255,255,0.6)')
			.on('mouseover', function(d) {
				tooltip.text(d.Virus_name + ': ' + d.Count);
				tooltip.style('visibility', 'visible');
			})
			.on('mousemove', function() {
				tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
			})
			.on('mouseout', function(d) {
				tooltip.style('visibility', 'hidden');
			});
}

d3.select(".count")
	.on("click", function(){
		updateByCount();
	});

d3.select(".host")
	.on("click", function(){
		updateByHost();
	});

function updateByCount() {

		lines
			.transition()
				.duration(430)
			.attr('x1', function(d) { return xScale(d.Order); })
			.attr('x2', function(d) { return xScale(d.Order); });

		dots
			.transition()
				.duration(430)
			.attr('cx', function(d) { return xScale(d.Order); });
}

function updateByHost() {

		lines
			.transition()
				.duration(430)
			.attr('x1', function(d, i) { return xScale(i); })
			.attr('x2', function(d, i) { return xScale(i); });

		dots
			.transition()
				.duration(430)
			.attr('cx', function(d, i) { return xScale(i); });
}

function getLogValue(d) {

	return Math.log10(d);
}