ComprasApp.factory( 'ProductFactory', function($resource) {
	return $resource(
		"http://localhost/projetos/Compras2/api/v1/products/json/:id",{id:"@barcode"}, {
            "update":{
                method:'PUT',
                params:{
                    id:""
                }
            },
            "save":{
                method: 'POST',
                params:{
                    id:""
                }
            }
        }
	);
});