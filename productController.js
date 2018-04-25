angular.module("productitemProduct").controller("productController", function ($scope, $http) {

    $scope.products = [];
    var prodId;
    var localprodId;
    var localProductId;
    var localEditCost;
    var localEditMeasurementId;
    var localEditDiscontinued;
    
   //to get the original product items. 

    

    $scope.init = function () {
        $http.get("http://localhost:8970/api/ProductItem/")
            .success(function (response) {
                $scope.products = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };
    //to choose the specific product item based on id. 
    $scope.productEdit = function (prodId) {
        $scope.isUpdatingProduct = true;
        $http.get("http://localhost:8970/api/ProductItem/" + prodId)
            .success(function (response) {
                localprodId = response.ProductItemId;
                localProductId = response.ProductId;
            //  $scope.editProduct = response.Product;
                localEditCost = response.Cost;
                localEditMeasurementId = response.MeasurementId;
            //  $scope.editMeasurementName = response.MeasurementName;
                localEditDiscontinued = response.Discontinued;
                $scope.editQuantity = response.StockQty;
                
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    };

   //to put the data into the database based on updating the stock quantity. 

    $scope.edit = function () {
        
        var editProductItem = {
            ProductItemId: localprodId,
            ProductId: localProductId,
            Cost: localEditCost,
            MeasurementId: localEditMeasurementId, 
            Discontinued: localEditDiscontinued,
            StockQty: $scope.editQuantity
        };
        
        $http.put("http://localhost:8970/api/ProductItem/", editProductItem)
            .success(function () {
                $scope.isUpdatingProduct=false;
                $scope.init();
            })
              .error(function (error) {
               $scope.errorMessage = error;
            });

    };

    $scope.init();
    
    $scope.cancelAddition = function () {
        $scope.isEditing = false;
        $scope.productName = "";
    };

});