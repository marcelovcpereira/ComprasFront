ComprasApp.controller( 'ProductController' ,
    function ProductController($scope,$http,$route,$routeParams,ProductFactory,BrandFactory){
        $scope.products = ProductFactory.query();
        $scope.successMessage = "";
        $scope.errorMessage = "";
        $scope.productEdited = $routeParams.productId? ProductFactory.get({id:$routeParams.productId},function() {
            $scope.editProductName = $scope.productEdited.name;
            $scope.editProductDescription = $scope.productEdited.description;
            $scope.editProductBarcode = $scope.productEdited.barcode;
            $scope.selectedBrandId = $scope.productEdited.brand.id;
            $scope.brands = BrandFactory.query(function(){
                var result = $.grep($scope.brands,function(e){ return e.id === $scope.selectedBrandId; });
                if (result.length == 1) {
                    $scope.selectedBrand = result[0];
                } else {
                    $scope.selectedBrand = $scope.brands[0];
                }
            });
        }) : null;
        if (jQuery.isEmptyObject($route.current.params)) {
            $scope.brands = BrandFactory.query();
        }

        $scope.addNewProduct = function() {
            var product = new ProductFactory({
                name:$scope.newProductName,
                description:$scope.newProductDescription,
                brand:$scope.newProductBrand.id,
                barcode:$scope.newProductBarcode
            });
            product.$save(function(result){
                $scope.hideMessages();
                $scope.successMessage = "Product (" + result.id + ") created: " + result.name;
                $("#successMessage").show();
            }, function(result){
                $scope.errorMessage = "ERRO(" + result.status + "): " + result.data.error;
                $("#errorMessage").show();
            });
        }

        $scope.hideMessages = function() {
            $("#successMessage").hide();
            $("#errorMessage").hide();
        }

        $scope.deleteProduct = function(product) {
            var id = product.id;
            product.$delete(function(result){
                $scope.successMessage = "Product " + id + " deleted.";
                $("#successMessage").show();
                $scope.products = ProductFactory.query();
            }, function(result){
                $scope.errorMessage = result.error;
                $("#errorMessage").show();
            });
        }

        $scope.updateProduct = function() {
             $scope.productEdited.name = $scope.editProductName;
             $scope.productEdited.description = $scope.editProductDescription;
             $scope.productEdited.brand = $scope.selectedBrand.id;
             $scope.productEdited.barcode = $scope.editProductBarcode;
             $scope.productEdited.$update(function(result){
                $scope.successMessage = "Product " + result.id + " updated.";
                $("#successMessage").show();
             }, function(result){
                $scope.errorMessage = "ERROR(" + result.status + "): " . result.data.error;
                $("#errorMessage").show();
             });
        }
});