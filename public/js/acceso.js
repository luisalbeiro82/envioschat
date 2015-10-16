angular.module('accesochat', [] )
	.controller('accesoChatController', function($scope, $window) {

		function autoDataCallback(authData) {
			if(authData) {
				$window.location.href = 'index.html'
				console.log("Usuario " +  authData.password.email + " esta logeado.");
			}else{
				console.log("El usuario no esta logeado");
			}
		}

		var datos = new Firebase('https://chatusbtest.firebaseio.com/');
		datos.onAuth(autoDataCallback);		
		
		function authHandler(error, authData) {
			if(error) {
					console.log("Login false", error);
				}else{
					console.log("Autenticación correcta:", authData);
				}
		}

		$scope.iniciar_sesion = function() {
			datos.authWithPassword({
				email: $scope.email,
				password: $scope.password
			}, authHandler, {
				remember: "sessionOnly"
			});			
		}

	});