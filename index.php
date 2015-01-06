<!DOCTYPE html>
<html lang="en" ng-app="ComprasApp">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="author" content="Marcelo Pereira">
        <title>Compras - MVCP</title>
    </head>
    <body>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
        <ng-view></ng-view>
        <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>-->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular-route.min.js"></script>
        <script>
                var ComprasApp = angular.module('ComprasApp', ['ngRoute']);
                ComprasApp.controller("BrandController", function($scope,$http){
                     $scope.brands = {};
                     $scope.serverMessage = "";
                     $http.get("http://localhost/projetos/Compras2/api/v1/brands/json")
                     .success(function(data,status,headers,config){
                        $scope.brands = data;
                     })
                     .error(function(data,status,headers,config){
                        $scope.brands = ['Heineken','Stella Artois','Karavelle'];
                     });

                     $scope.addNewBrand = function() {
                        var newBrand = {name: this.brandName};
                        var that = this;
                        $http.post("http://localhost/projetos/Compras2/api/v1/brands/json",newBrand)
                        .success(function(data,status){
                            if ( status == "201" ) {
                                that.serverMessage = "New brand added: " + data.name;
                            } else {
                                that.serverMessage = "Unkown error";
                            }
                        })
                        .error(function(data){
                            that.serverMessage = "Error creating brand: " + data.error;
                        });
                        
                     }
                });

                ComprasApp.config(function($routeProvider){
                    $routeProvider
                        .when( '/brands' , {
                            controller: 'BrandController',
                            templateUrl: 'templates/home.html'
                        })
                        .when( '/brands/new' , {
                            controller: 'BrandController',
                            templateUrl: 'templates/newBrand.html'
                        })
                        .otherwise({ redirectTo: '/brands' });
                });
        </script>
    </body>
</html>