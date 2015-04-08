var margin2 = { top: 10, right: 30, bottom: 20, left: 0 };

var width2 = 1020,
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

// var tooltip = d3.select('body')
// 				.append('div')
// 				.attr('id', 'tooltip');

var xScale2 = d3.scale.linear()
	.domain([0, 70])
	.range([60, width2 - 20]);

var yScale2 = d3.scale.linear()
	.domain([getLogValue(1), getLogValue(23816)])
	.range([height2 - 100, 60]);

queue()
	.defer(d3.csv, 'viruses.csv')
	.await(ready);

function ready(error, viruses) {

	getGuideVirus();
	getGuideHost();

	lines_virus = g2.selectAll('.line')
			.data(viruses)
				.enter()
			.append('line')
				.attr('x1', function(d,i) { return xScale2(i); })
				.attr('y1', function() { return yScale2(0); })
				.attr('x2', function(d,i) { return xScale2(i); })
				.attr('y2', function(d,i) {  return yScale2( getLogValue(d.Count)); })
				// .attr('stroke', '#92A7B4')
				.attr('stroke', function(d) {
					return getColorVirus(d.Host_type);
				})
				.style('opacity', 0.22)
				.attr('stroke-width', 1)
			.on('mouseover', function(d) {
				tooltip.text(d.Virus_name);
				selectDots_virus(d.Virus_name);
				// tooltip.text(d.Virus_name + ': ' + d.Count);
				tooltip.style('visibility', 'visible');

				d3.select(this).attr("stroke-width", 1.6);
				d3.select(this).style('opacity', 0.99);
			})
			.on('mousemove', function() {
				tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
			})
			.on('mouseout', function(d) {
				unselectDots_virus();
				unselectLines_virus();
				tooltip.style('visibility', 'hidden');

				d3.select(this).attr("stroke-width", 1);
				d3.select(this).style('opacity', 0.22);
			});

	dots_virus = g2.selectAll('.dot')
			.data(viruses)
				.enter()
			.append('circle')
				.attr('cx', function(d,i) { return xScale2(i); })
				.attr('cy', function(d,i) {  return yScale2( getLogValue(d.Count)); })
				.attr('r', 2.4)
				.attr('stroke', '#92A7B4')
				.attr('stroke-width', 0)
				// .style('fill', '#92A7B4')
				.style('fill', function(d) {
					return getColorVirus(d.Host_type);
				})
				.style('fill-opacity', 0.85)
			.on('mouseover', function(d) {
				tooltip.text(d.Virus_name);
				selectLines_virus(d.Virus_name);
				// tooltip.text(d.Virus_name + ': ' + d.Count);
				tooltip.style('visibility', 'visible');

				d3.select(this).transition().duration(330).attr('r', 5);
				d3.select(this).style('opacity', 0.99);
			})
			.on('mousemove', function() {
				tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
			})
			.on('mouseout', function(d) {
				unselectDots_virus();
				unselectLines_virus();

				tooltip.style('visibility', 'hidden');
				d3.select(this).style('opacity', 0.8);
				d3.select(this).attr('r', 2.4);
			});
}

d3.select(".count")
	.on("click", function(){
		clicked = true;
		animation();

		updateByCount();
		
	});

d3.select(".host")
	.on("click", function(){
		clicked = true;
		animation();

		updateByHost();
	});

function updateByCount() {

	lines_virus.transition().duration(430)
		.attr('x1', function(d) { return xScale2(d.Order); })
		.attr('x2', function(d) { return xScale2(d.Order); });

	dots_virus.transition().duration(430)
		.attr('cx', function(d) { return xScale2(d.Order); });

	updateGuideHost_count();
}

function updateByHost() {

	lines_virus.transition().duration(430)
		.attr('x1', function(d, i) { return xScale2(i); })
		.attr('x2', function(d, i) { return xScale2(i); });

	dots_virus.transition().duration(430)
		.attr('cx', function(d, i) { return xScale2(i); });

	updateGuideHost_host();
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
			.attr('x1', xScale2(0) )
			.attr('y1', yScale2( getLogValue(r) ) )
			.attr('x2', xScale2(70) )
			.attr('y2', yScale2( getLogValue(r) ) )
			.attr('stroke', '#92A7B4')
			.attr('stroke-width', 0.5)
			.style("stroke-dasharray", ("1,4"));

		g2.append('text')
			.attr('class', 'scaleText')
			.attr('x',xScale2(0) - 20)
			.attr('y', yScale2( getLogValue(r) ) )
			.text(r)
			.style('opacity', 1)
			.attr('stroke-width', 1)
			.style("text-anchor", "end");
	}
}

function updateGuideHost_count() {

	var gap = ( xScale2(70) - xScale2(0) )/4;

	line_bacteria.transition().duration(430)
		.attr('x2', xScale2(0) + 10);

	line_animal.transition().duration(430)
		.attr('x1', xScale2(0) + gap )
		.attr('x2', xScale2(0) + gap + 10);

	line_plant.transition().duration(430)
		.attr('x1', xScale2(0) + gap*2 )
		.attr('x2', xScale2(0) + gap*2 + 10);

	line_unknown.transition().duration(430)
		.attr('x1', xScale2(0) + gap*3 )
		.attr('x2', xScale2(0) + gap*3 + 10);

	text_animal.transition().duration(430)
		.attr('x', xScale2(0) + gap );

	text_plant.transition().duration(430)
		.attr('x', xScale2(0) + gap*2 );

	text_unknown.transition().duration(430)
		.attr('x', xScale2(0) + gap*3 );
}

function updateGuideHost_host() {

	line_bacteria.transition().duration(430)
		.attr('x2', xScale2(35));

	line_animal.transition().duration(430)
		.attr('x1', xScale2(36))
		.attr('x2', xScale2(64));

	line_plant.transition().duration(430)
		.attr('x1', xScale2(65))
		.attr('x2', xScale2(67));

	line_unknown.transition().duration(430)
		.attr('x1', xScale2(68))
		.attr('x2', xScale2(70));

	text_animal.transition().duration(430)
		.attr('x', xScale2(36));

	text_plant.transition().duration(430)
		.attr('x', xScale2(65));

	text_unknown.transition().duration(430)
		.attr('x', xScale2(68));
}

function getGuideHost() {

	// line
	line_bacteria = g2.append('line')
			.attr('x1', xScale2(0))
			.attr('x2', xScale2(35))
			.attr('y1', yScale2(0) + 30)
			.attr('y2', yScale2(0) + 30)
			.attr('stroke', 'rgba(255,255,255,0.86)')
			.attr('stroke-width', 1.2);

	line_animal = g2.append('line')
			.attr('x1', xScale2(36))
			.attr('x2', xScale2(64))
			.attr('y1', yScale2(0) + 30)
			.attr('y2', yScale2(0) + 30)
			.attr('stroke', '#6ab8f7')
			.attr('stroke-width', 1.2);

	line_plant = g2.append('line')
			.attr('x1', xScale2(65))
			.attr('x2', xScale2(67))
			.attr('y1', yScale2(0) + 30)
			.attr('y2', yScale2(0) + 30)
			.attr('stroke', '#00E3CD')
			.attr('stroke-width', 1.2);

	line_unknown = g2.append('line')
			.attr('x1', xScale2(68))
			.attr('x2', xScale2(70))
			.attr('y1', yScale2(0) + 30)
			.attr('y2', yScale2(0) + 30)
			.attr('stroke', '#F8877F')
			.attr('stroke-width', 1.2);

	// text
	text_bacteria = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale2(0))
			.attr('y', yScale2(0) + 50)
			.text('Bacteria')
			.style('fill', 'rgba(255,255,255,0.86)')
			.style("text-anchor", "start");

	text_animal = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale2(36))
			.attr('y', yScale2(0) + 50)
			.text('Animal')
			.style('fill', '#6ab8f7')
			.style("text-anchor", "start");

	text_plant = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale2(65))
			.attr('y', yScale2(0) + 50)
			.text('Plant')
			.style('fill', '#00E3CD')
			.style("text-anchor", "start");

	text_unknown = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale2(68))
			.attr('y', yScale2(0) + 50)
			.text('Unknown')
			.style('fill', '#F8877F')
			.style("text-anchor", "start");

	text_host = g2.append('text')
			.attr('class', 'virusHost')
			// .attr('x', xScale2(70) + 40)
			.attr('x', xScale2(0) - 20)
			.attr('y', yScale2(0) + 50)
			.text('HOST')
			.style('fill', '#aaa')
			// .style('fill', 'rgba(255,255,255,0.6)')
			.style("text-anchor", "end");

	text_count = g2.append('text')
			.attr('class', 'virusHost')
			.attr('x', xScale2(0) - 20)
			.attr('y', yScale2(getLogValue(23816)) - 50)
			.text('COUNT')
			.style('fill', '#aaa')
			.style("text-anchor", "end");


	text_title = g2.append('text')
			.attr('class', 'middleTextBIG')
			.attr('x', xScale2(35))
			.attr('y', yScale2(getLogValue(23816)) - 0)
			.text('SEWAGE VIRUS PROFILE')
			.style('fill', '#fff')
			.style("text-anchor", "middle");

}
