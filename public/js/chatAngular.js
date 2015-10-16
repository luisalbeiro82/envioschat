angular.module('chatusb', [])
	.controller('chatAngularController', function($scope, $interval, $window) {
		
		var nombreUsuario = '';

		function autoDataCallback(authData) {
			if(authData) {
				nombreUsuario = authData.password.email
				console.log("Usuario " +  authData.password.email + " esta logeado.");
			}else{
				$window.location.href = 'login.html'
				console.log("El usuario no esta logeado");
			}
		}

		//var objFirebase = new Firebase('https://chatusb.firebaseio.com/');
		//var objFirebase = new Firebase('https://ce4r7beysrf.firebaseio-demo.com/');
		var objFirebase = new Firebase('https://chatusbtest.firebaseio.com/');
		objFirebase.onAuth(autoDataCallback);		
		
		$scope.mensajes = [];
		$scope.nombre = nombreUsuario;

		objFirebase.on('child_added', function(snapshot) {
		 		var message = snapshot.val();
				getPlantilla(message.autor, message.mensaje);
			});

		function getPlantilla(autor, mensaje) {

			$scope.mensajes.push({
					nombre: autor,
					texto: mensaje
				});
		}

		$scope.enviar = function() {
			var miAutor = $scope.nombre
			var miMensaje = $scope.mensaje
			objFirebase.push({autor: miAutor, mensaje: miMensaje});
			$scope.mensaje = '';
		}

		
		$scope.salir = function() {
			objFirebase.unauth();
		}

/*
		$interval( function(){
        	$scope.$apply();
    	}, 7000 );
*/
	});