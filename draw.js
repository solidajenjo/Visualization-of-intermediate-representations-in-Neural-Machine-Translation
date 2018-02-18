var sizeOfCell = 8;
var width = 800;
var height = 1000;
var sizeOfInput = 10000;

function draw(){
	var svgContainer = d3.select("#dataFrame")
	svgContainer.selectAll("*").remove();
	drawMatrix(generateDataToPaint(sizeOfCell));
}

function drawMatrix(data){
	var p1 = getPhrase1();
	var p2 = getPhrase2();
	if (p1 == "" || p2 == "") alert ("At least one of the phrases is empty");
	else{
		var dataOffsetY = 100;
		var dataOffsetX = 20;
		var svgContainer = d3.select("#dataFrame")
			.append("svg:svg")
			.attr("width", width + dataOffsetX)
			.attr("height", height);
		var textData = "Diference of \"" + p1 + "\" and \"" + p2 + "\" translation";				
		//TODO SPLIT TEXT TO FIT THE FRAME
		svgContainer.append("text")
			.attr("x", 10)
			.attr("y", 10)
			.text(textData)
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "red");
		var yAxisData = [];
		var yAdjust = 2;
		var yOffset = 13;
		var axisYPosX = 5;
		for (var i = 0; i < 100; i++){
			yAxisData.push([axisYPosX, ((i + yOffset) * sizeOfCell) + yAdjust, i * 100]);
		}
		svgContainer.selectAll("text.Y")
			.data(yAxisData)
			.enter()
			.append("text")			
			.attr("x",  function(d){return d[0]})
			.attr("y",  function(d){return d[1]})
			.text(function(d){return d[2]})			
			.attr("font-family", "sans-serif")
			.attr("font-size", "6px")
			.attr("fill", "red");

		var xAxisData = [];
		var xAdjust = 2;
		var xOffset = 3;
		var axisXPosY = 5;
		for (var i = 0; i < 100; i++){
			xAxisData.push([((i + xOffset) * sizeOfCell) + xAdjust, axisXPosY, i]);
		}
		svgContainer.selectAll("text.X")
			.data(xAxisData)
			.enter()
			.append("text")
			.attr("transform", "translate(0,100) rotate(-90)")
			.attr("x",  function(d){return d[1]})
			.attr("y",  function(d){return d[0]})
			.text(function(d){return d[2]})			
			.attr("font-family", "sans-serif")
			.attr("font-size", "6px")
			.attr("fill", "red");
	

		var div = d3.select("body").append("div")	
			.attr("class", "tooltip")				
			.style("opacity", 0);	

		svgContainer.selectAll("rect")
			.data(data)
			.enter()			
			.append("rect")
			.attr("x",  function(d){return d[0] + dataOffsetX})
			.attr("y",  function(d){return d[1] + dataOffsetY})
			.attr("width", sizeOfCell)
			.attr("height", sizeOfCell)
			.attr("stroke-width" , 1)
			.attr("stroke", "rgb(155, 155, 155")
			.style("fill", function(d){return d[2]})
			.on("mouseover", function(d) {		
	            div.transition()		
	                .duration(200)		
	                .style("opacity", .9);		
	            div.html(d[3]+d[4]+"<br/>"+d[5]+"<br/>")	
	                .style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px");	
	            })					
	        .on("mouseout", function(d) {		
	            div.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
	        });

	}
}