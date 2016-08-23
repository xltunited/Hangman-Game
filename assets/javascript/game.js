//Loads after the html page has finished laoding

$(document).ready(function(){

	var gameWord = "";

	var index = 0;

	var userGuessArray = [];

	var overload = [];

	//Arrays for the various difficulties 

	var difficultyArray1 = ["_", "_", "_", "_", "_"];

	var difficultyArray2 = ["_", "_", "_", "_", "_", "_"];

	var difficultyArray3 = ["_", "_", "_", "_", "_", "_", "_"];

	var difficultyArray4 = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

	var difficultyArray5 = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];

	//Array that holds the word currently in play to be guessed

	var currentWord = [];

	// Game Difficulties

	var difficulty1 = document.getElementById('level1');
	var difficulty2 = document.getElementById('level2');
	var difficulty3 = document.getElementById('level3');
	var difficulty4 = document.getElementById('level4');
	var difficulty5 = document.getElementById('level5');

	//Hold number of userGuesses(to be declared later in this file) that are wrong and right

	var wrongs = 0;

	var rights = 0;

	var wins = 0;

	document.querySelector('#wins').insertAdjacentHTML('beforeEnd', wins);

	var losses = 0;

	document.querySelector('#losses').insertAdjacentHTML('beforeEnd', losses);

	var tries = 0;

	//Reference to hide the row containing the difficulty buttons

	var welcomeRow = document.getElementById('welcome');

	var settingRow = document.getElementById('setting');

	var buttonRow = document.getElementById('gameDifficultyButtons');

	var gameInfoRow = document.getElementById('gameInfo');

	var winScreen = document.getElementById('win');

	var lossScreen = document.getElementById('loss');

	var newGameWin = document.getElementById('newGameWin');

	var newGameLoss = document.getElementById('newGameLoss');


	difficulty1.onclick = function(){

		//To begin the game the game difficulty buttons will disappear
		//and show the user guesses

		if(gameWord == ""){

			tries = 7;

			buttonRow.style.display = 'none';
			welcomeRow.style.display = 'none';
			settingRow.style.display = 'none';
			gameInfo.style.display = 'block';

			document.querySelector('#triesRemaining').innerHTML = tries;
			document.querySelector('#correct').innerHTML = difficultyArray1.join("");;

		}

		var apicall = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=ba3d180eb7c56867e600204177a00eee809035f45d0789fd6";

		//Use GET request to get a 5 character word


		$.getJSON(apicall, function(data){

			var parsedData = JSON.parse(JSON.stringify(data));

			gameWord = JSON.stringify(parsedData.word.toUpperCase()).substring(1,6);

		});

		//Document reads for key presses

		document.addEventListener("keypress", check1);

		//Performs function 'check1' upon key press

		function check1() {

			//Populate the array 'currentWord' with every letter of the word fetched (Makes is easier to check user input against the game word)

			if(currentWord.length == 0){

				currentWord = gameWord.split("");

			}

			//Store the user's letter guess in 'userGuess'

			var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

			//Checks the 'userGuess' vs an initially empty array called 'userGuessArray'
			//If 'userGuess' is not found in the array, it proceeds to execute code
			//that will check if the guess the user made is correct or not

			if(userGuessArray.indexOf(userGuess) == -1){

				//Adds 'userGuess' to 'userGuessArray'

				userGuessArray.push(userGuess);

				//Declare and initialize the array that I want to push into the index.html page

				var htmlUserArray = userGuessArray.join("");

				//There is a div with an ID of 'userGuessArray' that is where the above array will be shown

				document.querySelector('#userGuessArray').innerHTML = htmlUserArray;


				//Checks current ammount of wrongs, if user has 3 wrongs and this 4th attemp is also wrong
				// it executes the code inside the if statement

				if(wrongs == 6 && currentWord.indexOf(userGuess) == -1 ){

					tries = 0;

					document.querySelector('#triesRemaining').innerHTML = tries;

					losses++;

					document.querySelector('#losses').innerHTML = "Losses: "+ losses;

					lossScreen.style.display = " block";

					document.querySelector('#correct').innerHTML = gameWord;

					document.removeEventListener("keypress", check1);

					newGameLoss.onclick = function resetDefaultValues(){

						//All the following code inside this if statement resets all values to their defaults
						//so when a difficulty button is pressed again, the game can restart with defaults set

						buttonRow.style.display = 'block';
						welcomeRow.style.display = 'block';
						settingRow.style.display = 'block';
						gameInfo.style.display = 'none';
						lossScreen.style.display = 'none';


						wrongs = 0;
						rights = 0;

						//Empties all the arrays
						currentWord.splice(0,currentWord.length);
						userGuessArray.splice(0,userGuessArray.length);
						htmldifficultuArray1 = "";
						htmlUserArray = "";

						//Clears out the div in the index.html that displayed the htmlUserArray

						document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
						document.querySelector('#correct').innerHTML = htmldifficultuArray1;

						difficultyArray1 = ["_", "_", "_", "_", "_"];

						gameWord = "";

						

						//Finishes the function (or so I wish, I want this to finish the difficulty1.onclick function too)

					}

					return;

				}

				//Checks the userGuess vs the current word of the game

				if(currentWord.indexOf(userGuess) >= 0){

					//The following loop checks for all instances of the same letter in the word

					while(currentWord.indexOf(userGuess) >= 0){

						

						//difficultyArray1 starts off empty, only when a userGuess is right, userGuess is pushed into the array
						//at the same index it is in the array currentWord

						difficultyArray1[currentWord.indexOf(userGuess)] = userGuess;

						//Access the index of the array that holds the game word and exchanges whatever letter was in there
						//to ""(empty), and loops again to look for the next instance of the same letter
						currentWord[currentWord.indexOf(userGuess)] = "_";

						var htmldifficultuArray1 = difficultyArray1.join("");

						document.querySelector('#correct').innerHTML = htmldifficultuArray1;

						//Because the difficulty is 1, the length of the letter to be guessed is 5

						rights++;

						//Once rights == 5 whatever is supposed to happen when you win will go in there
						//Also will contain code to restore game defaults

						if(rights == 5){

							winScreen.style.display = 'block';

							wins++;

							document.querySelector('#wins').innerHTML = "Wins: "+ wins;

							document.removeEventListener("keypress", check1);

							newGameWin.onclick = function resetDefaultValues(){

								//All the following code inside this if statement resets all values to their defaults
								//so when a difficulty button is pressed again, the game can restart with defaults set

								buttonRow.style.display = 'block';
								welcomeRow.style.display = 'block';
								settingRow.style.display = 'block';
								gameInfo.style.display = 'none';
								winScreen.style.display = 'none';


								wrongs = 0;
								rights = 0;

								//Empties all the arrays
								currentWord.splice(0,currentWord.length);
								userGuessArray.splice(0,userGuessArray.length);
								htmldifficultuArray1 = "";
								htmlUserArray = "";

								//Clears out the div in the index.html that displayed the htmlUserArray

								document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
								document.querySelector('#correct').innerHTML = htmldifficultuArray1;

								difficultyArray1 = ["_", "_", "_", "_", "_"];

								gameWord = "";

								//Finishes the function (or so I wish, I want this to finish the difficulty1.onclick function too)

							}

							return;

						}

					}
			
				}

				else {

					//When userGuess is not found, the number of wrong increases

					wrongs++;
					tries--;

					document.querySelector('#triesRemaining').innerHTML = tries;


				}

			}



		}

		return;
	}

	difficulty2.onclick = function(){

		if(gameWord == ""){

			tries = 9;

			buttonRow.style.display = 'none';
			welcomeRow.style.display = 'none';
			settingRow.style.display = 'none';
			gameInfo.style.display = 'block';

			document.querySelector('#triesRemaining').innerHTML = tries;
			document.querySelector('#correct').innerHTML = difficultyArray2.join("");;

		}

		var apicall = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=ba3d180eb7c56867e600204177a00eee809035f45d0789fd6";

		$.getJSON(apicall, function(data){

			var parsedData = JSON.parse(JSON.stringify(data));

			gameWord = JSON.stringify(parsedData.word.toUpperCase()).substring(1,7);

		});

		document.addEventListener("keypress", check2);

		function check2() {

			if(currentWord.length == 0){

				currentWord = gameWord.split("");

			}

			var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

			if(userGuessArray.indexOf(userGuess) == -1){

				userGuessArray.push(userGuess);

				var htmlUserArray = userGuessArray.join("");

				document.querySelector('#userGuessArray').innerHTML = htmlUserArray;

				if(wrongs == 8 && currentWord.indexOf(userGuess) == -1 ){

					tries = 0;

					document.querySelector('#triesRemaining').innerHTML = tries;

					losses++;

					document.querySelector('#losses').innerHTML = "Losses: "+ losses;

					lossScreen.style.display = " block";

					document.removeEventListener("keypress", check2);

					document.querySelector('#correct').innerHTML = gameWord;

					newGameLoss.onclick = function resetDefaultValues(){

						buttonRow.style.display = 'block';
						welcomeRow.style.display = 'block';
						settingRow.style.display = 'block';
						gameInfo.style.display = 'none';
						lossScreen.style.display = 'none';

						wrongs = 0;
						rights = 0;

						currentWord.splice(0,currentWord.length);
						userGuessArray.splice(0,userGuessArray.length);
						htmldifficultuArray2 = "";
						htmlUserArray = "";

						document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
						document.querySelector('#correct').innerHTML = htmldifficultuArray2;

						difficultyArray2 = ["_", "_", "_", "_", "_", "_"];

						gameWord = "";

					}

					return;

				}

				if(currentWord.indexOf(userGuess) >= 0){

					while(currentWord.indexOf(userGuess) >= 0){

						difficultyArray2[currentWord.indexOf(userGuess)] = userGuess;

						currentWord[currentWord.indexOf(userGuess)] = "_";

						var htmldifficultuArray2 = difficultyArray2.join("");

						document.querySelector('#correct').innerHTML = htmldifficultuArray2;

						rights++;

						if(rights == 6){

							winScreen.style.display = 'block';

							wins++;

							document.querySelector('#wins').innerHTML = "Wins: "+ wins;

							document.removeEventListener("keypress", check2);

							newGameWin.onclick = function resetDefaultValues(){

								buttonRow.style.display = 'block';
								welcomeRow.style.display = 'block';
								settingRow.style.display = 'block';
								gameInfo.style.display = 'none';
								winScreen.style.display = 'none';

								wrongs = 0;
								rights = 0;

								currentWord.splice(0,currentWord.length);
								userGuessArray.splice(0,userGuessArray.length);
								htmldifficultuArray2 = "";
								htmlUserArray = "";

								document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
								document.querySelector('#correct').innerHTML = htmldifficultuArray2;

								difficultyArray2 = ["_", "_", "_", "_", "_", "_"];

								gameWord = "";

							}

							return;

						}

					}
			
				}

				else {

					wrongs++;
					tries--;

					document.querySelector('#triesRemaining').innerHTML = tries;

				}

			}

		}

		return;
	}

	difficulty3.onclick = function(){

		if(gameWord == ""){

			tries = 11;

			buttonRow.style.display = 'none';
			welcomeRow.style.display = 'none';
			settingRow.style.display = 'none';
			gameInfo.style.display = 'block';

			document.querySelector('#triesRemaining').innerHTML = tries;
			document.querySelector('#correct').innerHTML = difficultyArray3.join("");;

		}

		var apicall = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=7&maxLength=7&api_key=ba3d180eb7c56867e600204177a00eee809035f45d0789fd6";

		$.getJSON(apicall, function(data){

			var parsedData = JSON.parse(JSON.stringify(data));

			gameWord = JSON.stringify(parsedData.word.toUpperCase()).substring(1,8);

		});

		document.addEventListener("keypress", check3);

		function check3() {

			if(currentWord.length == 0){

				currentWord = gameWord.split("");

			}

			var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

			if(userGuessArray.indexOf(userGuess) == -1 && overload.indexOf(userGuess == -1)){

				if(userGuessArray.length < 16){

					userGuessArray.push(userGuess);

					var htmlUserArray = userGuessArray.join("");

					document.querySelector('#userGuessArray').innerHTML = htmlUserArray;

				}

				else {

					overload.push(userGuess);

					var htmloverload = overload.join("");

					document.querySelector('#overload').innerHTML = htmloverload;

				}

				if(wrongs == 10 && currentWord.indexOf(userGuess) == -1 ){

					tries = 0;

					document.querySelector('#triesRemaining').innerHTML = tries;

					losses++;

					document.querySelector('#losses').innerHTML = "Losses: "+ losses;

					lossScreen.style.display = " block";

					document.removeEventListener("keypress", check3);

					document.querySelector('#correct').innerHTML = gameWord;

					newGameLoss.onclick = function resetDefaultValues(){

						buttonRow.style.display = 'block';
						welcomeRow.style.display = 'block';
						settingRow.style.display = 'block';
						gameInfo.style.display = 'none';
						lossScreen.style.display = 'none';

						wrongs = 0;
						rights = 0;

						currentWord.splice(0,currentWord.length);
						userGuessArray.splice(0,userGuessArray.length);
						overload.splice(0,overload.length);
						htmloverload = "";
						htmldifficultuArray3 = "";
						htmlUserArray = "";

						document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
						document.querySelector('#correct').innerHTML = htmldifficultuArray3;

						difficultyArray3 = ["_", "_", "_", "_", "_", "_", "_"];

						gameWord = "";

					}

					return;

				}

				if(currentWord.indexOf(userGuess) >= 0){

					while(currentWord.indexOf(userGuess) >= 0){

						difficultyArray3[currentWord.indexOf(userGuess)] = userGuess;

						currentWord[currentWord.indexOf(userGuess)] = "_";

						var htmldifficultuArray3 = difficultyArray3.join("");

						document.querySelector('#correct').innerHTML = htmldifficultuArray3;

						rights++;

						if(rights == 7){

							winScreen.style.display = 'block';

							wins++;

							document.querySelector('#wins').innerHTML = "Wins: "+ wins;

							document.removeEventListener("keypress", check3);

							newGameWin.onclick = function resetDefaultValues(){

								buttonRow.style.display = 'block';
								welcomeRow.style.display = 'block';
								settingRow.style.display = 'block';
								gameInfo.style.display = 'none';
								winScreen.style.display = 'none';

								wrongs = 0;
								rights = 0;

								currentWord.splice(0,currentWord.length);
								userGuessArray.splice(0,userGuessArray.length);
								overload.splice(0,overload.length);
								htmloverload = "";
								htmldifficultuArray3 = "";
								htmlUserArray = "";

								document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
								document.querySelector('#correct').innerHTML = htmldifficultuArray3;

								difficultyArray3 = ["_", "_", "_", "_", "_", "_", "_"];

								gameWord = "";

							}

							return;

						}

					}
			
				}

				else {

					wrongs++;
					tries--;

					document.querySelector('#triesRemaining').innerHTML = tries;

				}

			}

		}

		return;
	}

	difficulty4.onclick = function(){

		if(gameWord == ""){

			tries = 12;

			buttonRow.style.display = 'none';
			welcomeRow.style.display = 'none';
			settingRow.style.display = 'none';
			gameInfo.style.display = 'block';

			document.querySelector('#triesRemaining').innerHTML = tries;
			document.querySelector('#correct').innerHTML = difficultyArray4.join("");;

		}

		var apicall = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=9&maxLength=9&api_key=ba3d180eb7c56867e600204177a00eee809035f45d0789fd6";

		$.getJSON(apicall, function(data){

			var parsedData = JSON.parse(JSON.stringify(data));

			gameWord = JSON.stringify(parsedData.word.toUpperCase()).substring(1,10);

		});

		document.addEventListener("keypress", check4);

		function check4() {

			if(currentWord.length == 0){

				currentWord = gameWord.split("");

			}

			var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

			if(userGuessArray.indexOf(userGuess) == -1 && overload.indexOf(userGuess == -1)){

				if(userGuessArray.length < 16){

					userGuessArray.push(userGuess);

					var htmlUserArray = userGuessArray.join("");

					document.querySelector('#userGuessArray').innerHTML = htmlUserArray;

				}

				else {

					overload.push(userGuess);

					var htmloverload = overload.join("");

					document.querySelector('#overload').innerHTML = htmloverload;

				}

				if(wrongs == 11 && currentWord.indexOf(userGuess) == -1 ){

					tries = 0;

					document.querySelector('#triesRemaining').innerHTML = tries;

					losses++;

					document.querySelector('#losses').innerHTML = "Losses: "+ losses;

					lossScreen.style.display = " block";

					document.removeEventListener("keypress", check4);

					document.querySelector('#correct').innerHTML = gameWord;

					newGameLoss.onclick = function resetDefaultValues(){

						buttonRow.style.display = 'block';
						welcomeRow.style.display = 'block';
						settingRow.style.display = 'block';
						gameInfo.style.display = 'none';
						lossScreen.style.display = 'none';

						wrongs = 0;
						rights = 0;

						currentWord.splice(0,currentWord.length);
						userGuessArray.splice(0,userGuessArray.length);
						overload.splice(0,overload.length);
						htmloverload = "";
						htmldifficultuArray4 = "";
						htmlUserArray = "";

						document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
						document.querySelector('#correct').innerHTML = htmldifficultuArray4;

						difficultyArray4 = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

						gameWord = "";

					}

					return;

				}

				if(currentWord.indexOf(userGuess) >= 0){

					while(currentWord.indexOf(userGuess) >= 0){

						difficultyArray4[currentWord.indexOf(userGuess)] = userGuess;

						currentWord[currentWord.indexOf(userGuess)] = "_";

						var htmldifficultuArray4 = difficultyArray4.join("");

						document.querySelector('#correct').innerHTML = htmldifficultuArray4;

						rights++;

						if(rights == 9){

							winScreen.style.display = 'block';

							wins++;

							document.querySelector('#wins').innerHTML = "Wins: "+ wins;

							document.removeEventListener("keypress", check4);

							newGameWin.onclick = function resetDefaultValues(){

								buttonRow.style.display = 'block';
								welcomeRow.style.display = 'block';
								settingRow.style.display = 'block';
								gameInfo.style.display = 'none';
								winScreen.style.display = 'none';

								wrongs = 0;
								rights = 0;

								currentWord.splice(0,currentWord.length);
								userGuessArray.splice(0,userGuessArray.length);
								overload.splice(0,overload.length);
								htmloverload = "";
								htmldifficultuArray4 = "";
								htmlUserArray = "";

								document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
								document.querySelector('#correct').innerHTML = htmldifficultuArray4;

								difficultyArray4 = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

								gameWord = "";

							}

							return;

						}

					}
			
				}

				else {

					wrongs++;
					tries--;

					document.querySelector('#triesRemaining').innerHTML = tries;

				}

			}

		}

		return;
	}

	difficulty5.onclick = function(){

		if(gameWord == ""){

			tries = 14;

			buttonRow.style.display = 'none';
			welcomeRow.style.display = 'none';
			settingRow.style.display = 'none';
			gameInfo.style.display = 'block';

			document.querySelector('#triesRemaining').innerHTML = tries;
			document.querySelector('#correct').innerHTML = difficultyArray5.join("");;

		}

		var apicall = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=15&maxLength=15&api_key=ba3d180eb7c56867e600204177a00eee809035f45d0789fd6";

		$.getJSON(apicall, function(data){

			var parsedData = JSON.parse(JSON.stringify(data));

			gameWord = JSON.stringify(parsedData.word.toUpperCase()).substring(1,16);

		});

		document.addEventListener("keypress", check5);

		function check5() {

			if(currentWord.length == 0){

				currentWord = gameWord.split("");

			}

			var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

			if(userGuessArray.indexOf(userGuess) == -1 && overload.indexOf(userGuess == -1)){

				if(userGuessArray.length < 16){

					userGuessArray.push(userGuess);

					var htmlUserArray = userGuessArray.join("");

					document.querySelector('#userGuessArray').innerHTML = htmlUserArray;

				}

				else {

					overload.push(userGuess);

					var htmloverload = overload.join("");

					document.querySelector('#overload').innerHTML = htmloverload;

				}

				if(wrongs == 13 && currentWord.indexOf(userGuess) == -1 ){

					tries = 0;

					document.querySelector('#triesRemaining').innerHTML = tries;

					losses++;

					document.querySelector('#losses').innerHTML = "Losses: "+ losses;

					lossScreen.style.display = " block";

					document.querySelector('#correct').innerHTML = gameWord;

					document.removeEventListener("keypress", check5);

					newGameLoss.onclick = function resetDefaultValues(){

						buttonRow.style.display = 'block';
						welcomeRow.style.display = 'block';
						settingRow.style.display = 'block';
						gameInfo.style.display = 'none';
						lossScreen.style.display = 'none';

						wrongs = 0;
						rights = 0;

						currentWord.splice(0,currentWord.length);
						userGuessArray.splice(0,userGuessArray.length);
						overload.splice(0,overload.length);
						htmloverload = "";
						htmldifficultuArray5 = "";
						htmlUserArray = "";

						document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
						document.querySelector('#correct').innerHTML = htmldifficultuArray5;

						difficultyArray5 = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];

						gameWord = "";

					}

					return;

				}

				if(currentWord.indexOf(userGuess) >= 0){

					while(currentWord.indexOf(userGuess) >= 0){

						difficultyArray5[currentWord.indexOf(userGuess)] = userGuess;

						currentWord[currentWord.indexOf(userGuess)] = "_";

						var htmldifficultuArray5 = difficultyArray5.join("");

						document.querySelector('#correct').innerHTML = htmldifficultuArray5;

						rights++;

						if(rights == 15){

							winScreen.style.display = 'block';

							wins++;

							document.querySelector('#wins').innerHTML = "Wins: "+ wins;

							document.removeEventListener("keypress", check5);

							newGameWin.onclick = function resetDefaultValues(){

								buttonRow.style.display = 'block';
								welcomeRow.style.display = 'block';
								settingRow.style.display = 'block';
								gameInfo.style.display = 'none';
								winScreen.style.display = 'none';


								wrongs = 0;
								rights = 0;

								currentWord.splice(0,currentWord.length);
								userGuessArray.splice(0,userGuessArray.length);
								overload.splice(0,overload.length);
								htmloverload = "";
								htmldifficultuArray5 = "";
								htmlUserArray = "";

								document.querySelector('#userGuessArray').innerHTML = htmlUserArray;
								document.querySelector('#correct').innerHTML = htmldifficultuArray5;

								difficultyArray5 = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];

								gameWord = "";

							}

							return;

						}

					}
			
				}

				else {

					wrongs++;
					tries--;

					document.querySelector('#triesRemaining').innerHTML = tries;

				}

			}

		}

		return;
	}	
	
})




















