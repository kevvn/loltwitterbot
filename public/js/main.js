// Parse app key initializer
//Parse.initialize("O8DRdrCH1swFcLmKGBY6T7SWEuZpzdblkqvi9Ucj", "DTPRIUqThzJpuFBzfhO78acdOSy22q2t5vCax7WH");

// League DEV api key 89fd5947-db70-4995-bcfe-46600a67628f
// Randy's api key 1809d909-de42-4eda-ae26-645323c35f5b

var cb = new Codebird;
cb.setConsumerKey("J0cWnnzh3xDEHbjGBmDwHEWz0", "jnYUwJPzCN0EcFl3GNPxYGj4EP4aTpAb2KTSYQBtOVQTK6Pa73");

cb.setToken("3799282892-wZqFwAYos6Yy9SRC786Bm9JowkFv9ToszAqIaiD", "MhgCPR6XQVPN7M3ATOYkLuhjWwkDkV54IlCXkZlmhIjqh");


var APIKEY = "1809d909-de42-4eda-ae26-645323c35f5b";
var matchIden = "";
var summonerIden = "";
var participantIden = 0;

var teamGold = [0,0];
var teamKills = [0,0];
var teamTowers = [];
var teamDragons = [];
var teamBarons = [];
var time;
var gameSec;
var gameHour;
var requestTeamIndex;


function getInput(){
 
    var input = $("#sName").val();
    console.log(input);
    summonerIdLookup(input);
}


// Function to get summoner id
function summonerIdLookup(summonername) {

    if (summonername !== "") {
        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonername + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {

                console.log(json);
                var nameNoSpace = summonername.replace(" ", "");
                var nameLower = nameNoSpace.toLowerCase().trim();
                summonerIden = json[nameLower].id;
                previousGameLookup();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
}


function previousGameLookup(){
    if (summonerIden !== "") {
        $.ajax({
            
            url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/' + summonerIden + '?beginIndex=0&endIndex=1&api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {                
                var matchIden = json.matches[0].matchId;
                getMatchData(matchIden);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
}

function getMatchData(matchIden){
    
    $.ajax({

        url: 'https://na.api.pvp.net/api/lol/na/v2.2/match/'+ matchIden +'?includeTimeline=false&api_key=' + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (json) {
            getParticipantId(json);
            getTotalData(json);
        
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}



function getParticipantId(teamJson){
    console.log(teamJson);
    for(var i = 0; i< 10; i++){
        var tempParticipant = teamJson.participantIdentities[i];
        if(tempParticipant.player.summonerId === summonerIden)
            participantIden = tempParticipant.participantId;
        
    }
}


// FORMAT @xxxxxxxxxxxxxxx Team NAMEOFCHARXXXXXX Gold: 101.5k-101.5k Kills: 55-55, Towers: 9-9, Drag: 5-5, Baron: 5-5 Time: 00:00

function getTotalData(teamJson){
    
    // Gets team 1
    for (var i = 0; i < 10; ++i) {

        // Gets the current Team member
        var tempParticipant = teamJson.participants[i];
        var tempTeamId = teamJson.participants[i].teamId;
        var index = (((tempTeamId)/100) - 1);
        

        teamKills[index] = teamKills[index] + tempParticipant.stats.kills;
        teamGold[index] = teamGold[index] + tempParticipant.stats.goldEarned;
        
        
        // To better deliver content in the right order
        if(tempParticipant.participantId === participantIden){
            requestTeamIndex = (((tempParticipant.teamId)/100)-1);
        }
        
    }
    
    //Getting total team data
    for(var i = 0; i < 2; i++){
        var tempTeam = teamJson.teams[i];
        var tempTeamId = tempTeam.teamId;
        var index = (((tempTeamId)/100) - 1);
        teamBarons[index] = tempTeam.baronKills;
        teamDragons[index] = tempTeam.dragonKills;
        teamTowers[index] = tempTeam.towerKills;
    }
    
    gameSec = ((teamJson.matchDuration) % 60);
    gimeMin =((teamJson.matchDuration)/60);
    
    
    console.log(teamGold);
    console.log(teamKills);
    console.log(teamTowers);
    console.log(teamDragons);
    console.log(teamBarons);

}

function tweet(){
    

    cb.__call("statuses_update",{
        "status": "Whohoo, I just tweeted!"},
    function (reply) {
        // ...
    });
}


