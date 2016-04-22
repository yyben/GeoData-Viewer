var fin="https://gitcdn.xyz/repo/yyben/GeoData-Viewer/master/p2data/data1.tsv";
var times=[],dataRainfall=[],dataGndWater=[],dataDist=[],accu24Rain=[];//array
var objRainfall=[], objGndWater=[], objDist=[],accu24RainObj=[],dataAllObj=[];//e.g. {cdate: 2012/6/5 0:00,val:-55}
var dateformat=d3.time.format("%Y/%m/%d %H:%M");
var labelDateFormat=d3.time.format("%Y/%m/%d ");
var weekday = new Array(7);
var months = new Array(12);
var dateStr="2012/6/11";//the selected date within the week
var selectedDate=dateformat.parse(dateStr+" 00:00");
var startDate=selectedWeek(selectedDate);
var endDate=addDays(startDate, 7);


initAttr();
parseData();

function initAttr(){
	//weekday init
	weekday[0]=  "Sun.";
	weekday[1] = "Mon.";
	weekday[2] = "Tue.";
	weekday[3] = "Wed.";
	weekday[4] = "Thu.";
	weekday[5] = "Fri.";
	weekday[6] = "Sat.";

	
}
function selectedWeek(date){
    var wkDay=selectedDate.getDay();
    var stDate=addDays(selectedDate,-wkDay);
    return stDate;
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function parseData(){
	d3.tsv(fin,function(d){

		for(var i=0;i<d.length;i++){
			var tTmp=dateformat.parse(d[i].Time);
			var data1=d[i].Rainfall,data2=d[i].GroundWater,data3=d[i].Distance;
			times.push(tTmp);
			dataRainfall.push(parseFloat(data1));
			dataGndWater.push(parseFloat(data2));
			dataDist.push(parseFloat(data3));
			objRainfall.push({cdate:tTmp,val:parseFloat(data1)});
			objGndWater.push({cdate:tTmp,val:parseFloat(data2)});
			objDist.push({cdate:tTmp,val:parseFloat(data3)});
		}
		accu24Rain=accuToAccu24h(dataRainfall);
    	for(var i=0;i<times.length;i++){
    		accu24RainObj.push({cdate:times[i],val:accu24Rain[i]});
    		dataAllObj.push({cdate:times[i],rainfall:accu24Rain[i],gndWater:dataGndWater[i],gpsDist:dataDist[i]});
    	}
    	draw();//in chartFcn.js
    	//drawClock();
    	
	});
}
function accuToAccu24h(d){
	var resultArr=[];
	var accNhr=24,binSize=2;
	
	for(var i=0;i<d.length;i++){
		resultArr.push(getAccuNdata(d,accNhr/binSize,i));
	}
	return resultArr;
}
function getAccuNdata(d,n,idx){//idx is the array position 0,1,2,3,4,...    d is data array, n is the number, idx is the index
	var sum=0;
	if(idx<n) {
		sum=d[idx]-d[0];
	}
	else{
		sum=d[idx]-d[idx-n];
	}
	return sum;
}

