var radiusValues = [1, 10, 100, 1000, 10000, 100000];
// var pos_left_x = - width * 0.35;
// var pos_left_x = width * 0.6-20;
var pos_left_x = -width * 0.31;

function radiusGuide() {

	for(var i = 0; i < radiusValues.length; i++) {

		var r = radiusValues[i];
		var x = -innerRadius - 140;
		// var x = 0;

		g.append('circle')
			.attr('r', linearScale( Math.log10(r) ) )
			.attr('cx', 0)
			.attr('cy', 0)
			.style('fill', '#fff')
			.style('opacity', 0.1)
			.attr('stroke', '#fff')
			.attr('stroke-width', function() {
				if(i==0) { return 0.5; }
				else { return 0.5; }
			})
			.style('fill-opacity', 0.0);

		g.append('text')
			.attr('class', 'scaleText')
			.attr('x',x)
			.attr('y', Math.sin(Math.PI/2) * linearScale( Math.log10(r) ) +0)
			.text(r)
			.style('opacity', 1)
			.attr('stroke-width', 1)
			.style("text-anchor", "end");

		g.append('line')
			.attr('x1', 0 )
			.attr('y1', Math.sin(Math.PI/2) * linearScale( Math.log10(r) ) )
			.attr('x2', x)
			.attr('y2', Math.sin(Math.PI/2) * linearScale( Math.log10(r) ) )
			.text(r)
			.attr('stroke', '#fff')
			.style("stroke-dasharray", ("1,4"))
			.style('opacity', 0.17)
			.attr('stroke-width', 1);
	}
}


function textGuide() {

	g.append('text')
		// .attr('class', 'middleText')
		.attr('class', 'middleTextBIG')
		.attr('x', -innerRadius - 140)
		.attr('y', 3 - 8)
		.text('TAXONOMICAL') 
		// .text('Taxonomical') //Taxonomy
		.attr('stroke-width', 1)
		.style("text-anchor", "end");

	g.append('text')
		.attr('class', 'middleTextBIG')
		.attr('x', -innerRadius - 140)
		.attr('y', 3 + 8)
		.text('HITS') //Taxonomy
		.attr('stroke-width', 1)
		.style("text-anchor", "end");

	g.append('text')
		.attr('class', 'middleTextBIG')
		.attr('x', 0)
		.attr('y', -15 )
		.text('SEWAGE') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "middle");

	g.append('text')
		.attr('class', 'middleTextBIG')
		.attr('x', 0)
		.attr('y', 5 )
		.text('BACTERIAL') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "middle");

	g.append('text')
		.attr('class', 'middleTextBIG')
		.attr('x', 0)
		.attr('y', 25)
		.text('PROFILE') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "middle");
}

var domain_taxo, phylum_taxo, class_taxo, order_taxo, 
	family_taxo, genus_taxo;

var domain_name, phylum_name, class_name, order_name, 
	family_name, genus_name, selected, selectedBox;

var yScale = d3.scale.linear()
				.domain([0, 5])  
				.range([-height*0.18 + 3, height*0.18 + 3]);
				// .range([-90, outerRadius-90]);
				// .range([-height*0.18, height*0.25]);

// phylum,class,order,family,genus,value
// var xpos = -1 * pos_left_x + 36;
var xpos = innerRadius + 140
var xpos2 = xpos+ 70;

function texonomyList() {

	// g.append('line') // right
	// 	.attr('x1', radius - 15)
	// 	.attr('y1', 0)
	// 	.attr('x2', -pos_left_x+20)
	// 	.attr('y2', 0)
	// 	.attr('stroke-width', 0.45)
	// 	.attr("stroke", "#fff")
	// 	.style("text-anchor", "start");

	// g.append('line') // right vertical
	// 	.attr('x1', -pos_left_x+20)
	// 	.attr('y1', yScale(0)-5-3)
	// 	.attr('x2', -pos_left_x+20)
	// 	.attr('y2', yScale(5)+5-3)
	// 	.attr('stroke-width', 0.45)
	// 	.attr("stroke", "#fff")
	// 	.style("text-anchor", "start");

	g.append('line') // left
		.attr('x1', -outerRadius-9)
		.attr('y1', 0)
		.attr('x2', pos_left_x -10)
		.attr('y2', 0)
		.attr('stroke-width', 0.45)
		.attr("stroke", "#fff")
		.style("text-anchor", "start");

	g.append('line') // left vertical
		.attr('x1', pos_left_x - 10)
		.attr('y1', -15)
		.attr('x2', pos_left_x - 10)
		.attr('y2', 15)
		.attr('stroke-width', 0.45)
		.attr("stroke", "#fff")
		.style("text-anchor", "start");

	domain_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(0) )
		.text('DOMAIN') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "start");

	phylum_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(1) )
		.text('PHYLUM') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "start");

	class_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(2) )
		.text('CLASS') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "start");

	order_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(3) )
		.text('ORDER') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "start");

	family_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(4) )
		.text('FAMILY') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "start");

	genus_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(5) )
		.text('GENUS') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "start");

	/////////////////////////////////////
	domain_name = g.append('text')
		.attr('class', 'selected')
		.attr('x', xpos2)
		.attr('y', yScale(0) )
		.text('Bacteria') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "start");

	phylum_name = g.append('text')
		.attr('class', 'selected')
		.attr('x', xpos2)
		.attr('y', yScale(1) )
		.text('PHYLUM') //Bacterial Profile
		.attr('stroke-width', 1)
		.style('fill-opacity', 0)
		.style("text-anchor", "start");

	class_name = g.append('text')
		.attr('class', 'selected')
		.attr('x', xpos2)
		.attr('y', yScale(2) )
		.text('CLASS') //Bacterial Profile
		.attr('stroke-width', 1)
		.style('fill-opacity', 0)
		.style("text-anchor", "start");

	order_name = g.append('text')
		.attr('class', 'selected')
		.attr('x', xpos2)
		.attr('y', yScale(3) )
		.text('ORDER') //Bacterial Profile
		.attr('stroke-width', 1)
		.style('fill-opacity', 0)
		.style("text-anchor", "start");

	family_name = g.append('text')
		.attr('class', 'selected')
		.attr('x', xpos2)
		.attr('y', yScale(4) )
		.text('FAMILY') //Bacterial Profile
		.attr('stroke-width', 1)
		.style('fill-opacity', 0)
		.style("text-anchor", "start");

	genus_name = g.append('text')
		.attr('class', 'selected')
		.attr('x', xpos2)
		.attr('y', yScale(5) )
		.text('GENUS') //Bacterial Profile
		.attr('stroke-width', 1)
		.style('fill-opacity', 0)
		.style("text-anchor", "start");

	var box_w = 84;

	selectedBox = g.append('rect')
		.attr('x', xpos -12)
		.attr('y', yScale(0) - 20 )
		.attr('width', box_w)
		.attr('height', 30)
		.style('fill', 'rgba(0,0,0,0)')
		.attr('stroke-width', 0)
		.attr('stroke', '#fff');
}

function changeSelectedBox(depth) {

	selectedBox.transition().duration(300).attr('y', yScale(depth) - 20);
}

function changeTaxoName(p, c, o, f, g) {

	phylum_name.text(p);
	phylum_name.transition().duration(100).style('fill-opacity', 0.9);

	class_name.text(c);
	class_name.transition().duration(100).style('fill-opacity', 0.9);

	order_name.text(o);
	order_name.transition().duration(100).style('fill-opacity', 0.9);

	family_name.text(f);
	family_name.transition().duration(100).style('fill-opacity', 0.9);

	genus_name.text(g);
	genus_name.transition().duration(100).style('fill-opacity', 0.9);
}

var clicked = false;
var myVar;

function makeButton() {

	var dy = -10;
	var w = 50;
	var h = w * 0.6;

	var tx = -pos_left_x+20 + 10 + 25 +13;
	var ty = 160 + 10 + dy - 2;

	play = g.append("polygon")
		.attr('points', "340,157, 340,171, 357,164")
		.style('fill', '#fff')
		.style('fill-opacity', 0.3)
		.attr('stroke', '#fff')
		.style('visibility', 'hidden')
		.attr('stroke-width', 0); // 1.4

	stop1 = g.append('rect')
		.attr('x',  -pos_left_x+20 + 10 + 22-6)
		.attr('y', 160 + 10+ dy - 2)
		.attr('width', 5)
		.attr('height', h*0.46)
		.style('fill', '#fff')
		.style('fill-opacity', 0.3)
		.attr('stroke', '#fff')
		// .style('opacity', 0.40)
		.style('visibility', 'hidden')
		.attr('stroke-width', 0); // 1.4

	stop2 = g.append('rect')
		.attr('x',  -pos_left_x+20 + 10 + 22 + 15-7)
		.attr('y', 160 + 10+ dy-2)
		.attr('width', 5)
		.attr('height', h*0.46)
		.style('fill', '#fff')
		.style('fill-opacity', 0.3)
		.attr('stroke', '#fff')
		// .style('opacity', 0.40)
		.style('visibility', 'hidden')
		.attr('stroke-width', 0);

	button = g.append('rect')
		.attr('x',  -pos_left_x+20 + 10)
		.attr('y', 160+ dy)
		// .attr('y', outerRadius - 60)
		.attr('width', w) // 64
		.attr('height', h) // 36
		.style('fill', '#fff')
		.style('fill-opacity', 0.05)
		.attr('stroke', '#fff')
		.attr('stroke-width', 0)
		.style('visibility', 'hidden')
		.on("mouseover", function() {
			d3.select(this).transition().duration(180).style('fill-opacity', 0.08);
		})
		.on("mouseout", function() {
			d3.select(this).transition().duration(180).style('fill-opacity', 0.04);
		})
		.on('click', function() {

			animation();
		});

}

function animation() {
	if(clicked) {
				clicked = false;
				// play.style('visibility', 'visible');
				// stop1.style('visibility', 'hidden');
				// stop2.style('visibility', 'hidden');
			} else {
				clicked = true;
				// play.style('visibility', 'hidden');
				// stop1.style('visibility', 'visible');
				// stop2.style('visibility', 'visible');
			}

			if(clicked) {
				myVar = setInterval(function(){

					order++;
					if(order > 510) {
						order = 0;
					}else if(order < 0) {
						order = 510;
					}

					selectOne();
				}, 120);
				// setInterval(function(){ alert("Hello"); }, 3000);

			} else {
				clearTimeout(myVar);
			}
}