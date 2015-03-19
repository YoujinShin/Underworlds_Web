var radiusValues = [1, 10, 100, 1000, 10000, 100000];
// var pos_left_x = - width * 0.35;
// var pos_left_x = width * 0.6-20;
var pos_left_x = -width * 0.31;
// var pos_left_x = width/2 - 90;

function radiusGuide() {

	for(var i = 0; i < radiusValues.length; i++) {

		var r = radiusValues[i];
		var x = pos_left_x - 30;
		// var x = pos_left_x;
		// var x = -outerRadius;

		g.append('circle')
			.attr('r', linearScale( Math.log10(r) ) )
			.attr('cx', 0)
			.attr('cy', 0)
			.style('fill', '#fff')
			.style('opacity', 0.1)
			.attr('stroke', '#fff')
			.attr('stroke-width', function() {
				if(i==0) { return 1; } 
				else { return 0.5; }
			})
			.style('fill-opacity', 0.06);

		g.append('text')
			.attr('class', 'scaleText')
			.attr('x', x -25)
			// .attr('x', 0)
			.attr('y', Math.sin(Math.PI/2) * linearScale( Math.log10(r) ))
			// .attr('y', Math.sin(Math.PI/2) * linearScale( Math.log10(r) ) + 10)
			.text(r)
			.style('opacity', 1)
			.attr('stroke-width', 1)
			// .style("text-anchor", "middle");
			// .style("text-anchor", "start");
			.style("text-anchor", "end");

		g.append('line')
			.attr('x1', 0 )
			.attr('y1', Math.sin(Math.PI/2) * linearScale( Math.log10(r) ) )
			.attr('x2', x - 20)
			.attr('y2', Math.sin(Math.PI/2) * linearScale( Math.log10(r) ) )
			.text(r)
			.attr('stroke', '#fff')
			.style("stroke-dasharray", ("1,4"))
			.style('opacity', 0.17)
			.attr('stroke-width', 1);
	}
}


function textGuide() {

	// g.append('text')
	// 	.attr('class', 'middleText')
	// 	.attr('x', innerRadius + 72)
	// 	.attr('y', -7)
	// 	.text('Taxonomy') //Taxonomy
	// 	.attr('stroke-width', 1)
	// 	.style("text-anchor", "middle");

	g.append('text')
		.attr('class', 'middleText')
		.attr('x', -innerRadius - 139)
		.attr('y', 3)
		.text('Taxonomical Hits') //Taxonomy
		.attr('stroke-width', 1)
		.style("text-anchor", "middle");

	// g.append('text')
	// 	.attr('class', 'middleText')
	// 	.attr('x', 0)
	// 	.attr('y', 18)
	// 	.text('hits') //Taxonomy
	// 	.attr('stroke-width', 1)
	// 	.style("text-anchor", "middle");

	// g.append('text')
	// 	.attr('class', 'middleText')
	// 	.attr('x', outerRadius + 15)
	// 	.attr('y', 150)
	// 	.text('Hits') //Taxonomy
	// 	.attr('stroke-width', 1)
	// 	.style("text-anchor", "middle");

	// g.append('text')
	// 	.attr('class', 'middleTextBIG')
	// 	.attr('x', 0)
	// 	.attr('y', 15 )
	// 	.text('Bacterial Profile') //Taxonomy
	// 	.attr('stroke-width', 1)
	// 	.style("text-anchor", "middle");

	// g.append('text')
	// 	.attr('class', 'middleTextBIG')
	// 	.attr('x', 0)
	// 	.attr('y', -5)
	// 	.text('Boston Sewage') //Taxonomy
	// 	.attr('stroke-width', 1)
	// 	.style("text-anchor", "middle");
	// 	// .style("text-anchor", "start");

	// g.append('text')
	// 	.attr('class', 'middleTextBIG')
	// 	.attr('x', 0)
	// 	.attr('y', 18)
	// 	.text('Bacterial Profile') //Taxonomy
	// 	.attr('stroke-width', 1)
	// 	.style("text-anchor", "middle");
	// 	// .style("text-anchor", "start");


	// g.append('line') //upper line
	// 		.attr('x1', -pos_left_x -80)
	// 		.attr('y1', -height*0.3 + 55 )
	// 		.attr('x2', -pos_left_x + 185)
	// 		.attr('y2', -height*0.3 + 55 )
	// 		.attr('stroke', '#fff')
	// 		.style('opacity', 0.4)
	// 		.attr('stroke-width', 1);

	// g.append("polygon")       // attach a polygon
 //    	.style("stroke", "rgba(255,255,255,0.6)")  // colour the line
 //    	.attr('stroke-width', 1)
 //    	.style("fill", "none")     // remove any fill colour
 //    	.attr("points", "-5,10, -5,-10, 10,0")
 //    	.on("mouseover", function() {
 //    		d3.select(this).style("fill", "rgba(255,255,255,0.7)");
 //    	})
 //    	.on("mouseout", function() {
 //    		d3.select(this).style("fill", "none");
 //    	});


	g.append('text')
		.attr('class', 'middleTextBIG')
		.attr('x', 0)
		.attr('y', -5 )
		.text('BOSTON SEWAGE') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "middle");

	g.append('text')
		.attr('class', 'middleTextBIG')
		.attr('x', 0)
		.attr('y', 15 )
		.text('BACTERIAL PROFILE') //Bacterial Profile
		.attr('stroke-width', 1)
		.style("text-anchor", "middle");

	// g.append('line') //upper line
	// 		.attr('x1', pos_left_x - 76)
	// 		.attr('y1', -70 )
	// 		.attr('x2', pos_left_x + 76)
	// 		.attr('y2', -70 )
	// 		.attr('stroke', '#fff')
	// 		.style('opacity', 0.3)
	// 		.attr('stroke-width', 1);

	// g.append('line') //lower line
	// 		.attr('x1', pos_left_x )
	// 		.attr('y1', 0 )
	// 		.attr('x2', -outerRadius*1.03) // -268
	// 		// .attr('x2', outerRadius*1.03)
	// 		.attr('y2', 0 )
	// 		.attr('stroke', '#fff')
	// 		.style('opacity', 0.3)
	// 		.attr('stroke-width', 1);

	// g.append('line') //vertical line
	// 		.attr('x1', pos_left_x )
	// 		.attr('y1', 0 )
	// 		.attr('x2', pos_left_x )
	// 		.attr('y2', -70 )
	// 		.attr('stroke', '#fff')
	// 		.style('opacity', 0.3)
	// 		.attr('stroke-width', 1);
}

var domain_taxo, phylum_taxo, class_taxo, order_taxo, 
	family_taxo, genus_taxo;

var domain_name, phylum_name, class_name, order_name, 
	family_name, genus_name, selected, selectedBox;

var yScale = d3.scale.linear()
				.domain([0, 5])  
				.range([-height*0.18 +20, height*0.18 +20]);
				// .range([-90, outerRadius-90]);
				// .range([-height*0.18, height*0.25]);

// phylum,class,order,family,genus,value

var xpos = -1 * pos_left_x +40;
var xpos2 = -1 * pos_left_x + 110;

// var xpos =  -width/2 + 30;
// var xpos2 = xpos + 72;

function texonomyList() {

	g.append('line') // right
		.attr('x1', radius)
		.attr('y1', 0)
		.attr('x2', -pos_left_x+20)
		.attr('y2', 0)
		.attr('stroke-width', 0.45)
		.attr("stroke", "#fff")
		.style("text-anchor", "start");

	g.append('line') // right vertical
		.attr('x1',  -pos_left_x+20)
		.attr('y1', -90)
		.attr('x2', -pos_left_x+20)
		.attr('y2', 125)
		.attr('stroke-width', 0.45)
		.attr("stroke", "#fff")
		.style("text-anchor", "start");

	g.append('line') // left
		.attr('x1', -outerRadius-5)
		.attr('y1', 0)
		.attr('x2', pos_left_x )
		.attr('y2', 0)
		.attr('stroke-width', 0.45)
		.attr("stroke", "#fff")
		.style("text-anchor", "start");


	domain_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(0) )
		.text('DOMAIN') //Bacterial Profile
		.attr('stroke-width', 1)
		// .style("text-anchor", "middle");
		.style("text-anchor", "start");

	phylum_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(1) )
		.text('PHYLUM') //Bacterial Profile
		.attr('stroke-width', 1)
		// .style("text-anchor", "middle");
		.style("text-anchor", "start");

	class_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(2) )
		.text('CLASS') //Bacterial Profile
		.attr('stroke-width', 1)
		// .style("text-anchor", "middle");
		.style("text-anchor", "start");

	order_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(3) )
		.text('ORDER') //Bacterial Profile
		.attr('stroke-width', 1)
		// .style('opacity', 0.3)
		// .style("text-anchor", "middle");
		.style("text-anchor", "start");

	family_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(4) )
		.text('FAMILY') //Bacterial Profile
		.attr('stroke-width', 1)
		// .style("text-anchor", "middle");
		.style("text-anchor", "start");

	genus_taxo = g.append('text')
		.attr('class', 'taxoName')
		.attr('x', xpos)
		.attr('y', yScale(5) )
		.text('GENUS') //Bacterial Profile
		.attr('stroke-width', 1)
		// .style("text-anchor", "middle");
		.style("text-anchor", "start");

	///////////////////////////////////////////////
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
	class_name.transition().duration(100).style('fill-opacity', 0.82);

	order_name.text(o);
	order_name.transition().duration(100).style('fill-opacity', 0.74);

	family_name.text(f);
	family_name.transition().duration(100).style('fill-opacity', 0.6);

	genus_name.text(g);
	genus_name.transition().duration(100).style('fill-opacity', 0.45);
}
 

