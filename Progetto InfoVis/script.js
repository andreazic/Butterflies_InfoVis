
const margin = {top: 10, right: 10, bottom: 10, left: 10};
const width = 1500 - margin.left - margin.right;
const height = 1000 - margin.top - margin.bottom;
const updateTime = 1000;

var clickCounter = -1;
var dataSet = [];

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var scaleWing = d3.scaleLinear();
var xScale = d3.scaleLinear();
var yScale = d3.scaleLinear();
var wingDomainMaxes = [];
var xDomainMaxes;
var yDomainMaxes;


function setScale() {
    wingDomainMaxes.push(d3.max(dataSet, function(d) {return  d[2]}))
    wingDomainMaxes.push(d3.max(dataSet, function(d) {return  d[3]}))
    wingDomainMaxes.push(d3.max(dataSet, function(d) {return  d[4]}))
    scaleWing.domain([0, wingDomainMaxes[0]])
    scaleWing.range([20, 120])

    xDomainMaxes = d3.max(dataSet, function(d) {return  d[0]})
    xScale.domain([0, xDomainMaxes])
    xScale.range([120, 1380])

    yDomainMaxes = d3.max(dataSet, function(d) {return d[1]})
    yScale.domain([0, yDomainMaxes])
    yScale.range([120, 880])
}

function drawButterfly() {
    updateDrawing()
    clickCounter++
}

function drawBody() {
    var ellipses = svg.selectAll(".body").data(dataSet, function(d) {return d})
    ellipses.exit().remove()
    ellipses.enter()
    .append("ellipse")
    .attr("class", "body")
    .attr("cx", function(d) {return xScale(d[0])})
    .attr("cy", function(d) {return yScale(d[1])})
    .attr("rx", function(d) {return 6})
    .attr("ry", function(d) {return 25})
    .attr("fill", "black")
    .attr("stroke", "black")
    .on("click", function(ev) {updateWings();})

    var leftAntenna = svg.selectAll(".leftline").data(dataSet, function(d) {return d})
    leftAntenna.exit().remove()
    leftAntenna.enter()
    .append("line")
    .attr("x1", function(d) {return (xScale(d[0])-3)})
    .attr("y1", function(d) {return (yScale(d[1])-12)})
    .attr("x2", function(d) {return (xScale(d[0])-10)})
    .attr("y2", function(d) {return (yScale(d[1])-45)})
    .attr("stroke-width", 2)
    .attr("stroke", "black")
    .on("click", function(ev) {updateWings();})

    var rightAntenna = svg.selectAll(".rightline").data(dataSet, function(d) {return d})
    rightAntenna.exit().remove()
    rightAntenna.enter()
    .append("line")
    .attr("x1", function(d) {return (xScale(d[0])+3)})
    .attr("y1", function(d) {return (yScale(d[1])-12)})
    .attr("x2", function(d) {return (xScale(d[0])+10)})
    .attr("y2", function(d) {return (yScale(d[1])-45)})
    .attr("stroke-width", 2)
    .attr("stroke", "black")
    .on("click", function(ev) {updateWings();})
};

function updateWings() {
    if (clickCounter==1)  clickCounter++ 
    else  stdUpdate() 
}

function stdUpdate() {
    if (clickCounter==0) 
    {
        updateScale(1)
        updateDrawing()
        clickCounter++
    }
    else if (clickCounter==2) 
    {
        updateScale(2)
        updateDrawing()
        clickCounter++
    }
    else if (clickCounter==3) 
    {
        updateScale(0)
        updateDrawing()
        clickCounter=0
    }
}

function updateDrawing(){

    var wings = svg.selectAll(".wing").data(dataSet, function(d){return d});
    wings.exit().remove();

    wings.enter()
    .append("polygon")
    .attr("class", "wing")
    .attr("points", function (d) {return updateSize(d)})
    .attr("fill", "lightblue")
    .attr("stroke", "black")
    .on("click", function(ev) {updateWings();})

    wings.transition().duration(updateTime)
    .attr("class", "wing")
    .attr("points", function (d) {return updateSize(d)})

    drawBody()
}

function updateSize(d) {
    if (clickCounter==0) {
        return (xScale(d[0]) + scaleWing(d[3])) + "," + (yScale(d[1]) - scaleWing(d[3])) + " " + (xScale(d[0]) + scaleWing(d[3])/2) + "," +yScale(d[1]) + " " + (xScale(d[0]) + scaleWing(d[3])) + "," + (yScale(d[1]) + scaleWing(d[3])) + " " + (xScale(d[0]) - scaleWing(d[3])) + "," + (yScale(d[1]) - scaleWing(d[3])) + " " + (xScale(d[0]) - scaleWing(d[3])/2) + "," +yScale(d[1]) + " " + (xScale(d[0]) - scaleWing(d[3])) + "," + (yScale(d[1]) + scaleWing(d[3]))
    }
    else if (clickCounter==2) {
        return (xScale(d[0]) + scaleWing(d[4])) + "," + (yScale(d[1]) - scaleWing(d[4])) + " " + (xScale(d[0]) + scaleWing(d[4])/2) + "," +yScale(d[1]) + " " + (xScale(d[0]) + scaleWing(d[4])) + "," + (yScale(d[1]) + scaleWing(d[4])) + " " + (xScale(d[0]) - scaleWing(d[4])) + "," + (yScale(d[1]) - scaleWing(d[4])) + " " + (xScale(d[0]) - scaleWing(d[4])/2) + "," +yScale(d[1]) + " " + (xScale(d[0]) - scaleWing(d[4])) + "," + (yScale(d[1]) + scaleWing(d[4]))
    }
    else if (clickCounter==3 || clickCounter==-1) {
        return (xScale(d[0]) + scaleWing(d[2])) + "," + (yScale(d[1]) - scaleWing(d[2])) + " " + (xScale(d[0]) + scaleWing(d[2])/2) + "," +yScale(d[1]) + " " + (xScale(d[0]) + scaleWing(d[2])) + "," + (yScale(d[1]) + scaleWing(d[2])) + " " + (xScale(d[0]) - scaleWing(d[2])) + "," + (yScale(d[1]) - scaleWing(d[2])) + " " + (xScale(d[0]) - scaleWing(d[2])/2) + "," +yScale(d[1]) + " " + (xScale(d[0]) - scaleWing(d[2])) + "," + (yScale(d[1]) + scaleWing(d[2]))
    }
}

function updateScale(value) {
    scaleWing.domain([0, wingDomainMaxes[value]])
}

d3.json("data/butterfly.json")
	.then(function(data) {
        data.forEach(row => {
            arr = Object.getOwnPropertyNames(row).map(function(e) {return row[e];});
            dataSet.push(arr);
        });
        setScale()
        drawButterfly()
    })
	.catch(function(error) {
		console.log(error);
  	});