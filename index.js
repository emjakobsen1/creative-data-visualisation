var w = 800;
var h = 800;
var radius= 200;

var canvas = d3.select("#canvas").append("svg")
		.attr("width",w)
		.attr("height",h);
function drawCircles(scale,opacity) {
  var x = d3.scaleLinear()
  .domain([0, 100])        
  .range([0, w]);       
var y = d3.scaleLinear()
  .domain([0, 100])        
  .range([0, h]);  

canvas.append("circle")
.attr("cx", x(50)+scale)
.attr("cy", y(50))
.attr("r", scale)
.style("fill", "blue")
.style("fill-opacity",opacity);
canvas.append("circle")
.attr("cx", x(50))
.attr("cy", y(50))
.attr("r", scale)
.style("fill", "red")
.style("fill-opacity",opacity);
canvas.append("circle")
.attr("cx", x(50)+scale/2)
.attr("cy", y(50)-scale)
.attr("r", scale)
.style("fill", "green")
.style("fill-opacity",opacity);
}

drawCircles(radius,0.5);



