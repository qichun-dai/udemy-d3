/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

const svg= d3.select("#chart-area")
.append("svg")

svg.append("rect")
.attr("x",40)
.attr("y",0)
.attr("width",200)
.attr("height",100)
.attr("fill","blue")


svg.append("circle")
.attr("cx",100)
.attr("cy",100)
.attr("r",20)
.attr("fill","yellow")

svg.append("line")
.attr("x1",100)
.attr("y1",100)
.attr("x2",200)
.attr("y2",200)
.attr("stroke","red")
.attr("stroke-width", 3)
