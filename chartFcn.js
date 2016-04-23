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
	var  smallIconspace=55;
	var  margin = {top: 10, right: 0, bottom: 30, left: 60+200};
	var  width1 = 680+200;//width1-margin.left=620
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
	
	var xdateformatDay=d3.time.format("%m/%d"),xdateformat=d3.time.format("%H:%M"),xdateformatDate=d3.time.format("%a. %d");
	var time_axis = d3.svg.axis()
		.scale(time_scale)
		.orient('bottom')
		.ticks(12)
		.tickSubdivide(true)//true
		.tickSize(-height)//-height
		.tickFormat(function(d){return  xdateformatDate(d);});
		
	
	var time_axis_OV = d3.svg.axis()
		.scale(time_scale_OV)
		.orient('bottom')
		.tickSize(-height)
		.tickSubdivide(true)
		.tickFormat(function(d){return d.getHours() == 0 ? xdateformatDate(d):xdateformat(d);});

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
    .on("brushstart", brushstart)
    .on("brush", brushmove)
    .on("brushend", brushended);	

	var time_height = 30;
	var format_time = d3.time.format("%Y-%m-%d %H:%M");
	
	var subToOVOffsetY=130,subToSubOffsetY=40;
	//Chart 1 
	// draw axes
	var svg = d3.select("#MainChart")
		.append("svg")
		.attr("width", width1 + 20)
		.attr("height", 6.5 * (height + 30 ));
	svg.append('g')
	//.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + time_height) + ")")
	.append("svg:image")
    .attr("xlink:href", "https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/images/rainfall.svg")
    .attr("width", 50)
    .attr("height", 50)
    .attr("x", 30)
    .attr("y",40)
	.on('mouseover',function(d){
		
		var selectthepath=$('.linepathOV1');
		d3.selectAll(selectthepath)
		  .style('stroke-width',2);
		var selectthepath=$('.linepathOV2');
		d3.selectAll(selectthepath)
		  .style('opacity',0.2);
		var selectthepath=$('.linepathOV3');
		d3.selectAll(selectthepath)
		  .style('opacity',0.2);
	})
	.on('mouseout',function(d){
		var selectthepath=$('.linepathOV1');
		d3.selectAll(selectthepath)
		  .style('stroke-width',1);
		var selectthepath=$('.linepathOV2');
		d3.selectAll(selectthepath)
		  .style('opacity',1.0);
		var selectthepath=$('.linepathOV3');
		d3.selectAll(selectthepath)
		  .style('opacity',1.0);
	});

	svg.append('g')
	//.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + time_height) + ")")
	.append("svg:image")
    .attr("xlink:href", "https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/images/gpsDist.svg")
    .attr("width", 50)
    .attr("height", 50)
    .attr("x", 110)
    .attr("y",40)
    .on('mouseover',function(d){
		
		var selectthepath=$('.linepathOV2');
		d3.selectAll(selectthepath)
		  .style('stroke-width',2);
		var selectthepath=$('.linepathOV1');
		d3.selectAll(selectthepath)
		  .style('opacity',0.2);
		var selectthepath=$('.linepathOV3');
		d3.selectAll(selectthepath)
		  .style('opacity',0.2);
	})
	.on('mouseout',function(d){
		var selectthepath=$('.linepathOV2');
		d3.selectAll(selectthepath)
		  .style('stroke-width',1);
		var selectthepath=$('.linepathOV1');
		d3.selectAll(selectthepath)
		  .style('opacity',1.0);
		var selectthepath=$('.linepathOV3');
		d3.selectAll(selectthepath)
		  .style('opacity',1.0);
	});	 

    svg.append('g')
	//.attr("transform", "translate(" + (margin.left-10) + "," + (margin.top + time_height) + ")")
	.append("svg:image")
    .attr("xlink:href", "https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/images/gndwater.svg")
    .attr("width", 50)
    .attr("height", 50)
    .attr("x", 190)
    .attr("y",40)
    .on('mouseover',function(d){
		
		var selectthepath=$('.linepathOV3');
		d3.selectAll(selectthepath)
		  .style('stroke-width',2);
		var selectthepath=$('.linepathOV1');
		d3.selectAll(selectthepath)
		  .style('opacity',0.2);
		var selectthepath=$('.linepathOV2');
		d3.selectAll(selectthepath)
		  .style('opacity',0.2);
	})
	.on('mouseout',function(d){
		var selectthepath=$('.linepathOV3');
		d3.selectAll(selectthepath)
		  .style('stroke-width',1);
		var selectthepath=$('.linepathOV1');
		d3.selectAll(selectthepath)
		  .style('opacity',1.0);
		var selectthepath=$('.linepathOV2');
		d3.selectAll(selectthepath)
		  .style('opacity',1.0);
	});	

	var g1 = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (smallIconspace+margin.top+ height+subToSubOffsetY + subToOVOffsetY+ time_height).toString() + ")");

	g1.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,0)")		
		.call(rainfall_axis);

	g1.append("g")
		.attr("class", "x axis")
		.attr("id", "chart1")
		.attr("transform", "translate(0," + (margin.top+height-30).toString() + ")")
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
    	

	g1.append('text').attr('transform','translate(-35,-25)').text('[mm]'); 


   	g1.append("svg:image")
    .attr("xlink:href", "https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/images/rainfall.svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("x", -250)
    .attr("y",-30);	       
		
	//Chart 2 
	// draw axes
	
	var g2 = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (smallIconspace+margin.top  + 2*(height+subToSubOffsetY)+ subToOVOffsetY   + time_height).toString() +")");
 
	g2.append("g")
		.attr("class", "y axis")
		.call(displacement_axis);

	g2.append("g")
		.attr("class", "x axis")
		.attr("id", "chart2")
		.attr("transform", "translate(0," + (margin.top+height-30).toString() + ")")
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

	g2.append('text').attr('transform','translate(-35,-25)').text('[cm]'); 
	
	g2.append("svg:image")
    .attr("xlink:href", "https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/images/gpsDist.svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("x", -250)
    .attr("y",-30);		
								
	//Chart 3 
	// draw axes
	
	var g3 = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (smallIconspace+margin.top+ 3*(height+subToSubOffsetY) + subToOVOffsetY + time_height).toString() + ")");

	g3.append("g")
		.attr("class", "x axis")
		.attr("id", "chart3")
		.attr("transform", "translate(0," + (margin.top+height-30).toString() + ")")
		.call(time_axis)
		.selectAll("text")
		.attr("id",'tick-text')  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );

 	d3.selectAll("#tick-text")
 	    .style("font-weight", function(d) { return d.getHours() == 0 ? "bold" : ""; })
   		.style("font-size", function(d) { return d.getHours() == 0 ? 22 : 14; });

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

    g3.append('text').attr('transform','translate(-32,-25)').text('[m]'); 


    g3.append("svg:image")
    .attr("xlink:href", "https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/images/gndwater.svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("x", -250)
    .attr("y",-30);	 
    //draw overview chart
	var gOV = svg
		.append("g")
		.attr("transform", "translate(" + (margin.left-10) + "," + (smallIconspace+margin.top + time_height).toString() + ")");

	gOV.append("g")
		.attr("class", "x axis")
		.attr("id", "chart4")
		.attr("transform", "translate(0," + (margin.top+height-30).toString() + ")")
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
		.attr("transform","translate(-90,0)")
		.call(displacement_axis_OV);    

	gOV.append("g")
		.attr("class", "y axis")
		.attr("transform","translate(-180,0)")
		.call(level_axis_OV);

	//draw lineChart
		
    
	gOV.append('path')
	 	.attr("class", "linepathOV1")
    	.attr('d', line1_OV(dataAllObj));	
    gOV.append('path')
	 	.attr("class", "linepathOV2")
    	.attr('d', line2_OV(dataAllObj));	
    gOV.append('path')
	 	.attr("class", "linepathOV3")
    	.attr('d', line3_OV(dataAllObj));	
    //draw the warning line	
	var warnOV_Gndwater_1 = gOV.append("line")
                   .attr("x1", 0)
                   .attr("y1", scale_OV(-35))
                   .attr("x2", 620)
                   .attr("y2",scale_OV(-35))
				   .attr("class", "line")
				   .style("stroke-dasharray", ("5, 3"));
				   
	var warnOV_Gndwater_2 = gOV.append("line")
                   .attr("x1", 0)
                   .attr("y1", scale_OV(-42))
                   .attr("x2", 620)
                   .attr("y2",scale_OV(-42))
				   .attr("class", "line2")
				   .style("stroke-dasharray", ("5, 3"));	
    

	var gMaskLeft=gOV.append("g")
		.attr("class","mask")
		.append("rect")
		.attr('id','gMaskLeft')
		.attr('x',0)
		.attr('y',-20)
		.attr('width',0)
		.attr('height',height)
		.attr("opacity",0.3);
	
	var gMaskRight=gOV.append("g")
		.attr("class","mask")
		.append("rect")
		.attr('id','gMaskRight')
		.attr('x',width1-margin.left)
		.attr('y',-20)
		.attr('width',0)
		.attr('height',height)
		.attr("opacity",0.3);

	var gBrush = gOV.append("g")
	    .attr("class", "brush")
	    .call(brush)
	    .call(brush.event);
	//var brushHandleLoffset=-5;
    //gBrush.append('polygon').attr('id','brushHandleR').attr('transform','translate(615,0)').attr('points','0,-20 3,-20 3,40 10,55 3,70 3,130 0,130');
    //gBrush.append('polygon').attr('id','brushHandleL').attr('transform','translate('+brushHandleLoffset+',0)').attr('points','10,-20 7,-20 7,40 0,55 7,70 7,130 10,130');
	
	
    
	var grad = svg.append("linearGradient").attr({
		"id": "gradArea",
		"x1": "0%",
		"x2": "0%",
		"y1": "100%",
		"y2": "0%",
	});
	grad.append("stop").attr("offset", "30%").attr("stop-color", "#F9F9F9");
	grad.append("stop").attr("offset", "98%").attr("stop-color", "#e1e1e3");

	gBrush.append('polygon').attr('fill','url(#gradArea)').attr('id','zoomShadow').attr('transform','translate(0,210)').attr('points','0,0 '+(width1-margin.left).toString()+',0 '+(width1-margin.left).toString()+',70 0,70');

	gBrush.selectAll("rect")
		.attr("transform","translate(0,-20)")
	    .attr("height", height);	
	d3.selectAll(".resize").select("rect").style("visibility","visible").attr("width",4);    
	


	 //draw the warning line
	var warn_Rain_2 = g1.append("line")
                   .attr("x1", 0)
                   .attr("y1", rainfall_scale(200))
                   .attr("x2", 620)
                   .attr("y2",rainfall_scale(200))
				   .attr("class", "line2")
				   .style("stroke-dasharray", ("5, 3"));
	
	//draw the warning line
	var warn_Displacement_1 = g2.append("line")
                   .attr("x1", 0)
                   .attr("y1", displacement_scale(2))
                   .attr("x2", 620)
                   .attr("y2",displacement_scale(2))
				   .attr("class", "line")
				   .style("stroke-dasharray", ("5, 3"));
				   
	var warn_Displacement_2 = g2.append("line")
                   .attr("x1", 0)
                   .attr("y1", displacement_scale(0.5))
                   .attr("x2", 620)
                   .attr("y2",displacement_scale(0.5))
				   .attr("class", "line2")
				   .style("stroke-dasharray", ("5, 3"));
	//draw the warning line	
	var warn_Groundwater_1 = g3.append("line")
                   .attr("x1", 0)
                   .attr("y1", level_scale(-35))
                   .attr("x2", 620)
                   .attr("y2",level_scale(-35))
				   .attr("class", "line")
				   .style("stroke-dasharray", ("5, 3"));
				   
	var warn_Groundwater_2 = g3.append("line")
                   .attr("x1", 0)
                   .attr("y1", level_scale(-42))
                   .attr("x2", 620)
                   .attr("y2",level_scale(-42))
				   .attr("class", "line2")
				   .style("stroke-dasharray", ("5, 3"));
					
	//mousemove

	var bisectTime = d3.bisector(function(d) { return d.cdate; }).left;
	var	formatValue = d3.format(",.2f");
	var	formatCurrency = function(d) { return "$" + formatValue(d); };
	

	var text1 = g1.append("text")
    	.attr("id","g1text")
		.attr("transform","translate(80,0)")
		.attr("opacity",0.3)
		.text("");

	var text2 = g2.append("text")
    	.attr("id","g2text")
		.attr("transform","translate(80,0)")
		.attr("opacity",0.3)
		.text("");
		
	var text3 = g3.append("text")
    	.attr("id","g3text")
		.attr("transform","translate(80,0)")
		.attr("opacity",0.3)
		.text("");
	var text_time = g3.append("text")
		.attr("id","g3text_time")
		.attr("transform","translate(80,240)")
		.attr("opacity",0.5)
		.attr("font-size","16pt")
		.text("");
	var focus1 = g1
		.append("circle")
		.attr("id","g1dot")
		.attr("r", 0);

	var focus2 = g2
		.append("circle")
		.attr("id","g2dot")
		.attr("r", 0);
		
	var focus3 = g3
		.append("circle")
		.attr("id","g3dot")
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
		.attr("transform", "translate(" + (margin.left-10).toString() + "," + (margin.top+1.5*height).toString() + ")");					
	
	overlay.append("rect")
		.attr("class", "overlay")
		.attr("width", width1-margin.left)
		.attr("height", 4*height+10 + 2*margin.bottom)//.attr("height", 3*height + 2*margin.bottom)
		.on("click", mouseclick)
		.on("mousemove", mousemove);

	// var XYArea = d3.svg.line().x(function(d, i) {return d.x; }).y(function(d) { return d.y; });
	// var grad = svg.append("linearGradient").attr({
	// 	"id": "grad",
	// 	"x1": "0%",
	// 	"x2": "0%",
	// 	"y1": "0%",
	// 	"y2": "100%",
	// });
	// grad.append("stop").attr("offset", "30%").attr("stop-color", "white");
	// grad.append("stop").attr("offset", "98%").attr("stop-color", "#e1e1e3");
	// var enlarge_Height = margin.top + margin.bottom;
	// var enlarge_Site = [ {"x": 0, "y": enlarge_Height}, {"x": 0, "y": 0},
	// 		{"x": width, "y": 0}, {"x": width, "y": enlarge_Height}];
	// var enlarge_Area = gOV.append("g").append("path").attr("d", XYArea(enlarge_Site))
	// .attr("transform", "translate(0," + height + ")").attr("fill","url(#grad)");


	var dataTmpObj;	
	function mouseclick(){
		drawDataPanel(dataTmpObj);
	}
	
	
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
		
		dataTmpObj=d;
		focus1.attr("transform", "translate(" + time_scale(d.cdate) + "," + rainfall_scale(d.rainfall) + ")")
			  .attr("r", 5).attr("fill", pColor);
		
		d3.select("#g1text")
			.attr("opacity",1.0)
			.attr("transform","translate(" + time_scale(d.cdate) + "," + (rainfall_scale(d.rainfall)-10).toString() + ")")
			.text(Math.round(d.rainfall * 100) / 100);
		

		focus2.attr("transform", "translate(" + time_scale(d.cdate) + "," + displacement_scale(d.gpsDist) + ")")
			 .attr("r", 5).attr("fill", pColor);
		
		d3.select("#g2text").attr("opacity",1.0).attr("transform","translate(" + time_scale(d.cdate) + "," + (displacement_scale(d.gpsDist)-10).toString() + ")").text(Math.round(d.gpsDist * 100) / 100);
		

		focus3.attr("transform", "translate(" + time_scale(d.cdate) + "," + level_scale(d.gndWater) + ")")
			 .attr("r", 5).attr("fill", pColor);
		
		d3.select("#g3text").attr("opacity",1.0).attr("transform","translate(" + time_scale(d.cdate) + "," + (level_scale(d.gndWater)-10).toString() + ")").text(Math.round(d.gndWater * 100) / 100);
		d3.select('#g3text_time').attr("opacity",1.0).attr("transform","translate(" + time_scale(d.cdate) + ",240)").text(xdateformat(d.cdate));


	    focus_OV_water.attr("transform", "translate(" + time_scale_OV(d.cdate) + "," + scale_OV(GNDwater2GNDwaterN(d.gndWater)) + ")")
			 .attr("r", 3).attr("fill", pColor);

		focus_OV_gps.attr("transform", "translate(" + time_scale_OV(d.cdate) + "," + scale_OV(gps2GNDwaterN(d.gpsDist)) + ")")
			 .attr("r", 3).attr("fill", pColor);

		focus_OV_rain.attr("transform", "translate(" + time_scale_OV(d.cdate) + "," + scale_OV(rain2GNDwaterN(d.rainfall)) + ")")
			 .attr("r", 3).attr("fill", pColor);

	    updateData(d.cdate);
		moveHands();

	}	

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
	function brushstart(){
		
	    

	}
	function brushmove(){
		if (!d3.event.sourceEvent) return; // only transition after input
		var extent0 = brush.extent(),
		  extent1 = extent0.map(d3.time.day.round);

		// if empty when rounded, use floor & ceil instead
		if (extent1[0] >= extent1[1]) {
		extent1[0] = d3.time.day.floor(extent0[0]);
		extent1[1] = d3.time.day.ceil(extent0[1]);
		}

	
		//var brushWidth=time_scale_OV(extent1[1])-time_scale_OV(extent1[0]);
		var brushStartX=time_scale_OV(extent0[0]);
		var brushEndX=time_scale_OV(extent0[1]);
		d3.select('#gMaskLeft').attr('width',brushStartX);
	    d3.select('#gMaskRight').attr('x',brushEndX).attr('width',width1-margin.left-brushEndX);
	    //d3.select('#brushHandleL').attr('transform','translate('+brushStartX+',0)');
	    //d3.select('#brushHandleR').attr('transform','translate('+brushEndX+',0)');
	    gBrush.select('#zoomShadow').attr('points',brushStartX+',0 '+(brushEndX).toString()+',0 '+(width1-margin.left).toString()+',70 0,70');
   	
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
	  //var brushWidth=time_scale_OV(extent1[1])-time_scale_OV(extent1[0]);
	  var brushStartX=time_scale_OV(extent1[0]);
	  var brushEndX=time_scale_OV(extent1[1]);
	  d3.select('#gMaskLeft').transition().attr('width',brushStartX);
	  d3.select('#gMaskRight').transition().attr('x',brushEndX).attr('width',width1-margin.left-brushEndX);
	  //d3.select('#brushHandleL').attr('transform','translate('+brushStartX+',0)');
	  //d3.select('#brushHandleR').attr('transform','translate('+brushEndX+',0)');


	  time_scale.domain(brush.empty()?time_scale_OV:extent1);




	  time_axis = d3.svg.axis()
		.scale(time_scale)
		.orient('bottom')
		.ticks(12)
		.tickSubdivide(true)//true
		.tickSize(-height)//-height
		.tickFormat(function(d){return d.getHours() == 0 ? xdateformatDate(d):xdateformat(d);});

	  d3.select('#chart3')
		.call(time_axis)
		.selectAll("text")
 	    .style("font-weight", function(d) { return d.getHours() == 0 ? "bold" : ""; })
   		.style("font-size", function(d) { return d.getHours() == 0 ? 22 : 14; });

	  g1.select(".x.axis").call(time_axis);
	  g2.select(".x.axis").call(time_axis);
	  g3.select(".x.axis").call(time_axis);
	  zoomRedraw();
	  d3.selectAll("circle").attr("r",0);



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


