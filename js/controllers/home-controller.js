angular.module('controlei')
.controller('HomeController', ['$scope', '$uibModal', '$log', '$document', '$location', '$window', '$filter', 'HomeService', '$rootScope', '$localStorage','$rootScope', 
	function ($scope, $uibModal, $log, $document, $location, $window, $filter, HomeService, $rootScope, $localStorage, $rootScope) {

    $scope.temErro = false;
    $scope.tela = 3;
    $scope.mensagem = "";
    $scope.form = {
    	"name": "",
    	"email": "contato@williansmartins.com", 
    	"password": "martins"
    };
    $scope.$storage = $localStorage;
    $scope.apontamentosDoDia = {};
    $scope.todosApontamentos = {};
    $scope.sucesso = false;
    $scope.entidadeSelecionada = null;
 
    $scope.apontar = function(){
    	//console.info("apontando...");

    	HomeService.apontar()
        .success(function(response, status){
            $scope.sucesso = true;
            setTimeout(voltar, 3000);
        })
        .error(function(response){
            alert("Erro!");
        });
    }

    var voltar = function(){
        console.info("mudando para false");
        $scope.sucesso = false;
        $scope.$apply();
    }

    var buscarApontamentosDoDia = function(){
    	HomeService.buscarApontamentosDoDia()
        .success(function(response, status){
    		$scope.apontamentosDoDia = response.apontamento;

    		angular.forEach($scope.apontamentosDoDia, function(value, key) {
                value.ponto = new Date(value.ponto.replace(' ', 'T')+"-03:00");
			});

         // $scope.$apply();

        })
        .error(function(response){
            alert("Erro!");
        });
    }

    var buscarTodosApontamentos = function(){
    	HomeService.buscarTodosApontamentos()
        .success(function(response, status){
    		$scope.todosApontamentos = response.apontamento;

    		angular.forEach($scope.todosApontamentos, function(value, key) {
				//value.ponto = new Date(value.ponto.replace(' ', 'T')+"-03:00");
			});

        })
        .error(function(response){
            alert("Erro!");
        });
    }

    $scope.deletar = function(id){
    	HomeService.deletar(id)
        .success(function(response, status){
        	buscarTodosApontamentos();
        	buscarApontamentosDoDia();
        	console.info("sucesso");
        })
        .error(function(response){
            alert("Erro!");
        });
    }

    $scope.mudarTela = function(tela){
    	//console.info("mudar..." + tela);
    	$scope.tela = tela;

    	if(tela==2){
    		buscarApontamentosDoDia();
    	}

        if(tela==3){
            buscarTodosApontamentos();
        }
    }

	$scope.sair = function(){
    	$window.location.href = "#login";
    }

    $scope.voltar = function(){
        $scope.mudarTela(3);
    }

    $scope.editar = function(entidade){
        $scope.entidadeSelecionada = entidade;
        $scope.entidadeSelecionada.ponto = $filter('date')($scope.entidadeSelecionada.ponto, "yyyy-MM-dd HH:m:s"); 
        $scope.mudarTela(4);
    }

    $scope.salvar = function(){
        HomeService.atualizar($scope.entidadeSelecionada)
        .success(function(response, status){
            console.info("sucesso");
            $scope.mudarTela(3);
        })
        .error(function(response){
            alert("Erro!");
        });
        
    }

    init = function() {
    	//buscarApontamentosDoDia();
    	buscarTodosApontamentos();
        //alert(new Date("2018-08-27 14:32:31".replace(' ', 'T')));
    };

	init();
}]);