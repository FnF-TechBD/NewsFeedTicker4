/*!
 * jquery.smartmarquee
 * 
 * Copyright 2014 stemizer.net ~ nestisamet<a>gmail<d>com
 * Licensed under the MIT license
 * http://opensource.org/licenses/mit
 * 
 * @author Samet TEMIZER
 * @version 1.0
 */


$(document).ready(function() {
	
	
    
	$("#mySelect").change(function fnfchangewidthFunction() {

		var x = document.getElementById("mySelect").value;
		$( ".fnfexample" ).animate({
			
			width: x,
			height:x, 
			 }, 1500 );
		
		$( ".container li" ).animate({
				width: x-15, 
				 }, 1500 );	
				 

		

		});

	
 /** STyle the Button */
  
	  $( "#bt1" ).click(function() {
		$( ".fnfexample" ).animate({
		 width: "300px",
		 height: "300px",    
		  }, 1500 );
		  $( ".container li" ).animate({
			width: "285px",    
			 }, 1500 );
	  });

	function dateFormat(pubDate) {
		var date = new Date(pubDate);
		var months = Array("January", "February", "March", "Abril", "May", "June", "July", "Agust", "September", "Octobar", "November","December");
		return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
	  }
	
	
	//feed to parse
	var feed = "https://cors-anywhere.herokuapp.com/http://www.dailyjanakantha.com/rss.php";
	
	$.ajax(feed, {
		accepts:{
			xml:"application/rss+xml"
		},
		dataType:"xml",
		success:function(data) {
			//Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript
			//'+'<a href="' + el.find('link').text()+'">'+ + '</a>
			var newsarray=[];
			$(data).find("item").each(function () { // or "item" or whatever suits your feed
				var el = $(this);
			 
				newsarray.push('<li><a class="fnfnewstitle">'+el.find('title').text()+'</a><br><a><span>'+dateFormat(el.find("pubDate").text())+el.find("description").text()+'</span></a><a class="vanity" href="'+el.find("link").text()+'">Read more</a></li>');
		 
	
				console.log("------------------------");
				console.log("Publication Date:" + el.find("pubDate").text());
				console.log("title      : " + el.find("title").text());
				console.log("link       : " + el.find("link").text());
				console.log("description: " + el.find("description").text());
			});
			document.getElementById("news").innerHTML = newsarray;
	
	
		}	
	});
	
	});
	
	$(document).ready(function () {
		$("div").fnfsmartmarquee();
	});	


$.fn.fnfsmartmarquee = function(vars) {
	var defaults = {
	    duration: 1000,      // animate duration
	    loop : true,         
	    interval : 2000,     // interval duration
	    axis : "vertical", 
	    easing : "linear"    // (next ver)
	};
	var options = $.extend(defaults, vars);
	function marquee(obj) {
	    var self = this;
	    var timer, indexHandle, marginHandle;
	    var container = $(".container",obj);
	    obj.hover(
			function() { self.stop(); },
			function() { self.play(indexHandle,marginHandle);}
	    );
	    this.play = function(i,margin)
		{
			if (!i) i = 0;
			var _vertical = function() {
				if (i < container.children().length-1) {
					var len = container.children().eq(i).height(); // .outerHeight(true)
					len += (container.children().eq(i).outerHeight(true)-len)/2;
					if (!margin) {
						margin = parseInt(container.css("margin-top")) - len;
						marginHandle = margin;
					}
					container.animate({"margin-top":margin+"px"}, options.duration, "linear", function() {
						timer = setTimeout(function() {
							self.play(++i);
						},options.interval);
					});
					indexHandle = i;
				}
				else if (options.loop) {
					container.animate({"margin-top":"0px"}, "linear", function() {
						setTimeout(function() { self.play(0); },options.interval);
					});
				}
			};
			var _horizontal = function() {
				if (i < container.children().length-1) {
					var len = container.children().eq(i).outerWidth(true);
					if (!margin) {
						margin = container.css("margin-left").split("px")[0] - len;
						marginHandle = margin;
					}
					container.animate({"margin-left":margin+"px"}, options.duration, "linear", function() {
						timer = setTimeout(function() {
							self.play(++i);
						},options.interval);
					});
					indexHandle = i;
				}
				else if (options.loop) {
					container.animate({"margin-left":"0px"}, "linear", function() {
						setTimeout(function() { self.play(0); },options.interval);
					});
				}
			};
			(options.axis == "vertical") ? _vertical() : _horizontal();
	    };
	    this.stop = function() {
			clearTimeout(timer);
			if (container.is(":animated")) container.stop();
	    };
	};
	return this.each(function() {
		var slide = new marquee($(this));
		setTimeout(function() { slide.play(); }, options.interval);
	});
};
