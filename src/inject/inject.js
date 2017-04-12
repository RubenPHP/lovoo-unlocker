chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		var ngHide = jQuery(".ng-hide").length;
		if (
			document.readyState === "complete"
			&& ngHide != null && ngHide > 0)
		{
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------

			//my code
			var url = window.location.pathname;

			if(url == '/discover/people') {
				console.log('lista de personas!!!');
				readUsersInfo();
			}
			else if(url == '/list/visits') {
				console.log('Gente que te ha visitado!!!');
			}
			else if(url == '/list/liked-you') {
				console.log('Gente a la que le has gustado!!!');
			}
			else if(url == '/discover/freshmen') {
				console.log('Gente nueva en lovoo!!!');
			}

			console.log(url);
		}
	}, 10);
});

function readUsersInfo() {
	var $userList = $('.o-grid--list #page-content .o-grid__cell');
	var userInfoList = [];

	$userList.each(function(index) {
		var $imgInfo = $(this).find('.user-image').attr('style');
		//debugger;
		var imgUrl = $imgInfo.split('"')[1];
		var imgId = imgUrl.split('/')[5];
		var imgIdObfuscated = md5(imgId);
		var userInfo = {
			profileUrl: $(this).find('a').attr('href'),
			imgId: imgId,
			imgUrl: imgUrl,
			imgIdObfuscated: imgIdObfuscated,
			imgUrlObfuscated: 'https://img.lovoo.com/users/pictures/' + imgIdObfuscated + '/thumb_l.jpg'

		}
		userInfoList.push(userInfo);
	});

	/*
	 Recuperar del local storage la lista de usuarias guardadas en el localStorage (si existe)
	  Comparar los elementos de userInfoList con los del localStorage, y hacer un merge de los arrays
	  incluyendo los nuevos elementos de userInfoList que no se encuentran en el arrya de LocalStorage
	  Entonces, guardar el array mergeado en localStorage
	  */

	// save on local storage
	localStorage.setItem("userInfoList", JSON.stringify(userInfoList));

	// recupera de localStorage
	// var usuarias = JSON.parse(localStorage.getItem("userInfoList"));

	//$($userLIst[0]).find('a').attr('href') //url del perfil
	//$($userLIst[0]).find('.user-image').attr('style') //url de la foto visible, de aquí sacamos el ID para el md5
	debugger;
}


function findObjectInArray(objectArray, imgIdObfuscated) {
	for (var i = 0, len = objectArray.length; i < len; i++) {
		if (objectArray[i].imgIdObfuscated === imgIdObfuscated)
			return objectArray[i]; // Return as soon as the object is found
	}
	return false; // The object was not found
}
