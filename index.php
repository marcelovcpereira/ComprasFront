<!DOCTYPE html>
<html lang="en" ng-app="ComprasApp">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="author" content="Marcelo Pereira">
        <title>Compras - MVCP</title>
    </head>
    <body>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/comprasFront.css">

        <!-- NAVBAR -->
        <div class="container">
            <nav class="nav navbar-default" ng-controller="NavbarController">
                <div class="container-fluid">
                    <ul>
                        <li><a href="" ng-click="gotoBrands()">Brands</a></li> |
                        <li><a href="" ng-click="gotoAddBrand()">Add Brand</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <!-- NAVBAR -->

        <div class="container"><ng-view></ng-view></div>
        <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>-->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular-route.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular-resource.min.js"></script>
        <script>
                var ComprasApp = angular.module('ComprasApp', ['ngRoute','ngResource']);

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
        <script src="directives/ng-really.js"></script>
        <script src="services/brandFactory.js"></script>
        <script src="controllers/brandController.js"></script>
        <script src="controllers/navbarController.js"></script>
    </body>
</html>