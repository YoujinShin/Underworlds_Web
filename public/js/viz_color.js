function getPhylum(d) {

	var depth = d.depth;
	var phylum;

	if(depth == 1) { phylum = d.name; }
	else if(depth == 2) { phylum = d.parent.name; }
	else if(depth == 3) { phylum = d.parent.parent.name; }
	else if(depth == 4) { phylum = d.parent.parent.parent.name; }
	else if(depth == 5) { phylum = d.parent.parent.parent.parent.name; }

	return phylum;
}

var order2 = 0;

function getColor(phylum) {

	if(phylum == 'Acidobacteria') { order2 = 0; }
	else if(phylum == 'Actinobacteria') { order2 = 1; }
	else if(phylum == 'Aquificae') { order2 = 2; }
	else if(phylum == 'Bacteroidetes') { order2 = 3; }
	else if(phylum == 'Chlamydiae') { order2 = 4; }
	else if(phylum == 'Chlorobi') { order2 = 5; }
	else if(phylum == 'Chloroflexi') { order2 = 6; }
	else if(phylum == 'Chrysiogenetes') { order2 = 7; }
	else if(phylum == 'Crenarchaeota') { order2 = 0; }
	else if(phylum == 'Cyanobacteria') { order2 = 1; }
	else if(phylum == 'Deferribacteres') { order2 = 2; }
	else if(phylum == 'Dictyoglomi') { order2 = 3; }
	else if(phylum == 'Elusimicrobia') { order2 = 4; }
	else if(phylum == 'Euryarchaeota') { order2 = 5; }
	else if(phylum == 'Fibrobacteres') { order2 = 6; }
	else if(phylum == 'Firmicutes') { order2 = 7; }
	else if(phylum == 'Fusobacteria') { order2 = 0; }
	else if(phylum == 'Gemmatimonadetes') { order2 = 1; }
	else if(phylum == 'Lentisphaerae') { order2 = 2; }
	else if(phylum == 'Nitrospirae') { order2 = 3; }
	else if(phylum == 'Planctomycetes') { order2 = 4; }
	else if(phylum == 'Proteobacteria') { order2 = 5; }
	else if(phylum == 'Spirochaetes') { order2 = 6; }
	else if(phylum == 'Synergistetes') { order2 = 7; }
	else if(phylum == 'Tenericutes') { order2 = 0; }
	else if(phylum == 'Thermi') { order2 = 1; }
	else if(phylum == 'Thermotogae') { order2 = 2; }
	else if(phylum == 'Verrucomicrobia') { order2 = 3; }

	var colorLists = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#009688', '#4CAF50', '#FF5722' ];

	var colorLists2 = ['#f8877f','#f06493', '#c34cd7', '#7280ce', '#6ab8f7', '#00e3cd', '#80c883', '#ff916f'];

	return colorLists2[ order2 ];
}

