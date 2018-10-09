  var x = d3.scale.linear().range([0,aepWidth-100]),//aep-x-axis
	                            y = d3.scale.ordinal().rangeRoundBands([0,$('#tableExample').height()-200]);
                                x.domain([0, d3.max(data, function(d) { return d.aep; })]);
                                var red = d3.rgb(255,0,0);    
	                            var green = d3.rgb(103,168,0); 
                                var compute = d3.interpolate(red,green);
                                var linear = d3.scale.linear()
                                    .domain([d3.min(data, function(d) { return d.aep; }), d3.max(data, function(d) { return d.aep; })])
                                    .range([0,1]);
                                y.domain(data.map(function(d) { 
                                    return fjbhM.get(d.fjbh); }));
                                var  yAxis = d3.svg.axis().scale(y).orient("left");
                                var Xsvg = d3.select("#aep-x-axis").append("svg")
                                            .style('width','100%')
                                            .style('height','100%')
                                Xsvg.append("g")
                                    .attr("class", "y axis")
                                    .style("fill", "white")
                                    .attr("transform", "translate(50,40)")
                                    .call(yAxis)
                                var bar = Xsvg.selectAll("g.bar")
                                            .data(data)
                                            .enter().append("g")
                                            .attr("class", "bar")
                                            .attr("transform", function(d) {
                                                console.log(y(fjbhM.get(d.fjbh)));
                                                return "translate(52," + (y(fjbhM.get(d.fjbh))+45) + ")"; });

                                    bar.append("rect")
                                            .attr("width", function(d) { return x(d.aep); })
                                            .style("fill",function(d){
                                                return compute(linear(d.aep));
                                            })
                                        .style("cursor","pointer")
                                            .attr("height", y.rangeBand()-20)
                                            .on("click", clicked)
                                            .on("dblclick", dblclicked)
                                            .on("mouseover", mouseover)
                                            .on("mousemove", mousemove)
                                            .on("mouseout", mouseout);
