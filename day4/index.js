var w = 1000;
var h = 800;

var canvas = d3.select("svg")
	.attr("width", w)
	.attr("height", h)
	.style("background-color", "white")

let form = document.forms["my-form"];
form.addEventListener("submit", getValues);

function getValues(event) {
	d3.selectAll("defs")
		.remove();
	birthdays = [];
	event.preventDefault();
	birthdays.push(dataConvert(this.day.value, this.month.value, this.year.value));
	getGradient(birthdays[0].generation[0], birthdays[0].generation[1])
	draw();
}

function dataConvert(dayInput, monthInput, yearInput) {
	var generation;
	var year = yearInput;
	switch (true) {
		case year > 1996:
			generation = ["#ff9900", "black"]
			break;
		case year > 1980:
			generation = ["#ff9999", "black"]
			break;
		case year > 1964:
			generation = ["#ff99e6", "black"]
			break;
		default:
			generation = ["#99ffcc", "black"];
	}
	return birthday = { day: dayInput, month: monthInput, generation: generation, year: new Date().getFullYear() - yearInput };
}


var centerX = w / 2-100;
var centerY = h / 2-200;

function getPath(centerX, centerY, year, month, day) {
	var path = d3.path();
	path.moveTo(centerX, centerY)
	var xValues = [centerX];
	var yValues = [centerY];

	for (var j = 0; j < year; j++) {
		xValues[j] = (centerX + 350 * (Math.random()) * Math.cos(Math.PI * j / Math.random() * 12));
		yValues[j] = (centerY + 350 * (Math.random()) * Math.sin(Math.PI * j / Math.random() * 12));

		path.lineTo(xValues[j], yValues[j]);
		path.lineTo(centerX, centerY);
		path.lineTo(xValues[j], yValues[j]);
		var xValuesLeaves = [xValues[j]];
		var yValuesLeaves = [yValues[j]];

		for (var i = 0; i < month; i++) {
			xValuesLeaves[i] = (xValues[j] + 150 * (Math.random()) * Math.cos(Math.PI * i / month));
			yValuesLeaves[i] = (yValues[j] + 150 * (Math.random()) * Math.sin(Math.PI * i / month));

			path.lineTo(xValuesLeaves[i], yValuesLeaves[i]);
			path.lineTo(xValues[j], yValues[j]);
			path.lineTo(xValuesLeaves[i], yValuesLeaves[i]);
			var xValuesLeavesLeaves = [xValuesLeaves[i]];
			var yValuesLeavesLeaves = [yValuesLeaves[i]];

			for (var k = 0; k < day; k++) {
				xValuesLeavesLeaves[k] = (xValuesLeaves[i] + 75 * (Math.random()) * Math.cos(Math.PI * i / day));
				yValuesLeavesLeaves[k] = (yValuesLeaves[i] + 75 * (Math.random()) * Math.sin(Math.PI * i / day));
				path.lineTo(xValuesLeavesLeaves[k], yValuesLeavesLeaves[k]);
				path.lineTo(xValuesLeaves[i], yValuesLeaves[i]);
			}
			path.lineTo(xValues[j], yValues[j])
		}
		path.lineTo(centerX, centerY);
	}
	return path;
}

function draw() {
	canvas.selectAll("path")
		.data(birthdays)
		.join("path")
		.attr("d", function (d) {
			return getPath(w / 2, h / 2, d.year, d.month, d.day);
		})
		.attr("fill", "none")
		.attr("stroke", "url(#svgGradient)")
		.attr("stroke-width", "0.05%")
		.style("fill-opacity", 1)
}

function getGradient(color1, color2) {
	var defs = canvas.append("defs");
	var gradient = defs.append("linearGradient")
		.attr("id", "svgGradient")
		.attr("x1", "0%")
		.attr("x2", "100%")
		.attr("y1", "0%")
		.attr("y2", "100%");
	gradient.append("stop")
		.attr("class", "start")
		.attr("offset", "0%")
		.attr("stop-color", color1)
		.attr("stop-opacity", 1);
	gradient.append("stop")
		.attr("class", "end")
		.attr("offset", "100%")
		.attr("stop-color", color2)
		.attr("stop-opacity", 1);
}



