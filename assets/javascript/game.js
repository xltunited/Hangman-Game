//Loads after the html page has finished laoding

$(document).ready(function(){

	var gameWord = "";

	var index = 0;

	var userGuessArray = [];

	//Arrays for the various difficulties 

	var difficultyArray1 = ["_", "_", "_", "_", "_"];

	var difficultyArray2 = ["", "", "", "", "", ""];

	var difficultyArray3 = ["", "", "", "", "", "", ""];

	var difficultyArray4 = ["", "", "", "", "", "", "", "", ""];

	var difficultyArray5 = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];

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

	var losses = 0;

	var tries = 0;

	//Reference to hide the row containing the difficulty buttons

	var welcomeRow = document.getElementById('welcome');

	var settingRow = document.getElementById('setting');

	var buttonRow = document.getElementById('gameDifficultyButtons');

	var gameInfoRow = document.getElementById('gameInfo');

	difficulty1.onclick = function(){

		//To begin the game the game difficulty buttons will disappear
		//and show the user guesses

		if(gameWord == ""){

			tries = 4;

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

			console.log(data);

			var parsedData = JSON.parse(JSON.stringify(data));

			console.log(parsedData);

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

			console.log(currentWord);

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

				if(wrongs == 3 && currentWord.indexOf(userGuess) == -1 ){

					//All the following code inside this if statement resets all values to their defaults
					//so when a difficulty button is pressed again, the game can restart with defaults set

					buttonRow.style.display = 'block';
					welcomeRow.style.display = 'block';
					settingRow.style.display = 'block';
					gameInfo.style.display = 'none'


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

					document.removeEventListener("keypress", check1);

					//Finishes the function (or so I wish, I want this to finish the difficulty1.onclick function too)

					losses++;

					alert("You Loose")

					return;

				}

				alert(userGuess)

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

							//All the following code inside this if statement resets all values to their defaults
							//so when a difficulty button is pressed again, the game can restart with defaults set

							buttonRow.style.display = 'block';
							welcomeRow.style.display = 'block';
							settingRow.style.display = 'block';
							gameInfo.style.display = 'none';


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

							document.removeEventListener("keypress", check1);

							alert("You Win");

							wins++;

							return;

						}

					}
			
				}

				else {

					//When userGuess is not found, the number of wrong increases

					wrongs++;


				}

			}

		}

		return;
	}

		
	
		// if( difficulty === 2){

		// 	if(word === ""){

		// 		for( var i = 0; i < 1; i++){

		// 			var word = new XMLHttpRequest();

		// 			word.open("GET", "http://randomword.setgetgo.com/get.php?len=6", false);

		// 			word.send();
				 
		// 			alert(word.responseText);


		// 		}

		// 	}

		// }

		// if( difficulty === 3){

		// 	if(word === ""){

		// 		for( var i = 0; i < 1; i++){

		// 			var word = new XMLHttpRequest();

		// 			word.open("GET", "http://randomword.setgetgo.com/get.php?len=7", false);

		// 			word.send();
				 
		// 			alert(word.responseText);


		// 		}

		// 	}

		// }

		// if( difficulty === 4){

		// 	if(word === ""){

		// 		for( var i = 0; i < 1; i++){

		// 			var word = new XMLHttpRequest();

		// 			word.open("GET", "http://randomword.setgetgo.com/get.php?len=9", false);

		// 			word.send();
				 
		// 			alert(word.responseText);


		// 		}

		// 	}

		// }

		// if( difficulty === 5){

		// 	if(word === ""){

		// 		for( var i = 0; i < 1; i++){

		// 			var word = new XMLHttpRequest();

		// 			word.open("GET", "http://randomword.setgetgo.com/get.php?len=14", false);

		// 			word.send();
				 
		// 			alert(word.responseText);


		// 		}

		// 	}

		// }





	

})




















