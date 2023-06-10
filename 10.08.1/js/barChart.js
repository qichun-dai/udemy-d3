/*
*    barChart.js
*    Mastering Data Visualization with D3.js
*    Project 4 - FreedomCorp Dashboard
*/

class BarChart {
  constructor(_parentElement, _variable, _title) {
    this.parentElement = _parentElement
    this.variable = _variable
    this.title = _title
    //this.date=_date

    this.initVis()
  }

  initVis() {
    const vis = this

    vis.MARGIN = { LEFT: 60, RIGHT: 50, TOP: 30, BOTTOM: 30 }
    vis.WIDTH = 350 - vis.MARGIN.LEFT - vis.MARGIN.RIGHT
    vis.HEIGHT = 130 - vis.MARGIN.TOP - vis.MARGIN.BOTTOM

    vis.svg = d3.select(vis.parentElement).append("svg")
      .attr("width", vis.WIDTH + vis.MARGIN.LEFT + vis.MARGIN.RIGHT)
      .attr("height", vis.HEIGHT + vis.MARGIN.TOP + vis.MARGIN.BOTTOM)

    vis.g = vis.svg.append("g")
      .attr("transform", `translate(${vis.MARGIN.LEFT}, ${vis.MARGIN.TOP})`)

    vis.linePath = vis.g.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke-width", "3px")
    
      vis.x = d3.scaleTime().range([0, vis.WIDTH])

    vis.x = d3.scaleTime()
    .range([0, vis.WIDTH])

    vis.y = d3.scaleLinear().range([vis.HEIGHT, 0])

    //function capitalizeFirstLetter(string) {
    //  return string.charAt(0).toUpperCase() + string.slice(1)
    //}

    vis.yAxisCall = d3.axisLeft()
      .ticks(4);
    vis.xAxisCall = d3.axisBottom()
      .tickFormat(d => "" + capitalizeFirstLetter(d))
    vis.xAxis = vis.g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${vis.HEIGHT})`)
    vis.yAxis = vis.g.append("g")
      .attr("class", "y axis")

    vis.g.append("text")
      .attr("class", "title")
      .attr("y", -15)
      .attr("x", -50)
      .attr("font-size", "12px")
      .attr("text-anchor", "start")
      .text(vis.title)

    vis.wrangleData()
  }


  
  wrangleData() {
    const vis = this

    vis.variable = $("#var-select").val()
    vis.dayNest = d3.nest()
      .key(d => formatTime(d.date))
      .entries(calls)

    vis.dataFiltered = vis.dayNest
      .map(day => day.values.reduce(
        (accumulator, current) => {
            accumulator.date = day.key
            accumulator[current.team] = accumulator[current.team] + current[vis.variable]
            return accumulator
        }, {
          "northeast": 0,
          "midwest": 0,
          "south": 0,
          "west": 0
        }
      ))

    vis.updateVis()
  }

  updateVis() {
    const vis = this

    vis.t = d3.transition().duration(750)

    vis.maxDateVal = d3.max(vis.dataFiltered, d => {
      var vals = d3.keys(d).map(key => key !== 'date' ? d[key] : 0)
      return d3.sum(vals)
    })

    // update scales
    vis.x.domain(d3.extent(vis.dataFiltered, (d) => parseTime(d.date)))
    vis.y.domain([0, vis.maxDateVal])

    // update axes
    vis.xAxisCall.scale(vis.x)
    vis.xAxis.transition(vis.t).call(vis.xAxisCall)
    vis.yAxisCall.scale(vis.y)
    vis.yAxis.transition(vis.t).call(vis.yAxisCall)

    vis.teams = vis.g.selectAll(".team")
      .data(vis.stack(vis.dataFiltered))
    
    // update the path for each team
    vis.teams.select(".area")
      .attr("d", vis.area)

    vis.teams.enter().append("g")
      .attr("class", d => `team ${d.key}`)
      .append("path")
        .attr("class", "area")
        .attr("d", vis.area)
        .style("fill", d => vis.color(d.key))
        .style("fill-opacity", 0.5)
  }

  // addLegend() {
  //   const vis = this

  //   const legend = vis.g.append("g")
  //     .attr("transform", "translate(50, -25)")

  //   const legendArray = [
  //     { label: "Northeast", color: vis.color("northeast") },
  //     { label: "West", color: vis.color("west") },
  //     { label: "South", color: vis.color("south") },
  //     { label: "Midwest", color: vis.color("midwest" )}
  //   ]

  //   const legendCol = legend.selectAll(".legendCol")
  //     .data(legendArray)
  //     .enter().append("g")
  //       .attr("class", "legendCol")
  //       .attr("transform", (d, i) => `translate(${i * 150}, 0)`)
        
  //   legendCol.append("rect")
  //     .attr("class", "legendRect")
  //     .attr("width", 10)
  //     .attr("height", 10)
  //     .attr("fill", d => d.color)
  //     .attr("fill-opacity", 0.5)

  //   legendCol.append("text")
  //     .attr("class", "legendText")
  //     .attr("x", 20)
  //     .attr("y", 10)
  //     .attr("text-anchor", "start")
  //     .text(d => d.label)
  // }
}

  