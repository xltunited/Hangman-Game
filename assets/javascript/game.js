$(document).ready(function(){

	var gameWord = "";

	var index = 0;

	var userGuessArray = [];

	var difficultyArray1 = ["", "", "", "", ""];

	var difficultyArray2 = ["", "", "", "", "", ""];

	var difficultyArray3 = ["", "", "", "", "", "", ""];

	var difficultyArray4 = ["", "", "", "", "", "", "", "", ""];

	var difficultyArray5 = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];

	var difficulty = 1;

	var wrongs = 0;


		
	

		if( difficulty === 1){

			if(gameWord === ""){

				for( var i = 0; i < 1; i++){

					var word = new XMLHttpRequest();

					word.open("GET", "http://randomword.setgetgo.com/get.php?len=5", false);

					word.send();

					gameWord = word.responseText.toUpperCase();

					alert(gameWord);



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

						alert(a);

						var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

						userGuessArray.push(userGuess);

						if(gameWord.indexOf(userGuess) >= 0){

							difficultyArray1[gameWord.indexOf(userGuess)] = userGuess;

							index = gameWord.indexOf(userGuess);

							var sub = "";

							if(index == 0){

								index = 1;

								sub = gameWord.substring(index);

							} 

							else {

								sub = gameWord.substring(index+1);

							}

							alert(sub);


							index = sub.indexOf(userGuess) + index;
 
							alert(index);

							if(index != -1){

								while (index != -1) {

									difficultyArray1[index] = userGuess;

									index = gameWord.substring(index+1).indexOf(userGuess) + index;

								}

							}

						}

						else {


							wrongs++;

							alert(wrongs);

						}

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




















