srcset="images/parasite.jpg 3x";var f=d3.format(".1f"),rect=d3.select("#mask").selectAll("rect").on("mouseover",handleMouseOver).on("mouseout",handleMouseOut);rect.transition().duration(2e3).delay((function(t,e){return 300*e})).style("opacity",0);var ellipse=d3.select("#mask").selectAll("ellipse").on("mouseover",handleMouseOver).on("mouseout",handleMouseOut);ellipse.transition().duration(2e3).delay((function(t,e){return 400*e})).style("opacity",0);var text=d3.select(".mask-poster").select("svg").append("text").attr("x",450).attr("y",590).attr("opacity",0).text("PARASITE").attr("font-family","parasite").attr("font-size",100);text.transition().duration(2e3).delay(2500).style("opacity",1),d3.select("#path3751-5-4-1-9-6-3").transition().duration(1e3).delay(2e3).style("opacity",.5);var cx=+f(d3.select("#path3751-5-4-1-9-6-3").attr("cx")),cy=+f(d3.select("#path3751-5-4-1-9-6-3").attr("cy"));d3.select(".mask-poster").select("svg").append("text").attr("id","arrow").html("&darr;").style("opacity",0).attr("x",cx-12).attr("y",cy+10).transition().duration(1e3).delay(2e3).attr("font-weight",40).attr("font-size",30).style("opacity",1);var title1=d3.select("#title-1"),title2=d3.select("#title-2"),title3=d3.select("#tittle-3"),title4=d3.select("#title-4"),x_t2=(cx=+f(title1.attr("cx")),cy=+f(title1.attr("cy")),+f(title2.attr("x"))),y_t2=+f(title2.attr("y")),width_t2=+f(title2.attr("width")),height_t2=+f(title2.attr("height")),x_t3=+f(title3.attr("x")),y_t3=+f(title3.attr("y")),width_t3=+f(title3.attr("width")),height_t3=+f(title3.attr("height")),cx_t2=+f(title4.attr("cx")),cy_t2=+f(title4.attr("cy"));function handleMouseOver(){d3.select(this).style("fill","white").style("opacity",.5),"title-1"==d3.select(this).attr("id")?d3.select("#text-title-1").style("opacity",1):"title-2"==d3.select(this).attr("id")?d3.select("#text-title-2").style("opacity",1):"tittle-3"==d3.select(this).attr("id")?d3.select("#text-tittle-3").style("opacity",1):"title-4"==d3.select(this).attr("id")?d3.select("#text-title-4").style("opacity",1):"path3751-5-4-1-9-6-3"==d3.select(this).attr("id")&&d3.select("#arrow").transition().duration(500).attr("font-size",40)}function handleMouseOut(){d3.select(this).transition().duration(200).style("opacity",0),d3.select("#text-"+d3.select(this).attr("id")).style("opacity",0),"path3751-5-4-1-9-6-3"==d3.select(this).attr("id")&&d3.select("#arrow").transition().duration(500).style("opacity",0).remove()}d3.select(".mask-poster").select("svg").append("text").attr("id","text-title-1").attr("x",cx-15).attr("y",cy+10).text("A").attr("font-family","argentum").attr("fill","white").attr("font-weight",20).attr("font-size",12).style("opacity",0),d3.select(".mask-poster").select("svg").append("text").attr("id","text-title-2").attr("x",x_t2+width_t2/2-25).attr("y",y_t2+height_t2/2).text("Film by").attr("font-family","argentum").attr("fill","white").attr("font-size",12).style("opacity",0),d3.select(".mask-poster").select("svg").append("text").attr("id","text-tittle-3").attr("x",x_t3+width_t3/2-100).attr("y",y_t3+height_t3/2).text("Bong Joon-Ho").attr("font-family","argentum").attr("fill","white").attr("font-size",12).style("opacity",0),d3.select(".mask-poster").select("svg").append("text").attr("id","text-title-4").attr("x",cx_t2-35).attr("y",cy_t2+10).text("Trailer").attr("font-family","argentum").attr("fill","#595959").attr("font-size",12).attr("font-weight","900").style("opacity",0);