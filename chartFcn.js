/*
attributes in main.js

var fin="https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/p2data/data1.tsv";
var times=[],dataRainfall=[],dataGndWater=[],dataDist=[],accu24Rain=[];//array
var objRainfall=[], objGndWater=[], objDist=[],accu24RainObj=[];//e.g. {cdate: 2012/6/5 0:00,val:-55}
var dateformat=d3.time.format("%Y/%m/%d %H:%M");
var labelDateFormat=d3.time.format("%Y/%m/%d ");
var weekday = new Array(7);

var timeLabels = new Array(14);
var dateStr="2012/6/11";//the selected date within the week
var selectedDate=dateformat.parse(dateStr+" 00:00");
var startDate=selectedWeek(selectedDate);
var endDate=addDays(startDate, 7);


*/


function draw(){

	var  margin = {top: 10, right: 0, bottom: 30, left: 60};
	var  width1 = 300;
	var  width2 = 680;
	var  height = 150;
	var time_scale = d3.time.scale()
		.range([0, width2-margin.left-margin.right]);

	var time_scale2 = d3.time.scale()	// scale for range slider
		.range([0, width2-margin.left-margin.right]);

	var rainfall_scale = d3.scale.linear()
		.range([height-margin.top-margin.bottom, 0])
		.domain([0,250]);
	
	var displacement_scale = d3.scale.linear()
		.range([height-margin.top-margin.bottom, 0])
		.domain([0, 2.500]);

	var level_scale = d3.scale.linear()
		.range([height-margin.top-margin.bottom, 0])
		.domain([-60,0]);
	
	var time_axis = d3.svg.axis()
		.scale(time_scale)
		.orient('bottom')
		.tickSize(-height)
		.tickSubdivide(true);

	// var time_axis2 = d3.svg.axis()	// axis for range slider
	// 	.scale(time_scale2)
	// 	.orient('bottom');

	var rainfall_axis = d3.svg.axis()
		.scale(rainfall_scale)
		.orient("left")
		.ticks(6);
	
	var displacement_axis = d3.svg.axis()
		.scale(displacement_scale)
		.orient("left")
		.ticks(6);

	var level_axis = d3.svg.axis()
		.scale(level_scale)
		.orient("left")
		.ticks(7);
	
	var line1 = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return rainfall_scale(d.rainfall)});
	
	var line2 = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return displacement_scale(d.gpsDist)});
	
	var line3 = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return level_scale(d.gndWater)});

    time_scale.domain(d3.extent(dataAllObj, function(d){ return d.cdate;}));

    //time_scale2.domain(time_scale.domain());

    // light sign

    var light_sign = d3.select("#IndicatorChart")
		.append("svg")
		.attr("width", width1-30)
		.attr("height", 3 * (height + 30) );

	var time_height = 30;
	var format_time = d3.time.format("%Y-%m-%d %H:%M");

	// var show_time = light_sign
	// 	.append("g")
	// 	.attr("transform", "translate(" + (width1/2+20) + "," + time_height + ")")
	// 	.append("text")
	// 	.attr("stroke", "#686868")
	// 	.attr("fill", "#686868")
	// 	.attr("font-size", "18px")
	// 	.attr("text-anchor", "middle")
	// 	.text("time");
		
	// var light1 = light_sign
	// 	.append("g")
	// 	.attr("transform", "translate(" + (margin.left-40) + "," + (margin.top+time_height) + ")");
		
	
	
	// var r1 = light1
	// 	.append("g")
	// 	.attr("transform", "translate(" +(margin.left -10) + "," + margin.top + ")");
	
	// r1.append("rect")
	// 	.attr("x", 0)
	// 	.attr("y", 0)
	// 	.attr("width", width1-110)
	// 	.attr("height", height-50)
	// 	.attr("rx", 20)
	// 	.attr("ry", 20)
	// 	.attr("stroke", "#F8F8F8")
	// 	.attr("stroke-width", "5px")
	// 	.attr("fill", "#F8F8F8");
		
	// r1.append("text")
	// 	.attr("x", 78)
	// 	.attr("y", 43)
	// 	.attr("fill", "dimgray")
	// 	.attr("class", "light")
	// 	.attr("font-size", "25px")
	// 	.text("Rainfall");
		
	// r1.append("text")
	// 	.attr("x", 63)
	// 	.attr("y", 58)
	// 	.attr("fill", "#888888")
	// 	.attr("font-size", "15px")
	// 	.text("cumulative in 24 hr");
		
	// r1.append("circle")
	// 	.attr("cx",30)
	// 	.attr("cy", 53)
	// 	.attr("r", 20)
	// 	.attr("stroke", "#B0B0B0")
	// 	.attr("stroke-width", "5px");
		
	// var caution1 = r1.append("text")
	// 	.attr("x", 30)
	// 	.attr("y", 53)
	// 	.attr("dy", 8)
	// 	.attr("stroke", "White")
	// 	.attr("fill", "White")
	// 	.attr("font-size", "23px")
	// 	.attr("text-anchor", "middle");
		
	// var textData1 = r1.append("text")
	// 	.attr("x", 119)
	// 	.attr("y", 68)
	// 	.attr("dy", 8)
	// 	.attr("fill", "#686868")
	// 	.attr("font-size", "18px")
	// 	.attr("text-anchor", "middle");

	// var light2 = light_sign
	// 	.append("g")
	// 	.attr("transform", "translate(" + (margin.left-40) + "," + (margin.top+time_height) + ")");
	
	// var r2 = light2
	// 	.append("g")
	// 	.attr("transform", "translate(" +(margin.left -10) + "," + margin.top + ")");
	
	// r2.append("rect")
	// 	.attr("x", 0)
	// 	.attr("y", 180)
	// 	.attr("width", width1-110)
	// 	.attr("height", height-50)
	// 	.attr("rx", 20)
	// 	.attr("ry", 20)
	// 	.attr("stroke", "#F8F8F8")
	// 	.attr("stroke-width", "5px")
	// 	.attr("fill", "#F8F8F8");
		
	// r2.append("text")
	// 	.attr("x", 57)
	// 	.attr("y", 220)
	// 	.attr("fill", "dimgray")
	// 	.attr("font-size", "20px")
	// 	.text("Displacement");
	
	// r2.append("text")
	// 	.attr("x", 88)
	// 	.attr("y", 236)
	// 	.attr("fill", "#888888")
	// 	.attr("font-size", "15px")
	// 	.text("of stratum");
		
	// r2.append("circle")
	// 	.attr("cx",30)
	// 	.attr("cy", 233)
	// 	.attr("r", 20)
	// 	.attr("stroke", "#B0B0B0")
	// 	.attr("stroke-width", "5px");
		
	// var caution2 = r2.append("text")
	// 	.attr("x", 30)
	// 	.attr("y", 233)
	// 	.attr("dy", 8)
	// 	.attr("stroke", "White")
	// 	.attr("fill", "White")
	// 	.attr("font-size", "23px")
	// 	.attr("text-anchor", "middle");
					
	// var textData2 = r2.append("text")
	// 	.attr("x", 88)
	// 	.attr("y", 247)
	// 	.attr("dy", 8)
	// 	.attr("fill", "#686868")
	// 	.attr("font-size", "18px");

	// var light3 = light_sign
	// 	.append("g")
	// 	.attr("transform", "translate(" + (margin.left-40) + "," + (margin.top+time_height) + ")");
	
	// var r3 = light3
	// 	.append("g")
	// 	.attr("transform", "translate(" +(margin.left -10) + "," + margin.top + ")");
	
	// r3.append("rect")
	// 	.attr("x", 0)
	// 	.attr("y", 360)
	// 	.attr("width", width1-110)
	// 	.attr("height", height-50)
	// 	.attr("rx", 20)
	// 	.attr("ry", 20)
	// 	.attr("stroke", "#F8F8F8")
	// 	.attr("stroke-width", "5px")
	// 	.attr("fill", "#F8F8F8");
		
	// r3.append("text")
	// 	.attr("x", 86)
	// 	.attr("y", 404)
	// 	.attr("fill", "dimgray")
	// 	.attr("font-size", "25px")
	// 	.text("Level");

	// r3.append("text")
	// 	.attr("x", 66)
	// 	.attr("y", 418)
	// 	.attr("fill", "#888888")
	// 	.attr("font-size", "15px")
	// 	.text("of ground water");
		
	// r3.append("circle")
	// 	.attr("cx",30)
	// 	.attr("cy", 413)
	// 	.attr("r", 20)
	// 	.attr("stroke", "#B0B0B0")
	// 	.attr("stroke-width", "5px");
		
	// var caution3 = r3.append("text")
	// 	.attr("x", 30)
	// 	.attr("y", 413)
	// 	.attr("dy", 8)
	// 	.attr("stroke", "White")
	// 	.attr("fill", "White")
	// 	.attr("font-size", "23px")
	// 	.attr("text-anchor", "middle");
					
	// var textData3 = r3.append("text")
	// 	.attr("x", 116)
	// 	.attr("y", 430)
	// 	.attr("dy", 8)
	// 	.attr("fill", "#686868")
	// 	.attr("font-size", "18px")
	// 	.attr("text-anchor", "middle");
	
	//Chart 1 
	// draw axes
	var svg = d3.select("#MainChart")
		.append("svg")
		.attr("width", width2 + 20)
		.attr("height", 4 * (height + 30 ));
						
	var g1 = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top+time_height) + ")");

	g1.append("g")
		.attr("class", "y axis")
		.call(rainfall_axis);

	g1.append("g")
		.attr("class", "x axis")
		.attr("id", "chart1")
		.attr("transform", "translate(0," + (height-20) + ")")
		.call(time_axis)
		.selectAll("g")
		.select("text")
		.attr("style", "opacity: 0");
    //draw lineChart
		
	 g1.append('path')
    	.attr("class", "linepath")
    	.attr('d', line1(dataAllObj));


   		        
		
	//Chart 2 
	// draw axes
	
	var g2 = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + (height + 30) + time_height) +")");
 
	g2.append("g")
		.attr("class", "y axis")
		.call(displacement_axis);

	g2.append("g")
		.attr("class", "x axis")
		.attr("id", "chart2")
		.attr("transform", "translate(0," + (height-20) + ")")
		.call(time_axis)
		.selectAll("g")
		.select("text")
		.attr("style", "opacity: 0");
		
	//draw lineChart
		
	 g2.append('path')
    	.attr("class", "linepath")
    	.attr('d', line2(dataAllObj));
		
								
	//Chart 3 
	// draw axes
	
	var g3 = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + 2*(height + 30) + time_height) + ")");

	g3.append("g")
		.attr("class", "x axis")
		.attr("id", "chart2")
		.attr("transform", "translate(0," + (height-20) + ")")
		.call(time_axis);
 
	g3.append("g")
		.attr("class", "y axis")
		.call(level_axis);

	//draw lineChart
		
	g3.append('path')
	 	.attr("class", "linepath")
    	.attr('d', line3(dataAllObj));

	 //draw the warning line
	var warn_Rain_1 = g1.append("line")
                   .attr("x1", 0)
                   .attr("y1", 22)
                   .attr("x2", 620)
                   .attr("y2",22)
				   .attr("class", "line")
				   .style("stroke-dasharray", ("5, 3"));
	
	//draw the warning line
	var warn_Displacement_1 = g1.append("line")
                   .attr("x1", 0)
                   .attr("y1", 268)
                   .attr("x2", 620)
                   .attr("y2",268)
				   .attr("class", "line")
				   .style("stroke-dasharray", ("5, 3"));
				   
	var warn_Displacement_2 = g1.append("line")
                   .attr("x1", 0)
                   .attr("y1", 202)
                   .attr("x2", 620)
                   .attr("y2",202)
				   .attr("class", "line2")
				   .style("stroke-dasharray", ("5, 3"));
	//draw the warning line	
	var warn_Groundwater_1 = g1.append("line")
                   .attr("x1", 0)
                   .attr("y1", 439)
                   .attr("x2", 620)
                   .attr("y2",439)
				   .attr("class", "line")
				   .style("stroke-dasharray", ("5, 3"));
				   
	var warn_Groundwater_2 = g1.append("line")
                   .attr("x1", 0)
                   .attr("y1", 426)
                   .attr("x2", 620)
                   .attr("y2",426)
				   .attr("class", "line2")
				   .style("stroke-dasharray", ("5, 3"));
					
	//mousemove

	var bisectTime = d3.bisector(function(d) { return d.cdate; }).left;
	var	formatValue = d3.format(",.2f");
	var	formatCurrency = function(d) { return "$" + formatValue(d); };
	
	var focus1 = g1
		.append("circle")
		.attr("r", 0);
				
	var number1 = focus1
		.append("text")
		.attr("stroke","MidnightBlue")
		.attr("font-size", "10px");
		
	var focus2 = g2
		.append("circle")
		.attr("r", 0);
		
	var focus3 = g3
		.append("circle")
		.attr("r", 0);
		
	var overlay = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");					
	
	overlay.append("rect")
		.attr("class", "overlay")
		.attr("width", width2)
		.attr("height", 3*height + 2*margin.bottom)
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("mousemove", mousemove);
	
	function mouseover() {
		focus1.style("display", null); 
		focus2.style("display", null); 
		focus3.style("display", null);

		// light1.attr("fill", "#F8F8F8");
		// textData1.text(" ");

		// light2.attr("fill", "#F8F8F8");
		// textData2.text(" ");

		// light3.attr("fill", "#F8F8F8");
		// textData3.text(" ");
	}	

	function mouseout() {
		focus1.style("display", "none"); 
		focus2.style("display", "none"); 
		focus3.style("display", "none");

		// light1.attr("fill", "#F8F8F8");
		// textData1.text(" ");

		// light2.attr("fill", "#F8F8F8");
		// textData2.text(" ");

		// light3.attr("fill", "#F8F8F8");
		// textData3.text(" ");
	}	

	function mousemove() {
		var x0 = time_scale.invert(d3.mouse(this)[0]),
			i = bisectTime(dataAllObj, x0, 1);

		if (i === 0) {
			var d = dataAllObj[i];
		} else if (i < dataAllObj.length) {
			var d0 = dataAllObj[i - 1],
			d1 = dataAllObj[i],
			d = x0 - d0.cdate > d1.cdate - x0 ? d1 : d0;
		} else {
			var d = dataAllObj[i-1];
		}
		var pColor="black";	
		focus1.attr("transform", "translate(" + time_scale(d.cdate) + "," + rainfall_scale(d.rainfall) + ")")
			  .attr("r", 5).attr("fill", pColor);
		focus1.select("text").text(formatCurrency(d.rainfall));
		
		focus2.attr("transform", "translate(" + time_scale(d.cdate) + "," + displacement_scale(d.gpsDist) + ")")
			 .attr("r", 5).attr("fill", pColor);
		focus2.select("text").text(formatCurrency(d.gpsDist));
		
		focus3.attr("transform", "translate(" + time_scale(d.cdate) + "," + level_scale(d.gndWater) + ")")
			 .attr("r", 5).attr("fill", pColor);
		focus3.select("text").text(formatCurrency(d.gndWater));

		//show_time.text(format_time(d.cdate));
	    
	    
	    updateData(d.cdate);
		moveHands();

		// light1.attr("fill", function() {
		// 	var fillcolor;
		// 	if (d.rainfall > 500) { fillcolor = "red"; caution1.text("!!");} 
		// 	else if (d.rainfall > 200) { fillcolor = "#FDD017"; caution1.text("!");} 
		// 	else { fillcolor = "#4CC417";caution1.text(" ");}					
		// 	return fillcolor;
		// });
		
		// textData1.text(formatValue(d.rainfall) + " mm");
	

		// light2.attr("fill", function() {
		// 	var fillcolor;
		// 	if (d.gpsDist > 2) { fillcolor = "red"; caution2.text("!!");} 
		// 	else if (d.gpsDist > 0.5) { fillcolor = "#FDD017"; caution2.text("!");} 
		// 	else { fillcolor = "#4CC417";caution2.text(" ");}					
		// 	return fillcolor;
		// });
		// textData2.text(formatValue(d.gpsDist) + " cm");

		// light3.attr("fill", function() {
		// 	var fillcolor;
		// 	if (d.gndWater > -35) { fillcolor = "red"; caution3.text("!!");} 
		// 	else if (d.gndWater > -42) { fillcolor = "#FDD017"; caution3.text("!");} 
		// 	else { fillcolor = "#4CC417";caution3.text(" ");}					
		// 	return fillcolor;
		// });
		// textData3.text(formatValue(d.gndWater) + " m");
	}

	// brush range slider

	// var context = svg.append("g")
	// 	.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + 3*(height + 30) + time_height) + ")" )
	// 	.attr("class", "context");

	// g1.append("defs")
	// 	.append("clipPath")
	// 		.attr("id", "clip")
	// 		.append("rect")
	// 		.attr("width", width2-margin.left-margin.right)
	// 		.attr("height", height-margin.top-margin.bottom);

	// var brush = d3.svg.brush()
	// 	.x(time_scale2)
	// 	.on("brush", brushed);

	// var height2 = 25

	// context.append("g")
	// 	.attr("class", "x axis1")
	// 	.attr("transform", "translate(0," + height2 + ")")
	// 	.call(time_axis2);

	// var contextArea = d3.svg.area()
	// 	.interpolate("monotone")
	// 	.x(function (d) {return time_scale2(d.cdate);})
	// 	.y0(height2)
	// 	.y1(0);

	// context.append("path")
	// 	.attr("class", "area")
	// 	.attr("d", contextArea(dataAllObj))
	// 	.attr("fill", "#000000");

	// context.append("g")
	// 	.attr("class", "x brush")
	// 	.call(brush)
	// 	.selectAll("rect")
	// 	.attr("height", height2)
	// 	.attr("fill", "#a8a8a8");

	function brushed(){

		time_scale.domain(brush.empty() ? time_scale2.domain() : brush.extent());

		d3.selectAll(".x.axis")
			.transition()
			.call(time_axis);

		g1.select(".x.axis")
			.selectAll("g")
			.select("text")
			.attr("style", "opacity: 0");

		g2.select(".x.axis")
			.selectAll("g")
			.select("text")
			.attr("style", "opacity: 0");

		g1.select(".linepath")
			.transition()
			.attr("d", line1(dataAllObj))
			.attr("clip-path", "url(#clip)");

		g2.select(".linepath")
			.transition()
			.attr("d", line2(dataAllObj))
			.attr("clip-path", "url(#clip)");

		g3.select(".linepath")
			.transition()
			.attr("d", line3(dataAllObj))
			.attr("clip-path", "url(#clip)");
	}
	
}


