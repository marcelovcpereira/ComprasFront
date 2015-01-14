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
        .when( '/brands/:brandId/edit' , {
            controller: 'BrandController',
            templateUrl: 'templates/editBrand.html'
        })
        .when( '/products' , {
            controller: 'ProductController',
            templateUrl: 'templates/listProducts.html'
        })
        .when( '/products/new' , {
            controller: 'ProductController',
            templateUrl: 'templates/newProduct.html'
        })
        .when( '/products/:productId/edit' , {
            controller: 'ProductController',
            templateUrl: 'templates/editProduct.html'
        })
        .otherwise({ redirectTo: '/brands' });
});