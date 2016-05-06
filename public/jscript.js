function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
currentAchievement = {};
currentGame = {};
currentTimer = {};
currentAchievement.name = "";
currentGame.name = "";
currentTimer.timeleft = "";
$(document).ready(function(){
	$('#currentAchievement').text("Achievement: "+currentAchievement.name);
	$('#currentGame').text("Game: "+currentGame.name);
	$('#currentTimer').text("Time left: "+ currentTimer.timeleft);
	
	 
	 $.ajax({
        type: 'GET',
        dataType: 'json',
        data: {},
        url: "/steam/game/292030/achievements",
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR);
			
        },
        success: function (msg) {
            console.log(msg);
        }
    });
	
$('.boton').click(function(){userSteamIDnumber = ($('.steamIDnumber').val());
		$('#currentAchievement').text("Achievement: "+currentAchievement.name);
	$('#currentGame').text("Game: "+currentGame.name);
	$('#currentTimer').text("Time left: "+ currentTimer.timeleft);
	$.ajax({
        type: 'GET',
        dataType: 'json',
        data: {},
        url: "/steam/game/"+userSteamIDnumber+"/gamelist",
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR);
			
        },
        success: function (msg) {
            console.log(msg);
			numberofgames = msg.response.games.length;
			
			var randomgameindex = getRandomInt(0,numberofgames);
			
			
			$.ajax({
				type: 'GET',
				dataType: 'json',
				data: {},
				url: "/steam/game/AppList",
				error: function (jqXHR, textStatus, errorThrown) {
					alert(jqXHR);
					
				},
				success: function (msg1) {
					console.log(msg1);
					
					for (index in msg1.applist.apps.app){
							if (msg1.applist.apps.app[index].appid === msg.response.games[randomgameindex].appid){
							$('#currentGame').text("Game: "+msg1.applist.apps.app[index].name)
							randomgame = {};
							randomgame.appid =  msg1.applist.apps.app[index].appid;
							randomgame.gamename = msg1.applist.apps.app[index].name;
							
						};
					};
					
					
									$.ajax({
											type: 'GET',	
											dataType: 'json',
											data: {},
											url: "/steam/game/"+randomgame.appid+"/achievements",
											error: function (jqXHR, textStatus, errorThrown) {
												alert(jqXHR);
												
											},
											success: function (msg2) {
												console.log(msg2);
												
												var numberofachievements = msg2.game.availableGameStats.achievements.length;
												var randomachievementindex = getRandomInt(0,numberofachievements);
												
														$.ajax({
															type: 'GET',
															dataType: 'json',
															data: {},
															url: "/steam/game/" + randomgame.appid + "/" + userSteamIDnumber + "/achievements",
															error: function (jqXHR, textStatus, errorThrown) {
																alert(jqXHR);
																
															},
															success: function (msg3) {
																console.log(msg3);
																for (index in msg3) {
																	console.log(msg3.playerstats.achievements[index].apiname);
																	console.log('lol')
																	console.log(msg2.game.availableGameStats.achievements[randomachievementindex].displayName)
																	if (msg3.playerstats.achievements[index].apiname === msg2.game.availableGameStats.achievements[randomachievementindex].displayName && msg3.playerstats.achievements[index].achieved === 0){
																	$('#currentAchievement').text("Achievement: "+msg2.game.availableGameStats.achievements[randomachievementindex].displayName)};
															}}
														});
												
												
											}
										});
				
				}
			
			});
		}
})})})
			   
