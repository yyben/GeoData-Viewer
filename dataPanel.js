

var svgpanel=svgclock.append('g');
	svgpanel.append('text')
		.attr('id','datapanel-rainfall')
		.attr('x',100)
		.attr('y',300)
		.text("");
	svgpanel.append('text')
		.attr('id','datapanel-gndWater')
		.attr('x',100)
		.attr('y',400)
		.text("");
	svgpanel.append('text')
		.attr('id','datapanel-gpsDist')
		.attr('x',100)
		.attr('y',500)
		.text("");

function drawDataPanel(d){

	// svgpanel.select('#datapanel-rainfall')
	// 	.text('rainfall: '+(Math.round(d.rainfall * 100) / 100).toString()+' mm');//{cdate:,rainfall:,gndWater:,gpsDist:}
	// svgpanel.select('#datapanel-gndWater')
	// 	.text('gndWater: '+(Math.round(d.gndWater * 100) / 100).toString()+' m');
	// svgpanel.select('#datapanel-gpsDist')
	// 	.text('gpsDist: '+(Math.round(d.gpsDist * 100) / 100).toString()+' cm');
	$("#ptRecord").prepend("<tr><td>"+dateformat(d.cdate)+"</td><td>"+(Math.round(d.rainfall * 100) / 100).toString()+"</td><td>"+(Math.round(d.gpsDist * 100) / 100).toString()+"</td><td>"+(Math.round(d.gndWater * 100) / 100).toString()+"</td></tr>");
}
