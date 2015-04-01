var margin2 = { top: 20, right: 30, bottom: 20, left: 30 };

var width2 = 1000,
	width2 = width2 - margin2.left - margin2.right,
	height2 = width2 * 0.4,
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

var g2 = svg2.append('g')
	.attr('transform', 'translate('+ margin2.left +','+ margin2.top +')');

var tooltip = d3.select('body')
				.append('div')
				.attr('id', 'tooltip');

var xScale = d3.scale.linear()
	.domain([0, 70])
	.range([80, width2 - 30]);

var yScale = d3.scale.linear()
	.domain([getLogValue(1), getLogValue(23816)])
	.range([height2 - 100, 60]);

queue()
	.defer(d3.csv, 'viruses.csv')
	.await(ready);

function ready(error, viruses) {

	getGuideVirus();
	getGuideHost();

	lines = g2.selectAll('.line')
			.data(viruses)
				.enter()
			.append('line')
				.attr('x1', function(d,i) { return xScale(i); })
				.attr('y1', function() { return yScale(0); })
				.attr('x2', function(d,i) { return xScale(i); })
				.attr('y2', function(d,i) {  return yScale( getLogValue(d.Count)); })
				// .attr('stroke', '#92A7B4')
				.attr('stroke', function(d) {
					return getColorVirus(d.Host_type);
				})
				.style('opacity', 0.22)
				.attr('stroke-width', 1)
			.on('mouseover', function(d) {
				tooltip.text(d.Virus_name + ': ' + d.Count);
				tooltip.style('visibility', 'visible');

				d3.select(this).attr("stroke-width", 2);
				d3.select(this).style('opacity', 0.99);
			})
			.on('mousemove', function() {
				tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
			})
			.on('mouseout', function(d) {
				tooltip.style('visibility', 'hidden');

				d3.select(this).attr("stroke-width", 1);
				d3.select(this).style('opacity', 0.22);
			});

	dots = g2.selectAll('.dot')
			.data(viruses)
				.enter()
			.append('circle')
				.attr('cx', function(d,i) { return xScale(i); })
				.attr('cy', function(d,i) {  return yScale( getLogValue(d.Count)); })
				.attr('r', 3)
				.attr('stroke', '#92A7B4')
				.attr('stroke-width', 0)
				// .style('fill', '#92A7B4')
				.style('fill', function(d) {
					return getColorVirus(d.Host_type);
				})
				.style('fill-opacity', 0.85)
			.on('mouseover', function(d) {
				tooltip.text(d.Virus_name + ': ' + d.Count);
				tooltip.style('visibility', 'visible');

				d3.select(this).transition().duration(0).attr('r', 5);
				d3.select(this).style('opacity', 0.99);
			})
			.on('mousemove', function() {
				tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
			})
			.on('mouseout', function(d) {
				tooltip.style('visibility', 'hidden');
				d3.select(this).style('opacity', 0.8);
				d3.select(this).attr('r', 3);
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

	lines.transition().duration(430)
		.attr('x1', function(d) { return xScale(d.Order); })
		.attr('x2', function(d) { return xScale(d.Order); });

	dots.transition().duration(430)
		.attr('cx', function(d) { return xScale(d.Order); });
}

function updateByHost() {

	lines.transition().duration(430)
		.attr('x1', function(d, i) { return xScale(i); })
		.attr('x2', function(d, i) { return xScale(i); });

	dots.transition().duration(430)
		.attr('cx', function(d, i) { return xScale(i); });
}

function getLogValue(d) {

	return Math.log10(d);
}

function getColorVirus(d) {

	if(d == 'Animal') { return '#6ab8f7'; } // blue
	else if(d == 'Bacteria') { return 'rgba(255,255,255,0.86)'; } // white
	// else if(d == 'Bacteria') { return '#92A7B4'; } // gray
	else if(d == 'Plant') { return '#00E3CD'; }  // green: 00E3CD, FF916F
	else { return '#F8877F'; } // #F8877F ,  80C883
}

var lineValues = [1, 10, 100, 1000, 10000, 100000];

function getGuideVirus() {

	for(var i = 0; i < lineValues.length; i++) {

		var r = lineValues[i];

		g2.append('line')
			.attr('x1', xScale(0) )
			.attr('y1', yScale( getLogValue(r) ) )
			.attr('x2', xScale(70) )
			.attr('y2', yScale( getLogValue(r) ) )
			.attr('stroke', '#92A7B4')
			.attr('stroke-width', 0.5)
			.style("stroke-dasharray", ("1,4"));

		g2.append('text')
			.attr('class', 'scaleText')
			.attr('x',xScale(0) - 10)
			.attr('y', yScale( getLogValue(r) ) )
			.text(r)
			.style('opacity', 1)
			.attr('stroke-width', 1)
			.style("text-anchor", "end");
	}
}

function getGuideHost() {

	// line
	line_bacteria = g2.append('line')
			.attr('x1', xScale(0))
			.attr('x2', xScale(35))
			.attr('y1', yScale(0) + 30)
			.attr('y2', yScale(0) + 30)
			.attr('stroke', 'rgba(255,255,255,0.86)')
			.attr('stroke-width', 1.2);

	line_animal = g2.append('line')
			.attr('x1', xScale(36))
			.attr('x2', xScale(64))
			.attr('y1', yScale(0) + 30)
			.attr('y2', yScale(0) + 30)
			.attr('stroke', '#6ab8f7')
			.attr('stroke-width', 1.2);

	line_plant = g2.append('line')
			.attr('x1', xScale(65))
			.attr('x2', xScale(67))
			.attr('y1', yScale(0) + 30)
			.attr('y2', yScale(0) + 30)
			.attr('stroke', '#00E3CD')
			.attr('stroke-width', 1.2);

	line_unknown = g2.append('line')
			.attr('x1', xScale(68))
			.attr('x2', xScale(70))
			.attr('y1', yScale(0) + 30)
			.attr('y2', yScale(0) + 30)
			.attr('stroke', '#F8877F')
			.attr('stroke-width', 1.2);

	// text
	text_bacteria = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale(0))
			.attr('y', yScale(0) + 50)
			.text('Bacteria')
			.style('fill', 'rgba(255,255,255,0.86)')
			.style("text-anchor", "start");

	text_animal = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale(36))
			.attr('y', yScale(0) + 50)
			.text('Animal')
			.style('fill', '#6ab8f7')
			.style("text-anchor", "start");

	text_plant = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale(65))
			.attr('y', yScale(0) + 50)
			.text('Plant')
			.style('fill', '#00E3CD')
			.style("text-anchor", "start");

	text_unknown = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale(68))
			.attr('y', yScale(0) + 50)
			.text('Unknown')
			.style('fill', '#F8877F')
			.style("text-anchor", "start");

}
