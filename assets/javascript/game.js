$(document).ready(function(){

	var gameWord = "";

	var index = 0;

	var userGuessArray = [];

	var difficultyArray1 = ["", "", "", "", ""];

	var difficultyArray2 = ["", "", "", "", "", ""];

	var difficultyArray3 = ["", "", "", "", "", "", ""];

	var difficultyArray4 = ["", "", "", "", "", "", "", "", ""];

	var difficultyArray5 = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];

	var currentWord = [];

	var difficulty1 = document.getElementById('level1');
	var difficulty2 = document.getElementById('level2');
	var difficulty3 = document.getElementById('level3');
	var difficulty4 = document.getElementById('level4');
	var difficulty5 = document.getElementById('level5');

	var wrongs = 0;

	var rights = 0;

	difficulty1.onclick = function showGame() {

		var buttonRow = document.getElementById('gameDifficultyButtons');

		var buttonRowDisplaySetting = buttonRow.style.display;

	
			buttonRow.style.display = 'none';


		


	}


	difficulty1.onclick = function(){

		var word = new XMLHttpRequest();

		word.open("GET", "http://randomword.setgetgo.com/get.php?len=5", false);

		word.send();

		gameWord = word.responseText.toUpperCase();

		for(var k = 0; k < gameWord.length; k++){

			currentWord.push(gameWord.charAt(k));

		}

		alert(gameWord);

		document.addEventListener("keypress", check1);

		function check1() {

			var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

			if(wrongs == 4){

				return;

			}

			if(userGuessArray.indexOf(userGuess) == -1){

				userGuessArray.push(userGuess);

				var htmlUserArray = userGuessArray;

				document.querySelector('#userGuessArray').innerHTML = htmlUserArray;

				$('#userGuessArray').each(function () {

   				$(this).html($(this).html().replace(/(,)/g, '<span style="color: #fff;">$1</span>'));

				});

				alert(userGuess)

				if(currentWord.indexOf(userGuess) >= 0){

					while(currentWord.indexOf(userGuess) >= 0){

						difficultyArray1[currentWord.indexOf(userGuess)] = userGuess;
						currentWord[currentWord.indexOf(userGuess)] = "";

						rights++;

						if(rights == 5){

						}

					}
			
				}

				else {

					wrongs++;

				}

			}

		}

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




















