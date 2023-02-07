/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
const x = d3.scaleLinear()
    .domain([0, 5000])    // INPUT!
    .range([0, WIDTH]);  // OUTPUT!

const MARGIN={LEFT: 40, RIGHT: 20, TOP: 20, BOTTOM: 30}
const WIDTH= 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const g = d3.select("#chart-area")
.append("svg")
.attr("widht", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
.attr("height",HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
.append("g")
.attr("transform",`translate(${MARGIN.LEFT},${MARGIN.TOP})`)

const topAxisCall = d3.axisTop(x)
 
g.append("g")
    .attr("class", "top axis")
    .call(topAxisCall);
    
d3.csv("data/revenues.csv").then(data => {
    data.forEach(d => {
        d.revenue=Number(d.revenue);
        d.profit=Number(d.profit);
    });

    console.log(data)

})