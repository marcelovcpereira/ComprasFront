ComprasApp.factory( 'BrandFactory' , function($resource) {
    return $resource(
        "http://localhost/projetos/Compras2/api/v1/brands/json/:id",{id:"@id"}
    );
});