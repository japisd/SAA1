function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var myRegExp = /Valve|Untitled|Super Secret Project|\=|undefined|Dota 2 Test/;
function regexpfilter(regex,stri){
	if (regex.test(stri) === true || stri === undefined) {return " / "}
	else {return stri}
} 

function getCookieValue(name) {
	var value = document.cookie;
	var cookieStartsAt = value.indexOf(" " + name + "=");
	if (cookieStartsAt == -1) {
	cookieStartsAt = value.indexOf(name + "=");
	}
	if (cookieStartsAt == -1) {
	value = null;
	} else {
		cookieStartsAt = value.indexOf("=", cookieStartsAt) + 1;
		var cookieEndsAt = value.indexOf(";", cookieStartsAt);
		if (cookieEndsAt == -1) {
		cookieEndsAt = value.length;
		}
			value = unescape(value.substring(cookieStartsAt,
			cookieEndsAt));
		}
return value;
}




var removeunder = function(stri){
	return stri.replace(/[_-]/g, " ");
}
	var video1="";
		video1 += "<iframe id=\"player\" type=\"text\/html\" width=\"640\" height=\"390\"";
		video1 += "  src=\"http:\/\/www.youtube.com\/embed\/";

		var video2="";
		video2 += "?enablejsapi=1&origin=http:\/\/example.com\"";
		video2 += "  frameborder=\"0\"><\/iframe>";
var videourl = []

userobject = {};


console.log(getCookieValue("steamid"));
$(document).ready(function(){
	if (getCookieValue("steamid") != undefined){
		$('.steamIDnumber').val((getCookieValue("steamid")))
	};
	var userobject = {};
	$('.boton2').css("display","none");
	
	$('.boton').click(function(){
		userobject.userSteamIDnumber = ($('.steamIDnumber').val());
		$("form").html("");
		$(".lead").html("");
		$("#belowboxtext").html("");
		$(".btn").css("float","right");
		$(".btn").css("display","none");
		$(".boton1").css("display","inline-block");
		$('.boton2').css("display","inline-block");
		$('.boton4').css("display","inline-block");
			
		$.ajax({
			type: 'GET',
			dataType: 'json',
			data: {},
			url: "/steam/game/"+userobject.userSteamIDnumber+"/gamelist",
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				$('#belowboxtext').html("Please try again, inserting a valid Steam ID(with public privacy setting). ");
				 setTimeout(function(){
					window.location='index.html';
						}, 4000);
				
			},
			success: function (msg) {
				try {userobject.gamelist = msg;
				userobject.numberofgames = msg.response.games.length;
				userobject.randomgameindex = getRandomInt(0,userobject.numberofgames);
				userobject.appid = msg.response.games[userobject.randomgameindex].appid;
				document.cookie =("steamid="+userobject.userSteamIDnumber+";expires=Tue, 28 Dec 2020 00:00:00 GMT; ");
		
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: "/steam/game/"+userobject.appid+"/achievements",
					error: function (jqXHR, textStatus, errorThrown) {
						console.log(jqXHR);
						
					},
					success: function (msg) {				
						try {
							
							userobject.randomgamename = msg.game.gameName;
							if (userobject.randomgamename != undefined && ! myRegExp.test(userobject.randomgamename)) {
								$('.lead').html("<p></p>");
							
							}
						} catch(exception){
							console.log(exception.message);
							userobject.randomgamename = undefined;
						}				
				
						if (userobject.randomgamename === undefined || userobject.randomgamename === ""){
							$.ajax({
								type: 'GET',
								dataType: 'json',
								data: {},
								url: "/steam/game/AppList/"+userobject.appid,
								error: function (jqXHR, textStatus, errorThrown) {
									console.log(jqXHR);
									
								},
								success: function (msg1) {
											if (msg1.name != undefined && ! myRegExp.test(msg1.name)){
												userobject.randomgamename = msg1.name;
												$('.lead').html("<p></p>");
											}
								}
			
							});
						};
					}
					
				 
				});
				console.log(userobject.gamelist);	
				var backgroundimageurl = "url('https://steamcdn-a.akamaihd.net/steam/apps/" + userobject.appid + "/page_bg_generated_v6b.jpg')";
				$(".wrapper-top10").css("background-image",backgroundimageurl);
				$(".wrapper-top10").css("transition","background-image 0.9s ease-in-out");
				$('.boton4').attr("href","steam://run/" + userobject.appid);
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: '/steam/game/' + userobject.appid + '/' + userobject.userSteamIDnumber + '/achievements',
					error: function (jqXHR, textStatus, errorThrown) {
									console.log(jqXHR);
					},
					success: function(msg){
						try{
						userobject.achievements = msg.playerstats.achievements;
						userobject.randomachievementindex = getRandomInt(0,userobject.achievements.length);
						while (userobject.achievements[userobject.randomachievementindex].achieved === 1){
							userobject.randomachievementindex = getRandomInt(0,userobject.achievements.length);
						}
						userobject.achievement = msg.playerstats.achievements[userobject.randomachievementindex];
						
						}catch(exception){
							console.log(exception.message)
						}
						
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
						url: '/steam/game/' + userobject.appid + '/achievements',
						error: function (jqXHR, textStatus, errorThrown) {
										console.log(jqXHR,"this");
						},
						success: function(msg){
							try{
							for (index in msg.game.availableGameStats.achievements){
								var achievements = msg.game.availableGameStats.achievements[index];
								if (userobject.achievement.apiname === achievements.name) {
									if (achievements.description != undefined){
								$('#currentAchievement').html(achievements.displayName + "<br/>" + achievements.description + "</br>" + '<img id=currentAchievements" src=' + achievements.icon + ">" );
								
								$('#currentAchievement').css("justify-content","center");
								
								userobject.ramdomachievement = achievements;
									} else {
										$('#currentAchievement').html(achievements.displayName + "<br/>" + "</br>" + '<img class="currentAchievements" src=' + achievements.icon + ">" );
										
									userobject.ramdomachievement = achievements;
									}
								
								}
							}
							
							if (achievements.description != undefined){
								
								// YOUTUBE SEARCH
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/'+regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename),
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
										console.log('youtube/'+regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename))
										console.log(regexpfilter(myRegExp,removeunder(userobject.achievement.apiname)),regexpfilter(myRegExp,userobject.randomgamename))
										console.log('errorz');
										console.log(userobject.randomgamename)
						},
					success: function(msg){
						console.log("api",regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename));
						console.log("msg= " + JSON.stringify(msg));
						console.log("inputs: apiname =" +userobject.achievement.apiname + " " + userobject.randomgamename  )
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl.push(msg.items[i].id.videoId)
							
							
							
							}
						}
						if (videourl.length > 0){
						$("#playerplace").html(video1 + videourl[0] + video2);
						console.log(videourl.length,"#s of videourls")
						$('.boton3').css("display","inline-block");}
					}
					});
						} else {
							// YOUTUBE SEARCH
							console.log("achievement description is undefined");
							$("#playerplace").html('<div class="col-lg-6" id="playerplace">');
										$.ajax({
									type: 'GET',
									dataType: 'json',
									data: {},
								url: 'youtube/ /' + userobject.randomgamename,
								error: function (jqXHR, textStatus, errorThrown) {
													console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
													console.log('errorz');
									},
								success: function(msg){
									for (i=0;i<msg.items.length;i++){
										if (msg.items[i].id.kind === "youtube#video"){
										videourl.push(msg.items[i].id.videoId)
																					
										}
									}
									if (videourl.length > 0){
						$("#playerplace").html(video1 + videourl[0] + video2);
						console.log(videourl.length,"#s of videourls")
						$('.boton3').css("display","inline-block");}
								}
								});
							
							}
							
						} catch(exception) {console.log(exception.message + "location 412")}
						}
					})
						
					$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'steam/game/' + userobject.userSteamIDnumber + '/' + userobject.appid + '/ownedgames',
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
						},
					success: function(msg){
						userobject.gameimagelogourl = "http://media.steampowered.com/steamcommunity/public/images/apps/" + userobject.appid + "/" + msg.img_logo_url + '.jpg';
						$('#gamelogo').html('<img ' + 'title="' + regexpfilter(myRegExp,userobject.gameName) + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
											
						
						try{
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/'+userobject.achievement.apiname+'/ '+userobject.randomgamename,
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
										console.log('errorz1');
						},
					success: function(msg){
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl.push(msg.items[i].id.videoId)
							
							try{
							console.log(achievements.description);}catch(exception){console.log(exception.message)}
							}
						}
						if (videourl.length > 0){
						$("#playerplace").html(video1 + videourl[0] + video2);
						console.log(videourl.length,"#s of videourls")
						$('.boton3').css("display","inline-block");}
					}
					});
						}catch(exception) {
							console.log(exception.message);
							$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/' +userobject.randomgamename+'/ /',
					error: function (jqXHR, textStatus, errorThrown) {
										
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid );
										console.log("error at the video link generation");
										$("boton2").click();
						},
					success: function(msg){
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl.push(msg.items[i].id.videoId)
							
						
							}
						}
						console.log(userobject.gameName + "before")
						$('#gamelogo').html('<img ' + 'title="' + regexpfilter(myRegExp,userobject.gameName) + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame').html('<img ' + 'title="' + regexpfilter(myRegExp,userobject.randomgamename) + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame img').css("marginLeft","0");
						$('#currentGame img').css("width","100%");
						console.log("we got here" + userobject.gameName + userobject.randomgamename + userobject.appid + videourl)
						$('#gamelogo').html('<img ' + 'title="' + regexpfilter(myRegExp,userobject.randomgamename) + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						if (myRegExp.test(userobject.randomgamename)){
						$('boton2').click();}
						try{
						console.log(achievements.description);
						} catch(exception){ console.log(exception.message)}
						if (videourl.length > 0){
						$("#playerplace").html(video1 + videourl[0] + video2);
						console.log(videourl.length,"#s of videourls")
						$('.boton3').css("display","inline-block");}
					}
					}); 
							
						}	
						
						
						
					}
					})	
					}
						
				});
			} catch(exception){
			console.log(exception.message)
			$('#belowboxtext').html("Your Steam ID needs to allow public access of achievement data. Try again after allowing public access through steam.")
			setTimeout(function(){
					window.location='index.html';
						}, 4000);
			}}
				
		}
		
		);



		
		
	





	
	});	
	
	$('.boton1').click(function(){
		videoindex = 0
		videourl = []
		$('.boton3').val("Next Video")
		$("#playerplace").html('<div class="col-lg-6" id="playerplace">');
		$('.boton2').css("display","inline-block");
		$("#currentAchievement").html('<p id="currentAchievement"></p>');
		$("#gamelogo").html('');
		var tempid = userobject.userSteamIDnumber;
		userobject= {};
		userobject.userSteamIDnumber = tempid;
		$("form").html("");
		$(".lead").html("");
		$("#belowboxtext").html("");
		$(".btn").css("float","right");
		$(".btn").css("display","none");
		$(".boton1").css("display","inline-block");
		try{
		
		
		$("boton2").css("display","inline-block");
			
		$.ajax({
			type: 'GET',
			dataType: 'json',
			data: {},
			url: "/steam/game/"+userobject.userSteamIDnumber+"/gamelist",
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				
			},
			success: function (msg) {		
				userobject.gamelist = msg;
				userobject.numberofgames = msg.response.games.length;
				userobject.randomgameindex = getRandomInt(0,userobject.numberofgames);
				try{
				userobject.appid = msg.response.games[userobject.randomgameindex].appid;
				}catch(exception){
					$('boton1').click();
					console.log(exception.message);
				}
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: "/steam/game/"+userobject.appid+"/achievements",
					error: function (jqXHR, textStatus, errorThrown) {
						console.log(jqXHR);
						
					},
					success: function (msg) {				
						try {
							
							userobject.randomgamename = msg.game.gameName;
							if (userobject.randomgamename != undefined && ! myRegExp.test(userobject.randomgamename)) {
								$('.lead').html("<p></p>");
							
							}
						} catch(exception){
							console.log(exception.message);
							userobject.randomgamename = undefined;
						}				
				
						if (userobject.randomgamename === undefined || userobject.randomgamename === ""){
							$.ajax({
								type: 'GET',
								dataType: 'json',
								data: {},
								url: "/steam/game/AppList/"+userobject.appid,
								error: function (jqXHR, textStatus, errorThrown) {
									console.log(jqXHR);
									
								},
								success: function (msg1) {
											if (msg1.name != undefined && ! myRegExp.test(msg1.name)){
												userobject.randomgamename = msg1.name;
												$('.lead').html("<p></p>");
											}
								}
			
							});
						};
					}
						
						
				});
				var backgroundimageurl = "url('https://steamcdn-a.akamaihd.net/steam/apps/" + userobject.appid + "/page_bg_generated_v6b.jpg')";
				$(".wrapper-top10").css("background-image",backgroundimageurl);
				$(".wrapper-top10").css("transition","background-image 0.9s ease-in-out");
				$('.boton4').attr("href","steam://run/" + userobject.appid);
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: '/steam/game/' + userobject.appid + '/' + userobject.userSteamIDnumber + '/achievements',
					error: function (jqXHR, textStatus, errorThrown) {
									console.log('loca');
					},
					success: function(msg){
						try{
						userobject.achievements = msg.playerstats.achievements;
						userobject.randomachievementindex = getRandomInt(0,userobject.achievements.length);
						while (userobject.achievements[userobject.randomachievementindex].achieved === 1){
							userobject.randomachievementindex = getRandomInt(0,userobject.achievements.length);
						}
						userobject.achievement = msg.playerstats.achievements[userobject.randomachievementindex];
						
						}catch(exception){
							console.log(exception.message);
							userobject.gamehasnoachievements = true;
						}
						
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
						url: '/steam/game/' + userobject.appid + '/achievements',
						error: function (jqXHR, textStatus, errorThrown) {
										console.log(jqXHR,"this");
						},
						success: function(msg){
							try {
							for (index in msg.game.availableGameStats.achievements){
								var achievements = msg.game.availableGameStats.achievements[index];
								if (userobject.achievement.apiname === achievements.name) {
									if (achievements.description != undefined){
								$('#currentAchievement').html(achievements.displayName + "<br/>" + achievements.description + "</br>" + '<img id=currentAchievements" src=' + achievements.icon + ">" );
								
								$('#currentAchievement').css("justify-content","center");
								
								userobject.ramdomachievement = achievements;
									} else {
										$('#currentAchievement').html(achievements.displayName + "<br/>" + "</br>" + '<img class="currentAchievements" src=' + achievements.icon + ">" );
										
									userobject.ramdomachievement = achievements;
									}
								
								}
							}
							
							if (achievements.description != undefined){
								
								// YOUTUBE SEARCH
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/'+regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename),
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
										console.log('youtube/'+regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename))
										console.log(regexpfilter(myRegExp,removeunder(userobject.achievement.apiname)),regexpfilter(myRegExp,userobject.randomgamename))
										console.log('errorz');
										console.log(userobject.randomgamename)
						},
					success: function(msg){
						//console.log("api",regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename));
						//console.log("msg= " + JSON.stringify(msg));
						//console.log("inputs: apiname =" +userobject.achievement.apiname + " " + userobject.randomgamename  )
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl.push(msg.items[i].id.videoId)
							
							
							
							}
						}
						if (videourl.length > 0){
						$("#playerplace").html(video1 + videourl[0] + video2);
						console.log(videourl.length,"#s of videourls")
						$('.boton3').css("display","inline-block");}
						;
					}
					});
						} else {
							// YOUTUBE SEARCH
							console.log("achievement description is undefined");
							$("#playerplace").html('<div class="col-lg-6" id="playerplace">');
										$.ajax({
									type: 'GET',
									dataType: 'json',
									data: {},
								url: 'youtube/ /' + userobject.randomgamename,
								error: function (jqXHR, textStatus, errorThrown) {
													console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
													console.log('errorz');
									},
								success: function(msg){
									for (i=0;i<msg.items.length;i++){
										if (msg.items[i].id.kind === "youtube#video"){
										videourl.push(msg.items[i].id.videoId)
										
										
										
										}
									}
									if (videourl.length > 0){
									$("#playerplace").html(video1 + videourl[0] + video2);
									console.log(videourl.length,"#s of videourls");
									$('.boton3').css("display","inline-block")}
									
								}
								});
							
							}
							
						} catch(exception) {console.log(exception.message + "location 412")}
						}
					})
					$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'steam/game/' + userobject.userSteamIDnumber + '/' + userobject.appid + '/ownedgames',
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
						},
					success: function(msg){
						userobject.gameimagelogourl = "http://media.steampowered.com/steamcommunity/public/images/apps/" + userobject.appid + "/" + msg.img_logo_url + '.jpg';
						$('#gamelogo').html('<img ' + 'title="' + regexpfilter(myRegExp,userobject.gameName) + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame').html('<img ' + 'title="' + regexpfilter(myRegExp,userobject.randomgamename) + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame img').css("marginLeft","0");
						$('#currentGame img').css("width","100%");
						$('#gamelogo').html('<img ' + 'title="' + regexpfilter(myRegExp,userobject.randomgamename)+ '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						if (myRegExp.test(userobject.randomgamename)){
							$('boton2').click();
						}
						try{
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/'+removeunder(userobject.achievement.apiname)+'/ '+userobject.randomgamename,
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
										console.log('errorz1');
						},
					success: function(msg){
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl.push(msg.items[i].id.videoId)
							
							
							}
						}
						if (videourl.length > 0){
						$("#playerplace").html(video1 + videourl[0] + video2);
						console.log(videourl.length,"#s of videourls")
						$('.boton3').css("display","inline-block");}
					}
					});
						}catch(exception) {
							if (myRegExp.test(userobject.randomgamename)){
								userobject.randomgamename = "videogame achievements"
							}
							console.log(exception);
							$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/' +userobject.randomgamename+'/ /',
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid );
										console.log("error at the video link generation");
										$("boton2").click();
						},
					success: function(msg){
						console.log(msg);
						console.log(userobject.randomgamename," AppID:",userobject.appid)
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl.push(msg.items[i].id.videoId)
							
								
							}
						}
						if (videourl.length > 0){
						$("#playerplace").html(video1 + videourl[0] + video2);
						console.log(videourl.length,"#s of videourls")
						$('.boton3').css("display","inline-block");}
					}
					}); 
							
						}	
						
						
					}
					})	
					}
						
				});
			}
	}); }catch(exception){
		console.log(exception.message);
	}	
	if (videourl.length == 0){
		$('.boton3').css("display","none");
	}
	});
	
	$('.boton2').click(function(){
		$("#playerplace" ).toggleClass("hide");
	})
	$('#contact-submit').click(function(){
		window.location.href= "index2.html";
		alert("Thanks for your submission.")
		
	});
	var videoindex = 0
	$('.boton3').click(function(){
		
		videoindex = videoindex + 1;
		if (videoindex === (videourl.length)){videoindex = 0};
		$('.boton3').val(videoindex+1 + "/" + videourl.length)
		$("#playerplace").html(video1 + videourl[videoindex] + video2);
	});
});	
	
	