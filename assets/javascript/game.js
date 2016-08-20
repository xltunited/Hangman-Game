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

	var difficulty = 1;

	var wrongs = 0;

	var rights = 0;


		
	

		if( difficulty === 1){

			if(gameWord === ""){

				for( var i = 0; i < 1; i++){

					var word = new XMLHttpRequest();

					word.open("GET", "http://randomword.setgetgo.com/get.php?len=5", false);

					word.send();

					gameWord = word.responseText.toUpperCase();

					for(var k = 0; k < gameWord.length; k++){

						currentWord.push(gameWord.charAt(k));

					}

					alert(gameWord);
					alert(currentWord);



				}

				// for(wrongs = 0; wrongs < 5 ;){

				// 	if(wrongs == 4){

				// 		wrongs = 5;
				// 		gameWord = "";
				// 		continue;

				// 	}

					alert("here1");

					var a = document.addEventListener("keypress", check);


					function check() {

						var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

						alert(userGuess);

						userGuessArray.push(userGuess);

						if(currentWord.indexOf(userGuess) >= 0){

							while(currentWord.indexOf(userGuess) >= 0){

								difficultyArray1[currentWord.indexOf(userGuess)] = userGuess;
								currentWord[currentWord.indexOf(userGuess)] = "";

								rights++;

								if(rights == 5){

									alert("You Win");

								}

							
							}
							
							
						}

						else {


							wrongs++;

							alert(wrongs);

							if(wrongs == 4){

								alert("You Lose");

							}

						}
						alert(currentWord);
						alert(userGuessArray);
						alert(difficultyArray1);

					}



				// }

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




















