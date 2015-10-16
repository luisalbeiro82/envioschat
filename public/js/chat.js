$(function() {

	//var objFirebase = new Firebase('https://chatusb.firebaseio.com/');
	//var objFirebase = new Firebase('https://ce4r7beysrf.firebaseio-demo.com/');
	var objFirebase = new Firebase('https://chatusbtest.firebaseio.com/');
	$('#btnEnviar').click(enviar_mensaje);
	$('#btnEnviarAuthTwitter').click(auth_twitter);

	function auth_twitter() {
		objFirebase.authWithOAuthPopup('twitter', function(error, authData ) {
			if(error) {
				console.log('ERROR AUTH');
			}else{
				console.log(authData);
			}

		});
	}	

	function enviar_mensaje() {

		var nombre =  $('#nombre').val();
		var mensaje =  $('#mensaje').val();

		objFirebase.push({autor: nombre, mensaje: mensaje});
		$('#mensaje').val('');
	}

	objFirebase.on('child_added', function(snapshot) {
	 		var message = snapshot.val();
	//mostrar_mensaje(message.autor, message.mensaje);
	var plantilla = getPlantilla(message.autor, message.mensaje);
	$('#mensajesDiv').append(plantilla);
	});

	function getPlantilla(autor, mensaje) {
		var plantilla = '<div class="msg">' +
						'<b>' + autor + '</b>' +
						'<p>' + mensaje + '</p>' +
						'</div>'			
		return plantilla;
	}
	

	function mostrar_mensaje(autor, mensaje) {
		 $('<div/>').text(mensaje).prepend($('<em/>').text(autor+': ')).appendTo($('#mensajesDiv'));
	        $('#mensajesDiv')[0].scrollTop = $('#mensajesDiv')[0].scrollHeight;
	} 
	

});