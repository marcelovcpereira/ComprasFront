ComprasApp.controller( 'BrandController' ,
    function BrandController($scope,$http,$route,$routeParams,BrandFactory){
        $scope.brands = BrandFactory.query();
        $scope.successMessage = "";
        $scope.errorMessage = "";
        $scope.editBrandName = "";
        $scope.brandEdited = BrandFactory.get({id:$routeParams.id},function(){
            $scope.editBrandName = $scope.brandEdited.name;
        });

        $scope.addNewBrand = function() {
            this.hideMessages();
            var newBrand = new BrandFactory({name: this.brandName});
            newBrand.$save(function(created,status){
                if (created.$resolved == true ) {
                    $scope.successMessage = "New brand added: " + created.name;
                    $("#successMessage").show();
                } else {
                    $scope.errorMessage = "Error creating brand.";
                    $("#errorMessage").show();
                }
            },function(result){
                var status = result.status;
                $scope.errorMessage = result.data.error + " (" + status + ")";
                $("#errorMessage").show();
            });
        }

        $scope.hideMessages = function() {
            $("#successMessage").hide();
            $("#errorMessage").hide();
        }

        $scope.deleteBrand = function() {
            this.hideMessages();
            brand.$delete(function(result){
                $scope.successMessage = result.message;
                $("#successMessage").show();
                $scope.brands = BrandFactory.query();
            }, function(result){
                $scope.errorMessage = result.error;
                $("#errorMessage").show();
            });
        }

        $scope.updateBrand = function() {
            $scope.brandEdited.name = $scope.editBrandName;
            $scope.brandEdited.$update(function(result){
                $scope.successMessage = JSON.stringify(result);
                $("#successMessage").show();
            }, function(result){
                $scope.errorMessage = JSON.stringify(result);
                $("#errorMessage").show();
            });
        }
});