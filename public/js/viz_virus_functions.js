function selectDots_virus(name) {

	dots_virus.each(function(e, i) {
		if(e.Virus_name == name) {
			d3.select(this).transition().duration(330)
				.attr('r', 5);
		}
	});
}

function selectLines_virus(name) {

	lines_virus.each(function(e, i) {
		if(e.Virus_name == name) {
			d3.select(this).attr("stroke-width", 1.6);
			d3.select(this).style('opacity', 0.99);
		}
	});
}

function unselectDots_virus() {
	dots_virus.each(function(e) {
		d3.select(this).transition().duration(0).attr('r', 2.4);
	});
}

function unselectLines_virus() {
	lines_virus.each(function(e) {
		d3.select(this).attr("stroke-width", 1);
		d3.select(this).style('opacity', 0.22);
	});
}