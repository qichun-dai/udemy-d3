/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

d3.json("data/data.json").then(function(data){
	dara = data.filter(Number)
	console.log(data);
})