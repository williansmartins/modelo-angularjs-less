angular
.module('controlei')
.factory('HomeService', HomeService);

function HomeService ($q, $window, $http) {
    return {

        apontar : function () {
            var dataAtual = new Date();
            var dataFormatada = dataAtual.format("YYYY-MM-DD HH:m:s");

            return $http({
                method : "POST",
                url : barramento + "/generic/apontamento",
                data: {
                    "created_at": dataFormatada,
                    "ponto": dataFormatada,
                    "descricao": "natural",
                }
            })
        },

        atualizar : function (entidade) {
            var dataAtual = new Date();
            var dataFormatada = dataAtual.format("YYYY-MM-DD HH:m:s");

            return $http({
                method : "PUT",
                url : barramento + "/generic/apontamento/" + entidade.id,
                data: {
                    "updated_at": dataFormatada,
                    "ponto": entidade.ponto
                }
            })
        },

        deletar : function (id) {
            return $http({
                method : "DELETE",
                url : barramento + "/generic/apontamento/"+id
            })
        },

        buscar : function () {
            return $http({
                method : "GET",
                url : barramento + "/generic/apontamento/"+id
            })
        },

        buscarApontamentosDoDia : function () {
        	var dataAtual = new Date();
            var dataFormatada = dataAtual.format("YYYY-MM-DD");

            return $http({
                method : "GET",
                url : barramento + "/generic/apontamento?filter[]=ponto,cs,"+dataFormatada+"&transform=1"
            })
        },

        buscarTodosApontamentos : function () {
            return $http({
                method : "GET",
                url : barramento + "/generic/apontamento?transform=1"
            })
        }
    };
}