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

    // light sign

    var light_sign = d3.select("#IndicatorChart")
		.append("svg")
		.attr("width", width1-30)
		.attr("height", 3 * (height + 30) );

	var time_height = 30;
	var format_time = d3.time.format("%Y-%m-%d %H:%M");
	
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
		.on("click", mouseclick)
		.on("mousemove", mousemove);

	function mouseclick(){
		var x0 = time_scale.invert(d3.mouse(this)[0]),
			i = bisectTime(dataAllObj, x0, 1);
		console.log(x0);
		console.log(i);
		console.log(dataAllObj[i-1].cdate);
		var d=dataAllObj[i-1];
		drawDataPanel(d);
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
	    
	    updateData(d.cdate);
		moveHands();

	}	
}


