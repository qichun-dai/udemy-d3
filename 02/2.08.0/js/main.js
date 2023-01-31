/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/


const svg = d3.select("#chart-area")
.append("svg")
.attr("widht", "500")
.attr("height","500")

d3.json("data/buildings.json").then(data =>{
    data.forEach(d => {
        d.height=Number(d.height)
    });

const rects = svg.selectAll("rect")
.data(data)

rects.enter().append("rect")
.attr('x', (d,i)=>(i*50))
.attr('y', 5)
.attr('width', 20)
.attr('height', (d)=>d.height)
.attr('stroke', 'black')
.attr('fill', '#69a3b2');
})