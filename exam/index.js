
var width = 850, height = 1350
var margin = 50;

var corals = d3.json("reef.json", function (error, data) {
    if (error) throw error;
    console.log(data.length)

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var xScale = d3.scalePow()
        .exponent(1)
        .domain([-0.5, 6.5])
        .range([margin, width - margin]);

    var yScale = d3.scaleLinear()
        .domain([-27, 27])
        .range([height - margin, margin]);

    var bleachScale = d3.scalePow()
        .exponent(0.3)
        .domain([0, 100])
        .range([0, 100]);

    var simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().strength(-0.8))
        .force('x', d3.forceX().x(function (d) {
            return xScale(parseFloat(d.TSA_Frequency_Standard_Deviation))

        }))
        .force('y', d3.forceY().y(function (d) {

            return yScale(parseFloat(d.Latitude_Degrees));

        }))
        .force('collision', d3.forceCollide().radius(function (d) {
            return (parseFloat(d.Percent_Cover) * 0.1) + 3;
        }))
        .on('tick', ticked);

    function ticked() {
        var u = d3.select('svg')
            .selectAll('circle')
            .data(data)
        u.enter()
            .append('circle')
            .attr('r', function (d) {
                return (parseFloat(d.Percent_Cover) * 0.1) + 3;
            })
            .merge(u)
            .attr('cx', function (d) {
                return d.x
            })
            .attr('cy', function (d) {
                return d.y
            })
            .attr("fill-opacity", function (d) {

                return 1 - bleachScale(d.Percent_Bleaching) * 0.01;
            })
            .style("fill", function (d) {
                if (d.Exposure == "Sheltered") {
                    return "#240eeb"
                }
                else if (d.Exposure == "Exposed") {
                    return "#9602d1"
                }
                else {
                    return "#35068c"
                }
            })
            .style("stroke", function (d) {
                if (d.Turbidity > 0.08 && d.Turbidity < 0.127) { return "#009678"; }
                else { return "black" }
            })
            .style("stroke-width", function (d) {
                if (d.Turbidity > 0.08 && d.Turbidity < 0.127) { return 1.5; }
                else { return 0.8; }
            })

            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                div.html("<strong>" + d.Substrate_Name + "</strong><br/> "
                    + "<em>" + d.Realm_Name + "</em><br/>"
                    + "Cover: " + d.Percent_Cover + "%"
                    + "<br/> Bleach: " + d.Percent_Bleaching + " %")
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px")
                    .style("z-index", 1);
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        u.exit().remove()
    };

    var xAxis = d3.axisBottom(xScale).tickSizeOuter(0).tickValues([0, 1, 2, 3, 4, 5, 6]).tickFormat(d3.format("d"));
    d3.select("#bottom").
        transition()
        .duration(3000).call(xAxis);

    var yAxis = d3.axisLeft(yScale).tickSizeOuter(0).tickSizeInner(-850).tickValues([-15, 0, 15]).tickFormat(d3.format("d"));
    d3.select("#left").
        transition()
        .duration(3000).call(yAxis);

    d3.selectAll(".domain")
        .attr("stroke", "#d6d4d4")
        .attr("stroke-width", "1.1")
        .attr("opacity", ".8");

    d3.selectAll(".tick text")
        .attr("font-size", "12")
        .attr("rotate", "-0")
        .attr("font-family", "sans-serif");



});


d3.select('svg')
    .append("text")
    .attr('class', 'labels')
    .attr('x', 550)
    .attr('y', 1270)
    .text("Standard Deviation of")
    .attr('fill', 'black');
d3.select('svg')
    .append("text")
    .attr('class', 'labels')
    .attr('x', 550)
    .attr('y', 1290)
    .text("Thermal Stress Anomaly Frequencies")
    .attr('fill', 'black');
d3.select('svg')
    .append("text")
    .attr('class', 'labels')
    .attr('x', 40)
    .attr('y', 60)
    .text("Latitude °")
    .attr('fill', 'black');

d3.select('#title')
    .append("text")
    .attr('x', 800)
    .attr('y', 120)
    .text("   Colors of the Deep")
    .style("font-size", 110)
    .style("font-family", "Nanum Myeongjo")
    .style("fill", "#2c2f30");

d3.select('#subtitle')
    .append("text")
    .attr('x', 800)
    .attr('y', 120)
    .text("   Finding Coral Reefs' Bright and Dark Spots")
    .style("font-size", 32)
    .style("font-family", "Merriweather")
    .style("fill", "#2c2f30");

var exampleCircle = {
    "Site_ID": 7885,
    "Sample_ID": 10321980,
    "Data_Source": "Reef_Check",
    "Latitude_Degrees": -8.75,
    "Longitude_Degrees": 157.5,
    "Ocean_Name": "Pacific",
    "Reef_ID": "NSSoeII",
    "Realm_Name": "Central Indo-Pacific",
    "Ecoregion_Name": "Solomon Islands and Bougainville",
    "Country_Name": "Solomon Islands",
    "State_Island_Province_Name": "Western Province",
    "City_Town_Name": "New Georgia Islands",
    "Site_Name": "nd",
    "Distance_to_Shore": 124.28,
    "Exposure": "Sheltered",
    "Turbidity": 0.0435,
    "Cyclone_Frequency": 46.46,
    "Date_Day": 21,
    "Date_Month": 4,
    "Date_Year": 2009,
    "Depth_m": 2,
    "Substrate_Name": "Hard Coral",
    "Percent_Cover": 20.62,
    "Bleaching_Level": "Population",
    "Percent_Bleaching": "35",
    "ClimSST": "302.16",
    "Temperature_Kelvin": "302.32",
    "Temperature_Mean": "302.1",
    "Temperature_Minimum": "298.39",
    "Temperature_Maximum": "306.11",
    "Temperature_Kelvin_Standard_Deviation": "1.19",
    "Windspeed": "4",
    "SSTA": "-0.28",
    "SSTA_Standard_Deviation": "0.88",
    "SSTA_Mean": "0",
    "SSTA_Minimum": "-3.21",
    "SSTA_Maximum": "3.05",
    "SSTA_Frequency": "10",
    "SSTA_Frequency_Standard_Deviation": "5.92",
    "SSTA_FrequencyMax": "26",
    "SSTA_FrequencyMean": "6",
    "SSTA_DHW": "0",
    "SSTA_DHW_Standard_Deviation": "3.12",
    "SSTA_DHWMax": "21.74",
    "SSTA_DHWMean": "2.01",
    "TSA": "-0.75",
    "TSA_Standard_Deviation": "1.19",
    "TSA_Minimum": "-4.67",
    "TSA_Maximum": "3.03",
    "TSA_Mean": "-0.96",
    "TSA_Frequency": "3",
    "TSA_Frequency_Standard_Deviation": "2.14",
    "TSA_FrequencyMax": "11",
    "TSA_FrequencyMean": "1",
    "TSA_DHW": "0",
    "TSA_DHW_Standard_Deviation": "1.42",
    "TSA_DHWMax": "8.04",
    "TSA_DHWMean": "0.57",
    "Date": "2009-04-21 00:00:00",
    "Site_Comments": "nd",
    "Sample_Comments": "nd",
    "Bleaching_Comments": "nd"
};

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var legend = d3.select("#legend").append("svg")
    .attr("width", 510)
    .attr("height", 170)
legend.append("rect")
    .attr("width", 510)
    .attr("height", 168)
    .attr("rx", 20)
    .attr("x", 0)
    .attr("y", 2)
    .attr("fill", "none")
    .style("stroke", "black")
    .style("stroke-opacity", 0.5)
    .style("stroke-width", 0.5);

legend.append("text").attr('class', 'labels').attr("x", 5).attr("y", 30).text("How to read it:")

legend.append("circle")
    .attr("cx", 75).attr("cy", 65).attr("r", 13)
    .style("fill", "#240eeb")
    .style("fill-opacity", 1)
    .style("stroke", "black")
    .style("stroke-width", 0.8)
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html("<strong>" + exampleCircle.Substrate_Name + "</strong><br/> "
            + "<em>" + exampleCircle.Realm_Name + "</em><br/>"
            + "Cover: 0%"
            + "<br/> Bleach: " + exampleCircle.Percent_Bleaching + " %")
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px")
            .style("z-index", 1);

    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });
legend.append("text").attr('class', 'legends').attr("x", 95).attr("y", 63)
    .text("The size and transparency of the circle indicates the corals health,");
legend.append("text").attr('class', 'legends').attr("x", 95).attr("y", 75)
    .text("size being its the coral cover and transparency how much it has bleached.");

legend.append("text").attr('class', 'legends').attr("x", 40).attr("y", 103)
    .text("The colors indicate the corals exposure. Pink is exposed, blue is sheltered");
legend.append("text").attr('class', 'legends').attr("x", 40).attr("y", 115)
    .text("and purple indicates \"sometimes\" exposed.");

legend.append("circle")
    .attr("cx", 450).attr("cy", 103).attr("r", 9)
    .style("fill", "#9602d1")
    .style("fill-opacity", 0.65)
    .style("stroke", "black")
    .style("stroke-width", 0.8)
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html("<strong>Nutrient Indicator Algae</strong><br/> "
            + "<em>" + exampleCircle.Realm_Name + "</em><br/>"
            + "Cover: 17%"
            + "<br/> Bleach: 35%")
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px")
            .style("z-index", 1);

    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

legend.append("circle")
    .attr("cx", 75).attr("cy", 145).attr("r", 12)
    .style("fill", "#35068c")
    .style("fill-opacity", 1)
    .style("stroke", "#009678")
    .style("stroke-width", 1.5)
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html("<strong>Nutrient Indicator Algae</strong><br/> "
            + "<em>" + exampleCircle.Realm_Name + "</em><br/>"
            + "Cover: 19%"
            + "<br/> Bleach: 0%")
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px")
            .style("z-index", 1);

    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

legend.append("text").attr('class', 'legends').attr("x", 95).attr("y", 143)
    .text("The coral has a turquise border if it resides in the \"sweet spot\" for turbidity ");
legend.append("text").attr('class', 'legends').attr("x", 95).attr("y", 155)
    .text("between 0.08 and 0.127 Kd490.");
