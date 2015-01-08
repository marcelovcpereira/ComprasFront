ComprasApp.controller( 'NavbarController' , 
    function NavbarController($scope,$location) {
        $scope.gotoBrands = function() {
            $location.path('/brands');
        }

        $scope.gotoAddBrand = function() {
        	$location.path('/brands/new');
        }

        $scope.gotoProducts = function() {
        	$location.path('/products');
        }
    }
);