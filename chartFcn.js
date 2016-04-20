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
	var  xLabelRot=45;
	var  margin = {top: 10, right: 0, bottom: 30, left: 60+200};
	var  width1 = 680+200;
	var  height = 150;
	var time_scale = d3.time.scale()
		.range([0, width1-margin.left-margin.right]);

	var time_scale_OV = d3.time.scale()
		.range([0, width1-margin.left-margin.right]);

	var rainfall_scale = d3.scale.linear()
		.range([height-margin.top-margin.bottom, 0])
		.domain([0,250]);
	
	var displacement_scale = d3.scale.linear()
		.range([height-margin.top-margin.bottom, 0])
		.domain([0, 2.500]);

	var level_scale = d3.scale.linear()
		.range([height-margin.top-margin.bottom, 0])
		.domain([-60,0]);

	var scale_OV = d3.scale.linear()
		.range([height-margin.top-margin.bottom, 0])
		.domain([-56,-29]);
	
	var time_axis = d3.svg.axis()
		.scale(time_scale)
		.orient('bottom')
		.tickSize(-height)
		.tickSubdivide(true);


	var time_axis_OV = d3.svg.axis()
		.scale(time_scale_OV)
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


	var rainfall_axis_OV = d3.svg.axis()
		.scale(scale_OV)
		.orient("left")
		.ticks(6)
		.tickFormat(function(d){return Math.round(invRain2GNDwaterN(d) * 100) / 100;});
	
	var displacement_axis_OV = d3.svg.axis()
		.scale(scale_OV)
		.orient("left")
		.ticks(6)
		.tickFormat(function(d){return Math.round(invGPS2GNDwaterN(d) * 100) / 100;});

	var level_axis_OV = d3.svg.axis()
		.scale(scale_OV)
		.orient("left")
		.ticks(7)
		.tickFormat(function(d){return Math.round(invGNDwater2GNDwaterN(d) * 100) / 100;});
	


	var line1 = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return rainfall_scale(d.rainfall)});
	
	var line2 = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return displacement_scale(d.gpsDist)});
	
	var line3 = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return level_scale(d.gndWater)});


    var line1_OV = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return scale_OV(rain2GNDwaterN(d.rainfall))});
	
	var line2_OV = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return scale_OV(gps2GNDwaterN(d.gpsDist))});
	
	var line3_OV = d3.svg.line()
    .x(function(d){return time_scale(d.cdate);})
    .y(function(d){return scale_OV(GNDwater2GNDwaterN(d.gndWater))});


    time_scale.domain(d3.extent(dataAllObj, function(d){ return d.cdate;}));
    time_scale_OV.domain(d3.extent(dataAllObj, function(d){ return d.cdate;}));

    var brush = d3.svg.brush()
    .x(time_scale_OV)
    .extent(d3.extent(dataAllObj, function(d){ return d.cdate;}))
    .on("brushend", brushended);	

	var time_height = 30;
	var format_time = d3.time.format("%Y-%m-%d %H:%M");
	
	//Chart 1 
	// draw axes
	var svg = d3.select("#MainChart")
		.append("svg")
		.attr("width", width1 + 20)
		.attr("height", 5 * (height + 30 ));
						
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
	g1.append("clipPath")
	    .attr("id", "g1clip")
	  .append("rect")
	    .attr("x", 0)
	    .attr("y", -20)
	    .attr("width", width1-margin.left)
	    .attr("height", height);	

	//draw lineChart    	
	g1.append('path')
	 	.attr("class", "linepath")
	 	.attr("id","g1path")
	 	.attr("clip-path","url(#g1clip)")
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
	
	g2.append("clipPath")
	    .attr("id", "g2clip")
	  .append("rect")
	    .attr("x", 0)
	    .attr("y", -20)
	    .attr("width", width1-margin.left)
	    .attr("height", height);	

	//draw lineChart    	
	g2.append('path')
	 	.attr("class", "linepath")
	 	.attr("id","g2path")
	 	.attr("clip-path","url(#g2clip)")
    	.attr('d', line2(dataAllObj));	

	
		
								
	//Chart 3 
	// draw axes
	
	var g3 = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + 2*(height + 30) + time_height) + ")");

	g3.append("g")
		.attr("class", "x axis")
		.attr("id", "chart3")
		.attr("transform", "translate(0," + (height-20) + ")")
		.call(time_axis)
		.selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );
 
	g3.append("g")
		.attr("class", "y axis")
		.call(level_axis);

	
	g3.append("clipPath")
	    .attr("id", "g3clip")
	  .append("rect")
	    .attr("x", 0)
	    .attr("y", -20)
	    .attr("width", width1-margin.left)
	    .attr("height", height);	

	//draw lineChart    	
	g3.append('path')
	 	.attr("class", "linepath")
	 	.attr("id","g3path")
	 	.attr("clip-path","url(#g3clip)")
    	.attr('d', line3(dataAllObj));

    


    //draw overview chart
	var gOV = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + 3.5*(height + 30) + time_height) + ")");

	gOV.append("g")
		.attr("class", "x axis")
		.attr("id", "chart4")
		.attr("transform", "translate(0," + (height-20) + ")")
		.call(time_axis_OV)
		.selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );
 	
    gOV.append("g")
		.attr("class", "y axis")
		.call(rainfall_axis_OV);      

    gOV.append("g")
		.attr("class", "y axis")
		.attr("transform","translate(-80,0)")
		.call(displacement_axis_OV);    

	gOV.append("g")
		.attr("class", "y axis")
		.attr("transform","translate(-130,0)")
		.call(level_axis_OV);

	//draw lineChart
		
	gOV.append('path')
	 	.attr("class", "linepath")
    	.attr('d', line1_OV(dataAllObj));	
    gOV.append('path')
	 	.attr("class", "linepath")
    	.attr('d', line2_OV(dataAllObj));
    gOV.append('path')
	 	.attr("class", "linepath")
    	.attr('d', line3_OV(dataAllObj));

    var gBrush = gOV.append("g")
	    .attr("class", "brush")
	    .call(brush)
	    .call(brush.event);

	gBrush.selectAll("rect")
		.attr("transform","translate(0,-20)")
	    .attr("height", height);	
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
		
	var focus2 = g2
		.append("circle")
		.attr("r", 0);
		
	var focus3 = g3
		.append("circle")
		.attr("r", 0);

	var focus_OV_rain=gOV
		.append("circle")
		.attr("id","rainDot")
		.attr("r",0);

	var focus_OV_gps=gOV
		.append("circle")
		.attr("id","gpsDot")
		.attr("r",0);

	var focus_OV_water=gOV
		.append("circle")
		.attr("id","waterDot")
		.attr("r",0);

	var overlay = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");					
	
	overlay.append("rect")
		.attr("class", "overlay")
		.attr("width", width1)
		.attr("height", 4.5*height + 2*margin.bottom)//.attr("height", 3*height + 2*margin.bottom)
		.on("click", mouseclick)
		.on("mousemove", mousemove);


	

	function mouseclick(){
		var x0 = time_scale.invert(d3.mouse(this)[0]),
			i = bisectTime(dataAllObj, x0, 1);
		var d=dataAllObj[i-1];
		drawDataPanel(d);
	}
	
	var mousemoveData;
	var pColor="black";	
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
		
		mousemoveData=d;
		focus1.attr("transform", "translate(" + time_scale(d.cdate) + "," + rainfall_scale(d.rainfall) + ")")
			  .attr("r", 5).attr("fill", pColor);
		
		
		focus2.attr("transform", "translate(" + time_scale(d.cdate) + "," + displacement_scale(d.gpsDist) + ")")
			 .attr("r", 5).attr("fill", pColor);
		
		
		focus3.attr("transform", "translate(" + time_scale(d.cdate) + "," + level_scale(d.gndWater) + ")")
			 .attr("r", 5).attr("fill", pColor);
		

	    focus_OV_water.attr("transform", "translate(" + time_scale(d.cdate) + "," + scale_OV(GNDwater2GNDwaterN(d.gndWater)) + ")")
			 .attr("r", 3).attr("fill", pColor);

		focus_OV_gps.attr("transform", "translate(" + time_scale(d.cdate) + "," + scale_OV(gps2GNDwaterN(d.gpsDist)) + ")")
			 .attr("r", 3).attr("fill", pColor);

		focus_OV_rain.attr("transform", "translate(" + time_scale(d.cdate) + "," + scale_OV(rain2GNDwaterN(d.rainfall)) + ")")
			 .attr("r", 3).attr("fill", pColor);

	    updateData(d.cdate);
		moveHands();

	}	

	console.log(rain2GNDwaterN(220));
	console.log(gps2GNDwaterN(2));
	console.log(rain2GNDwaterN(0));
	console.log(gps2GNDwaterN(0));
	function rain2GNDwaterN(v){
		return -35-(500-v)/(500-200)*(-35-(-42));
	}
	function gps2GNDwaterN(v){
		return -35-(2-v)/(2-0.5)*(-35-(-42));
	}
	function GNDwater2GNDwaterN(v){
		return v;
	}

	function invRain2GNDwaterN(v){
		return 500-(-35-v)/(-35-(-42))*(500-(200));
	}
	function invGPS2GNDwaterN(v){
		return 2-(-35-v)/(-35-(-42))*(2-(0.5));
	}
	function invGNDwater2GNDwaterN(v){
		return v;
	}
	function brushended() {
	  if (!d3.event.sourceEvent) return; // only transition after input
	  var extent0 = brush.extent(),
	      extent1 = extent0.map(d3.time.day.round);

	  // if empty when rounded, use floor & ceil instead
	  if (extent1[0] >= extent1[1]) {
	    extent1[0] = d3.time.day.floor(extent0[0]);
	    extent1[1] = d3.time.day.ceil(extent0[1]);
	  }

	  d3.select(this).transition()
	      .call(brush.extent(extent1))
	      .call(brush.event);
	  time_scale.domain(brush.empty()?time_scale_OV:extent1);
	  g3.select(".x.axis").call(time_axis);
	  zoomRedraw();
	}

	function zoomRedraw(){


	    line1 = d3.svg.line()
		    .x(function(d){return time_scale(d.cdate);})
		    .y(function(d){return rainfall_scale(d.rainfall)});
	
	    line2 = d3.svg.line()
		    .x(function(d){return time_scale(d.cdate);})
		    .y(function(d){return displacement_scale(d.gpsDist)});
		line3 = d3.svg.line()
		    .x(function(d){return time_scale(d.cdate);})
		    .y(function(d){return level_scale(d.gndWater)});

		d3.select("#chart3")
		  .selectAll("text")  
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
		  .attr("transform", "rotate(-65)" );

		d3.select("#g1path")
		  .attr('d', line1(dataAllObj));
		d3.select("#g2path")
		  .attr('d', line2(dataAllObj));
		d3.select("#g3path")
		  .attr('d', line3(dataAllObj));

	  


	}
}


