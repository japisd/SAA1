function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var myRegExp = /Valve|Untitled|Super Secret Project|\=/;
function regexpfilter(regex,stri){
	if (regex.test(stri) === true) {return " / "}
	else {return stri}
} 
console.log(regexpfilter(myRegExp,"Valve"))
var removeunder = function(stri){
	return stri.replace(/[_-]/g, " ");
}
var teststring = "que_loco"
console.log(removeunder(teststring));

userobject = {};

$(document).ready(function(){
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
			
		$.ajax({
			type: 'GET',
			dataType: 'json',
			data: {},
			url: "/steam/game/"+userobject.userSteamIDnumber+"/gamelist",
			error: function (jqXHR, textStatus, errorThrown) {
				alert(jqXHR);
				
			},
			success: function (msg) {		
				userobject.gamelist = msg;
				userobject.numberofgames = msg.response.games.length;
				userobject.randomgameindex = getRandomInt(0,userobject.numberofgames);
				userobject.appid = msg.response.games[userobject.randomgameindex].appid;
				
		
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: "/steam/game/"+userobject.appid+"/achievements",
					error: function (jqXHR, textStatus, errorThrown) {
						alert(jqXHR);
						
					},
					success: function (msg) {				
						try {
							var myRegExp = /Valve|Untitled/;
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
									alert(jqXHR);
									
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
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: '/steam/game/' + userobject.appid + '/' + userobject.userSteamIDnumber + '/achievements',
					error: function (jqXHR, textStatus, errorThrown) {
									alert(jqXHR);
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
										alert(jqXHR,"this");
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
							console.log("right before youtubesearch");
							if (achievements.description != undefined){
								console.log("achievement description is not undefined");
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
										alert('errorz');
										console.log(userobject.randomgamename)
						},
					success: function(msg){
						console.log("api",regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename));
						console.log("msg= " + JSON.stringify(msg));
						console.log("inputs: apiname =" +userobject.achievement.apiname + " " + userobject.randomgamename  )
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl = msg.items[i].id.videoId
							console.log(videourl);
							$("#playerplace").html(video1 + videourl + video2);
							
							}
						}
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
													alert('errorz');
									},
								success: function(msg){
									for (i=0;i<msg.items.length;i++){
										if (msg.items[i].id.kind === "youtube#video"){
										videourl = msg.items[i].id.videoId
										console.log(videourl);
										$("#playerplace").html(video1 + videourl + video2);
										
										}
									}
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
						$('#gamelogo').html('<img ' + 'title="' + userobject.gameName + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
											
						
						try{
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/'+userobject.achievement.apiname+'/ '+userobject.randomgamename,
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
										alert('errorz1');
						},
					success: function(msg){
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl = msg.items[i].id.videoId
							$("#playerplace").html(video1 + videourl + video2);
							alert(achievements.description);
							}
						}
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
							videourl = msg.items[i].id.videoId
							$("#playerplace").html(video1 + videourl + video2);
						console.log(userobject.gameName + "before")
						$('#gamelogo').html('<img ' + 'title="' + userobject.gameName + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame').html('<img ' + 'title="' + userobject.randomgamename + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame img').css("marginLeft","0");
						$('#currentGame img').css("width","100%");
						console.log("we got here" + userobject.gameName + userobject.randomgamename + userobject.appid + videourl)
						$('#gamelogo').html('<img ' + 'title="' + userobject.randomgamename + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						if (myRegExp.test(userobject.randomgamename)){
						$('boton2').click;}
						try{
						alert(achievements.description);
						} catch(exception){ console.log(exception.message)}
							}
						}
					}
					}); 
							
						}	
						
						
						
					}
					})	
					}
						
				});
			}
		});


			var video1="";
		video1 += "<iframe id=\"player\" type=\"text\/html\" width=\"640\" height=\"390\"";
		video1 += "  src=\"http:\/\/www.youtube.com\/embed\/";

		var video2="";
		video2 += "?enablejsapi=1&origin=http:\/\/example.com\"";
		video2 += "  frameborder=\"0\"><\/iframe>";
		var videourl="1"
		
		
	





	
	});	
	
	$('.boton1').click(function(){
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
		
			var video1="";
		video1 += "<iframe id=\"player\" type=\"text\/html\" width=\"640\" height=\"390\"";
		video1 += "  src=\"http:\/\/www.youtube.com\/embed\/";

		var video2="";
		video2 += "?enablejsapi=1&origin=http:\/\/example.com\"";
		video2 += "  frameborder=\"0\"><\/iframe>";
		var videourl=""
		$("boton2").css("display","inline-block");
			
		$.ajax({
			type: 'GET',
			dataType: 'json',
			data: {},
			url: "/steam/game/"+userobject.userSteamIDnumber+"/gamelist",
			error: function (jqXHR, textStatus, errorThrown) {
				alert(jqXHR);
				
			},
			success: function (msg) {		
				userobject.gamelist = msg;
				userobject.numberofgames = msg.response.games.length;
				userobject.randomgameindex = getRandomInt(0,userobject.numberofgames);
				userobject.appid = msg.response.games[userobject.randomgameindex].appid;
				
		
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: "/steam/game/"+userobject.appid+"/achievements",
					error: function (jqXHR, textStatus, errorThrown) {
						alert(jqXHR);
						
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
									alert(jqXHR);
									
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
				$.ajax({
					type: 'GET',
					dataType: 'json',
					data: {},
					url: '/steam/game/' + userobject.appid + '/' + userobject.userSteamIDnumber + '/achievements',
					error: function (jqXHR, textStatus, errorThrown) {
									alert('loca');
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
										alert(jqXHR,"this");
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
							console.log("right before youtubesearch");
							if (achievements.description != undefined){
								console.log("achievement description is not undefined");
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
										alert('errorz');
										console.log(userobject.randomgamename)
						},
					success: function(msg){
						console.log("api",regexpfilter(myRegExp,removeunder(userobject.achievement.apiname))+'/ '+regexpfilter(myRegExp,userobject.randomgamename));
						console.log("msg= " + JSON.stringify(msg));
						console.log("inputs: apiname =" +userobject.achievement.apiname + " " + userobject.randomgamename  )
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl = msg.items[i].id.videoId
							console.log(videourl);
							$("#playerplace").html(video1 + videourl + video2);
							
							}
						}
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
													alert('errorz');
									},
								success: function(msg){
									for (i=0;i<msg.items.length;i++){
										if (msg.items[i].id.kind === "youtube#video"){
										videourl = msg.items[i].id.videoId
										console.log(videourl);
										$("#playerplace").html(video1 + videourl + video2);
										
										}
									}
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
						$('#gamelogo').html('<img ' + 'title="' + userobject.gameName + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame').html('<img ' + 'title="' + userobject.randomgamename + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						$('#currentGame img').css("marginLeft","0");
						$('#currentGame img').css("width","100%");
						$('#gamelogo').html('<img ' + 'title="' + userobject.randomgamename + '"' + 'id="gamelogo" src=' + userobject.gameimagelogourl + ">" );
						if (myRegExp.test(userobject.randomgamename)){
							$('boton2').click;
						}
						try{
						$.ajax({
						type: 'GET',
						dataType: 'json',
						data: {},
					url: 'youtube/'+removeunder(userobject.achievement.apiname)+'/ '+userobject.randomgamename,
					error: function (jqXHR, textStatus, errorThrown) {
										console.log(userobject.userSteamIDnumber + ' ' + userobject.appid )
										alert('errorz1');
						},
					success: function(msg){
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl = msg.items[i].id.videoId
							$("#playerplace").html(video1 + videourl + video2);
							
							}
						}
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
						console.log(userobject.randomgamename)
						for (i=0;i<msg.items.length;i++){
							if (msg.items[i].id.kind === "youtube#video"){
							videourl = msg.items[i].id.videoId
							$("#playerplace").html(video1 + videourl + video2);
							
							}
						}
					}
					}); 
							
						}	
						
						
					}
					})	
					}
						
				});
			}
		});	
	
	});
		
	$('.boton2').click(function(){
		$("#playerplace" ).toggleClass("hide");
	})	
});	
	
	