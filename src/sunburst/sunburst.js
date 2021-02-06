function partition(t){var e=d3.hierarchy(t).sum((t=>t.value)).sort(((t,e)=>e.value-t.value));return d3.partition().size([2*Math.PI,e.height+1])(e)}d3.json("flare-3.json").then((t=>{var e=d3.scaleOrdinal(["#6B2FC6","#ff339a","#de3efd","#5a9bd5","#ff8cfa","#1e64b2","#e677e7","#901478"]).domain(["TV","Display","Paid Search","Social","Email","OTT","Online Radio","Podcast"]),a=(d3.format(",d"),932),r=a/6,n=d3.arc().startAngle((t=>t.x0)).endAngle((t=>t.x1)).padAngle((t=>Math.min((t.x1-t.x0)/2,.005))).padRadius(233).innerRadius((t=>t.y0*r)).outerRadius((t=>Math.max(t.y0*r,t.y1*r-1))),i=partition(t);i.each((t=>t.current=t));var l=d3.select("div").style("width","100%").append("svg").attr("viewBox",[0,0,a,a]).style("font","10px sans-serif"),o=l.append("g").attr("transform","translate(466,466)"),s=o.append("foreignObject").style("pointer-events","none").attr("width",200).attr("height",500).attr("x",-100).attr("y",-60).append("xhtml:span").html("<p style='font-size:30px;text-align:center;'> Total Conversions:</br> <span style='color: #3D4B57;'>778K</span></p>"),c=o.append("g").selectAll("path").data(i.descendants().slice(1)).join("path").attr("fill",(t=>{for(;t.depth>1;)t=t.parent;return e(t.data.name)})).attr("fill-opacity",(t=>h(t.current)?t.children?.6:.4:0)).attr("d",(t=>n(t.current))).on("mouseover",(function(t,e){var a=0==d3.select(this).attr("fill-opacity")?0:.9;d3.select(this).attr("fill-opacity",a),s.html("<p style='font-size:30px;text-align:center;'> "+e.data.name+" Conversions:</br> <span style='color: #3D4B57;'>"+e.data.label+"</span></p>")})).on("mouseout",(function(t,e){d3.select(this).attr("fill-opacity",(t=>h(t.current)?t.children?.6:.4:0)),s.html("<p style='font-size:30px;text-align:center;'> Total Conversions:</br> <span style='color: #3D4B57;'>778K</span></p>")}));c.filter((t=>t.children)).style("cursor","pointer").on("click",u);var d=o.append("g").attr("pointer-events","none").attr("text-anchor","middle").style("user-select","none").selectAll("text").data(i.descendants().slice(1)).join("text").attr("dy","0.35em").attr("font-size",12).attr("fill-opacity",(t=>+f(t.current))).attr("transform",(t=>x(t.current))).text((t=>t.data.name)),p=o.append("circle").datum(i).attr("r",r).attr("fill","none").attr("pointer-events","all").on("click",u);function u(t,e){p.datum(e.parent||i),i.each((t=>t.target={x0:2*Math.max(0,Math.min(1,(t.x0-e.x0)/(e.x1-e.x0)))*Math.PI,x1:2*Math.max(0,Math.min(1,(t.x1-e.x0)/(e.x1-e.x0)))*Math.PI,y0:Math.max(0,t.y0-e.depth),y1:Math.max(0,t.y1-e.depth)}));var a=o.transition().duration(750);c.transition(a).tween("data",(t=>{var e=d3.interpolate(t.current,t.target);return a=>t.current=e(a)})).filter((function(t){return+this.getAttribute("fill-opacity")||h(t.target)})).attr("fill-opacity",(t=>h(t.target)?t.children?.6:.4:0)).attrTween("d",(t=>()=>n(t.current))),d.filter((function(t){return+this.getAttribute("fill-opacity")||f(t.target)})).transition(a).attr("fill-opacity",(t=>+f(t.target))).attrTween("transform",(t=>()=>x(t.current)))}function h(t){return t.y1<=3&&t.y0>=1&&t.x1>t.x0}function f(t){return t.y1<=3&&t.y0>=1&&(t.y1-t.y0)*(t.x1-t.x0)>.03}function x(t){var e=(t.x0+t.x1)/2*180/Math.PI;return`rotate(${e-90}) translate(${(t.y0+t.y1)/2*r},0) rotate(${e<180?0:180})`}return l.node()}));