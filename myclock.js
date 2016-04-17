var radians = 0.0174532925, 
	clockRadius = 100,
	margin = 50,
	width = (clockRadius+margin)*2,
    height = (clockRadius+margin)*2+400,//+400 for data panel
    hourHandLength = 2*clockRadius/3,
    minuteHandLength = clockRadius,
    secondHandLength = clockRadius-12,
    secondHandBalance = 30,
    secondTickStart = clockRadius;
    secondTickLength = -10,
    hourTickStart = clockRadius,
    hourTickLength = -18
    secondLabelRadius = clockRadius + 16;
    secondLabelYOffset = 5
    hourLabelRadius = clockRadius - 40
    hourLabelYOffset = 7;


var hourScale = d3.scale.linear()
	.range([0,330])
	.domain([0,11]);

var minuteScale = secondScale = d3.scale.linear()
	.range([0,354])
	.domain([0,59]);

var handData = [
	{
		type:'hour',
		value:0,
		length:-hourHandLength,
		scale:hourScale
	},
	{
		type:'minute',
		value:0,
		length:-minuteHandLength,
		scale:minuteScale
	},
	{
		type:'second',
		value:0,
		length:-secondHandLength,
		scale:secondScale,
		balance:secondHandBalance
	}
];


var svgclock = d3.select("#mypanel").append("svg")
    .attr("width", width)
    .attr("height", height);
var apm;//indicator of am/pm



function drawClock(){ //create all the clock elements
	updateData(new Date("April 16, 2016 00:00:00"));	//draw them in the correct starting position

	var face = svgclock.append('g')
		.attr('id','clock-face')
		.attr('transform','translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

	//... and hours
	face.selectAll('.hour-tick')
		.data(d3.range(0,12)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});

	face.selectAll('.hour-label')
		.data(d3.range(3,13,3))
			.enter()
			.append('text')
			.attr('class', 'hour-label')
			.attr('text-anchor','middle')
			.attr('x',function(d){
				return hourLabelRadius*Math.sin(hourScale(d)*radians);
			})
			.attr('y',function(d){
				return -hourLabelRadius*Math.cos(hourScale(d)*radians) + hourLabelYOffset;
			})
			.text(function(d){
				return d;
			});


	var hands = face.append('g').attr('id','clock-hands');

	face.append('g').attr('id','face-overlay')
		.append('circle').attr('class','hands-cover')
			.attr('x',0)
			.attr('y',0)
			.attr('r',clockRadius/20);

	face.append('g')
		.attr('id','apm-indicator')
		.attr('class','apm-ind')
		.append('text')
		.attr('x',clockRadius)
		.attr('y',clockRadius)
		.text(apm);	

	hands.selectAll('line')
		.data(handData)
			.enter()
			.append('line')
			.attr('class', function(d){
				return d.type + '-hand';
			})
			.attr('x1',0)
			.attr('y1',function(d){
				return d.balance ? d.balance : 0;
			})
			.attr('x2',0)
			.attr('y2',function(d){
				return d.length;
			})
			.attr('transform',function(d){
				return 'rotate('+ d.scale(d.value) +')';
			});
}

function moveHands(){
	d3.select('#clock-hands').selectAll('line')
	.data(handData)
		.transition()
		.attr('transform',function(d){
			return 'rotate('+ d.scale(d.value) +')';
		});
	d3.select('#apm-indicator').selectAll('text').text(apm);
}

function updateData(cdate){
	var hr,min;
	hr=cdate.getHours();
	min=cdate.getMinutes();
	var t = new Date();
	if(hr>=12){apm='PM';}
	else{apm='AM';}
	handData[0].value = (hr % 12);
	handData[1].value = min;
	handData[2].value = 0;
}



//use-form
// updateData(new Date(...));
// moveHands();

d3.select(self.frameElement).style("height", height + "px");