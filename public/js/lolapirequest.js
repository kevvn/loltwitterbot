// Parse app key initializer
//Parse.initialize("O8DRdrCH1swFcLmKGBY6T7SWEuZpzdblkqvi9Ucj", "DTPRIUqThzJpuFBzfhO78acdOSy22q2t5vCax7WH");

// League DEV api key 89fd5947-db70-4995-bcfe-46600a67628f
// Randy's api key 1809d909-de42-4eda-ae26-645323c35f5b
var APIKEY = "1809d909-de42-4eda-ae26-645323c35f5b";
var matchId = "";
var SUMMONER_NAME = "";
var summonerID = "";

var i = 0;
var j = 0;
var k = 0;


function matchLookUp() {

    //Static matchID
    //matchId = 1955047813;
    matchId = $("matchId").val();
    //User input a starting matchID

    var dataSets = {};
    var dataPoints = {};
    var allChamps = [];
    var allTeams = [];
    var spell = [];
    var tempTeamChamp = [];
    var tempTeamChampId = [];
    var tempAllTeamChamps = [];
    var teamId = 0;

    function matchData(matchID, teamOne, teamTwo, result) {
        this.matchID = matchID;
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
        this.result = result;
    }

    function teamData(allChamps, teamWin, teamId) {

        this.team = allChamps;
        this.teamWin = teamWin;
        this.teamId = teamId;
    }

    function champion(champ, masteryAll, runeAll, spells) {
        this.champ = champ;
        this.masteryAll = masteryAll;
        this.runeAll = runeAll;
        this.spells = spells;

    }

    function spells(spellOne, spellTwo) {
        this.spellOne = spellOne;
        this.spellTwo = spellTwo;
    }

    function mastery(mastRank, mastIden) {
        this.mastIden = mastIden;
        this.mastRank = mastRank;

    }

    function rune(runeRank, runeIden) {
        this.runeIden = runeIden;
        this.runeRank = runeRank;
    }

    if (matchID !== null) {
        $.ajax({
            // Example matchID 1955047813
            url: 'https://na.api.pvp.net/api/lol/na/v2.2/match/' + matchId + '?includeTimeline=false&api_key=' + APIKEY,
            type: 'GET',
            data: {

            },
            dataType: 'json',
            success: function (data) {

                //Loop through team one
                for (i = 0; i < 5; ++i) {
                    var masteryAll = [];
                    var runeAll = [];
                    k = 0;
                    // Gets the current Team member
                    var tempParticipant = data.participants[i];


                    // Goes through masteries and adds all to an array
                    while (tempParticipant.masteries[k]) {
                        var tempId = tempParticipant.masteries[k].masteryId;
                        var tempRank = tempParticipant.masteries[k].rank;
                        //Pushes each mastery object into the mastery array
                        var tempMast = new mastery(tempRank, tempId);
                        //console.log(tempId + " This is the mastery id on champ" +
                        masteryAll[k] = tempMast;
                        k++;
                    }
                    // Gets all the runes and adds it into an array
                    k = 0;

                    while (tempParticipant.runes[k]) {

                        //Pushes each rune object into the all runes array
                        var tempRuneId = tempParticipant.runes[k].runeId;
                        var tempRuneRank = tempParticipant.runes[k].rank;
                        var tempRune = new rune(tempRuneRank, tempRuneId);

                        runeAll[k] = tempRune;
                        k++;


                    }

                    //Stores champ Id
                    champID = tempParticipant.championId;

                    //Stores spells and sorts
                    spell[0] = tempParticipant.spell1Id;
                    spell[1] = tempParticipant.spell2Id;

                    spell.sort(function (a, b) {
                        return a - b;
                    });
                    var tempSpells = new spells(spell[0], spell[1]);

                    //Stores the team Id
                    teamId = tempParticipant.teamId;

                    var tempChamp = new champion(champID, masteryAll, runeAll, tempSpells);
                    tempTeamChamp[i] = tempChamp;
                    tempTeamChampId[i] = champID;
                    tempTeamChampId.sort(function (a, b) {
                        return a - b;
                    });

                }

                // Sorts the champions

                for (j = 0; j < 5; ++j) {
                    for (var l = 0; l < 5; ++l) {
                        if (tempTeamChamp[l].champ) {

                            if (tempTeamChamp[l].champ === tempTeamChampId[j])

                                allChamps[j] = tempTeamChamp[l];
                        }
                    }

                }
                var temp = data.teams[0];

                if (temp.winner)
                    tempWin = 1;
                else
                    tempWin = 0;


                allTeams[0] = new teamData(allChamps, tempWin, tempParticipant.teamId);

                // Gets data for team two
                for (i = 5; i < 10; ++i) {
                    masteryAll = [];
                    runeAll = [];
                    k = 0;
                    // Gets the current Team member
                    var tempParticipant = data.participants[i];


                    // Goes through masteries and adds all to an array
                    while (tempParticipant.masteries[k]) {
                        var tempId = tempParticipant.masteries[k].masteryId;
                        var tempRank = tempParticipant.masteries[k].rank;
                        //Pushes each mastery object into the mastery array
                        var tempMast = new mastery(tempRank, tempId);

                        masteryAll[k] = tempMast;
                        k++;
                    }
                    // Gets all the runes and adds it into an array
                    k = 0;

                    while (tempParticipant.runes[k]) {

                        //Pushes each rune object into the all runes array
                        var tempRuneId = tempParticipant.runes[k].runeId;
                        var tempRuneRank = tempParticipant.runes[k].rank;
                        var tempRune = new rune(tempRuneRank, tempRuneId);

                        runeAll[k] = tempRune;
                        k++;


                    }

                    //Stores champ Id
                    champID = tempParticipant.championId;

                    //Stores spells and sorts
                    spell[0] = tempParticipant.spell1Id;
                    spell[1] = tempParticipant.spell2Id;

                    spell.sort(function (a, b) {
                        return a - b;
                    });
                    var tempSpells = new spells(spell[0], spell[1]);

                    //Stores the team Id
                    teamId = tempParticipant.teamId;

                    // creates a team object
                    var tempChamp = new champion(champID, masteryAll, runeAll, tempSpells, teamId);
                    tempTeamChamp[i - 5] = tempChamp;
                    tempTeamChampId[i - 5] = champID;
                    tempTeamChampId.sort(function (a, b) {
                        return a - b;
                    });


                }
                for (j = 0; j < 5; ++j) {
                    for (var l = 0; l < 5; ++l) {
                        if (tempTeamChamp[l].champ) {
                            if (tempTeamChamp[l].champ === tempTeamChampId[j])
                                allChamps[j] = tempTeamChamp[l];
                        }
                    }
                }

                temp = data.teams[1];
                if (temp.winner)
                    tempWin = 1;
                else
                    tempWin = 0;

                allTeams[1] = new teamData(allChamps, tempWin, tempParticipant.teamId);
                var tempResult = allTeams[0].teamWin;
                if (tempResult)
                    var win = 100;
                else
                    var win = 200;
                if (allTeams[0].teamId === 100) {

                    var match = new matchData(matchId, allTeams[0], allTeams[1], win);
                } else {
                    var match = new matchData(matchId, allTeams[1], allTeams[0], win);
                }
                console.log(match);
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
                if (textStatus === "429") {

                    alert("STOP");
                }
                matchID = null;
            },
        });
    } else {}


}

/*
function summonerIdLookup() {
    
        var SUMMONER_NAME = "ikoogar";

    console.log(SUMMONER_NAME);

    if (SUMMONER_NAME !== "") {
        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {

                console.log(json);
                summonerID = json[SUMMONER_NAME].id;

                currentGameLookup(summonerID);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
}
*/
function currentGameLookup(){
    //Gets the summoner id
    
    var dataSets = {};
    var dataPoints = {};
    var allChamps = [];
    var allTeams = [];
    var spell = [];
    var tempTeamChamp = [];
    var tempTeamChampId = [];
    var tempAllTeamChamps = [];
    var teamId = 0;

    function matchData(teamOne, teamTwo) {
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
    }

    function teamData(allChamps) {
        this.team = allChamps;
    }

    function champion(champ, masteryAll, runeAll, spells) {
        this.champ = champ;
        this.masteryAll = masteryAll;
        this.runeAll = runeAll;
        this.spells = spells;

    }

    function spells(spellOne, spellTwo) {
        this.spellOne = spellOne;
        this.spellTwo = spellTwo;
    }

    function mastery(mastRank, mastIden) {
        this.mastIden = mastIden;
        this.mastRank = mastRank;

    }

    function rune(runeRank, runeIden) {
        this.runeIden = runeIden;
        this.runeRank = runeRank;
    }
    console.log("Current match");
    //Wingsofdeath 
    var summonerID = 21883744  ;
        // Fetches current game info 
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + summonerID + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {
                
            },
            success: function (theta) {
                console.log("Current match");
                for (i = 0; i < 5; ++i) {
                    var masteryAll = [];
                    var runeAll = [];
                    k = 0;
                    // Gets the current Team member
                    var tempParticipant = theta.participants[i];


                    // Goes through masteries and adds all to an array
                    while (tempParticipant.masteries[k]) {
                        var tempId = tempParticipant.masteries[k].masteryId;
                        var tempRank = tempParticipant.masteries[k].rank;
                        //Pushes each mastery object into the mastery array
                        var tempMast = new mastery(tempRank, tempId);
                        //console.log(tempId + " This is the mastery id on champ" +
                        masteryAll[k] = tempMast;
                        k++;
                    }
                    // Gets all the runes and adds it into an array
                    k = 0;
                    while (tempParticipant.runes[k]) {
                        //Pushes each rune object into the all runes array
                        var tempRuneId = tempParticipant.runes[k].runeId;
                        var tempRuneRank = tempParticipant.runes[k].rank;
                        var tempRune = new rune(tempRuneRank, tempRuneId);
                        runeAll[k] = tempRune;
                        k++;


                    }

                    //Stores champ Id
                    champID = tempParticipant.championId;

                    //Stores spells and sorts
                    spell[0] = tempParticipant.spell1Id;
                    spell[1] = tempParticipant.spell2Id;

                    spell.sort(function (a, b) {
                        return a - b;
                    });
                    var tempSpells = new spells(spell[0], spell[1]);


                    var tempChamp = new champion(champID, masteryAll, runeAll, tempSpells);
                    tempTeamChamp[i] = tempChamp;
                    tempTeamChampId[i] = champID;
                    tempTeamChampId.sort(function (a, b) {
                        return a - b;
                    });

                }

                // Sorts the champions

                for (j = 0; j < 5; ++j) {
                    for (var l = 0; l < 5; ++l) {
                        if (tempTeamChamp[l].champ) {

                            if (tempTeamChamp[l].champ === tempTeamChampId[j])

                                allChamps[j] = tempTeamChamp[l];
                        }
                    }

                }
                var temp = theta.teams[0];

                //Team one
                allTeams[0] = new teamData(allChamps);

                // Gets data for team two
                for (i = 5; i < 10; ++i) {
                    masteryAll = [];
                    runeAll = [];
                    k = 0;
                    // Gets the current Team member
                    var tempParticipant = theta.participants[i];


                    // Goes through masteries and adds all to an array
                    while (tempParticipant.masteries[k]) {
                        var tempId = tempParticipant.masteries[k].masteryId;
                        var tempRank = tempParticipant.masteries[k].rank;
                        //Pushes each mastery object into the mastery array
                        var tempMast = new mastery(tempRank, tempId);

                        masteryAll[k] = tempMast;
                        k++;
                    }
                    // Gets all the runes and adds it into an array
                    k = 0;

                    while (tempParticipant.runes[k]) {

                        //Pushes each rune object into the all runes array
                        var tempRuneId = tempParticipant.runes[k].runeId;
                        var tempRuneRank = tempParticipant.runes[k].rank;
                        var tempRune = new rune(tempRuneRank, tempRuneId);

                        runeAll[k] = tempRune;
                        k++;


                    }

                    //Stores champ Id
                    champID = tempParticipant.championId;

                    //Stores spells and sorts
                    spell[0] = tempParticipant.spell1Id;
                    spell[1] = tempParticipant.spell2Id;

                    spell.sort(function (a, b) {
                        return a - b;
                    });
                    var tempSpells = new spells(spell[0], spell[1]);

                    //Stores the team Id
                    teamId = tempParticipant.teamId;

                    // creates a team object
                    var tempChamp = new champion(champID, masteryAll, runeAll, tempSpells);
                    tempTeamChamp[i - 5] = tempChamp;
                    tempTeamChampId[i - 5] = champID;
                    tempTeamChampId.sort(function (a, b) {
                        return a - b;
                    });


                }
                
                //Sorts
                for (j = 0; j < 5; ++j) {
                    for (var l = 0; l < 5; ++l) {
                        if (tempTeamChamp[l].champ) {
                            if (tempTeamChamp[l].champ === tempTeamChampId[j])
                                allChamps[j] = tempTeamChamp[l];
                        }
                    }
                }

                //Team two
                allTeams[1] = new teamData(allChamps);
                var match = new matchData(allTeams[0], allTeams[1]);


                console.log("Current match" + match);
                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            }
        });





    }
