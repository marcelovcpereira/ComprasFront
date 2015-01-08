ComprasApp.controller( 'ProductController' ,
    function ProductController($scope,$http,$route,$routeParams,ProductFactory,BrandFactory){
        $scope.products = ProductFactory.query();
        $scope.successMessage = "";
        $scope.errorMessage = "";
        $scope.productEdited = $routeParams.productId? ProductFactory.get({id:$routeParams.productId},function() {
            $scope.editProductName = $scope.productEdited.name;
            $scope.editProductDescription = $scope.productEdited.description;
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



        $scope.addNewProduct = function() {
            
        }

        $scope.hideMessages = function() {
            $("#successMessage").hide();
            $("#errorMessage").hide();
        }

        $scope.deleteProduct = function(product) {
            $product.$delete(function(result){
                $scope.successMessage = "Product " + result.id + " deleted.";
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

             $scope.productEdited.$update(function(result){
                $scope.successMessage = "Product " + result.id + " updated.";
                $("#successMessage").show();
             }, function(result){
                $scope.errorMessage = JSON.stringify(result);
                $("#errorMessage").show();
             });
        }
});