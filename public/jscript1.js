function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

userobject = {};

$(document).ready(function(){
	$('#currentAchievement').text("Achievement: " + "");
	$('#currentGame').text("Game: " + "");
	$('#currentTimer').text("Time left: " + "");
	
	
	$('.boton').click(function(){
		userobject = {};
		userobject.userSteamIDnumber = ($('.steamIDnumber').val());
		$('#currentAchievement').text("Achievement: " + "");
		$('#currentGame').text("Game: " + "");
		$('#currentTimer').text("Time left: " + "");
		console.log('quepasa');
		
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
							var myRegExp = /Valve/;
							userobject.randomgamename = msg.game.gameName;
							if (userobject.randomgamename != undefined && ! myRegExp.test(userobject.randomgamename)) {
								$('#currentGame').text("Game: "+userobject.randomgamename);
							
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
												$('#currentGame').text("Game: "+msg1.name)
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
							for (index in msg.game.availableGameStats.achievements){
								var achievements = msg.game.availableGameStats.achievements[index];
								if (userobject.achievement.apiname === achievements.name) {
									if (achievements.description != undefined){
								$('#currentAchievement').html("Achievement: "+achievements.displayName + "<br/>" + achievements.description + "</br>" + '<img id=currentAchievements" src=' + achievements.icon + ">" );
								$('#currentAchievement img').css("marginLeft","45%");
								$('#currentAchievement').css("justify-content","center");
								
								userobject.ramdomachievement = achievements;
									} else {
										$('#currentAchievement').html("Achievement: "+achievements.displayName + "<br/>" + "</br>" + '<img class="currentAchievements" src=' + achievements.icon + ">" );
										$('#currentAchievement img').css("marginLeft","45%");
									userobject.ramdomachievement = achievements;
									}
								console.log('userobject = ',JSON.stringify(userobject));
								}
							}
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
					}
					})	
					}
						
				});
			}
		});	
	});	
});	
	
	