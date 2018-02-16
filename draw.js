
function drawMatrix(data, width, height, sizeOfCell){
	// circleData = [[10, "rgb(246, 239, 247)"], [15, "rgb(189,201,225)"],
	//       [20, "rgb(103,169,207)"], [25, "rgb(28,144,153)"], 
	//       [30, "rgb(1,108,89)"]];
	   
		//data = [[0,0,"rgb(246, 239, 247)"], [4,0,"rgb(246, 239, 100)"], [0,4,"rgb(100, 239, 247)"], [4,4,"rgb(246, 100, 247)"]];
		var svgContainer = d3.select("#dataFrame")
			.append("svg:svg")
			.attr("width", width)
			.attr("height", height);


		var rectangle = svgContainer.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x",  function(d){return d[0]})
			.attr("y",  function(d){return d[1]})
			.attr("width", sizeOfCell)
			.attr("height", sizeOfCell)
			.attr("stroke-width" , 1)
			.attr("stroke", "rgb(155, 155, 155")
			.style("fill", function(d){return d[2]});
  }