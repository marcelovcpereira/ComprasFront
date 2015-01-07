ComprasApp.controller( 'BrandController' , 
    function BrandController($scope,$http,BrandFactory){
        $scope.brands = BrandFactory.query();
        $scope.serverMessage = "";

        $scope.addNewBrand = function() {
            var newBrand = new BrandFactory({name: this.brandName});
            newBrand.$save(function(created,status){
                if (created.$resolved == true ) {
                    $scope.serverMessage = "New brand added: " + created.name;
                } else {
                    $scope.serverMessage = "Error creating brand.";
                }
            },function(result){
                var status = result.status;
                $scope.serverMessage = result.data.error + " (" + status + ")";
            });
        }

        $scope.deleteBrand = function(brand) {
            brand.$delete(function(result){
                alert(JSON.stringify(result));
            });
        }
});