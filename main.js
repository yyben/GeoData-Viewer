var fname="data1.tsv", fpath="./p2data/";
var times=[],dataRainfall=[],dataGndWater=[],dataDist=[];//array
var objRainfall=[], objGndWater=[], objDist=[];//e.g. {cdate: 2012/6/5 0:00,val:-55}
var dateformat=d3.time.format("%Y/%m/%d %H:%M");
var labelDateFormat=d3.time.format("%Y/%m/%d ");
parseData();
function parseData(){
	d3.text(fpath+fname,function(text){
		d3.csv.parseRows(text,function(d,i){
			var tTmp=dateformat.parse(d[0]);
			times.push(tTmp);
			dataRainfall.push(parseFloat(d[1]));
			dataGndWater.push(parseFloat(d[2]));
			dataDist.push(parseFloat(d[3]));
			objRainfall.push({cdate:tTmp,val:parseFloat(d[1])});
			objGndWater.push({cdate:tTmp,val:parseFloat(d[2])});
			objDist.push({cdate:tTmp,val:parseFloat(d[3])});	
		});
		console.log(objRainfall);


	});


}
