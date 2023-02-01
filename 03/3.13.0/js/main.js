/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN={LEFT: 40, RIGHT: 20, TOP: 20, BOTTOM: 30}
const WIDTH= 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const g = d3.select("#chart-area")
.append("svg")
.attr("widht", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
.attr("height",HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
.append("g")
.attr("transform",`translate(${MARGIN.LEFT},${MARGIN.TOP})`)


d3.csv("data/revenues.csv").then(data => {
    console.log(data)

})