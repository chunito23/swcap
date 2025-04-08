sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
  
    return Controller.extend("starwarsfront.controller.Catalog", {
      onInit: function () {
        var oModel = this.getOwnerComponent().getModel();
  
        // Cargar todas las categorías
        oModel.read("/Categories", {
          success: function (oData) {
            var oCatModel = new JSONModel(oData.results);
            this.getView().setModel(oCatModel, "categories");
          }.bind(this),
          error: function (err) {
            console.error("Error cargando categorías", err);
          }
        });
  
        // Cargar todos los productos al inicio
        this._loadProducts();
      },
  
      _loadProducts: function (aFilters) {
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/Products", {
          filters: aFilters || [],
          success: function (oData) {
            this.getView().setModel(new JSONModel(oData.results), "allProducts");
          }.bind(this),
          error: function (err) {
            console.error("Error cargando productos", err);
          }
        });
      },
  
      onCategorySelect: function (oEvent) {
        var sCategoryId = oEvent.getParameter("listItem")
                              .getBindingContext("categories")
                              .getProperty("id");
  
        // Filtro: subcategory/category/id eq 'sCategoryId'
        var oFilter = new Filter("subcategory/category/id", FilterOperator.EQ, sCategoryId);
        this._loadProducts([oFilter]);
      },
  
      onProductPress: function (oEvent) {
        var oContext = oEvent.getSource().getBindingContext("allProducts");
        var sProductId = oContext.getProperty("id");
        this.getOwnerComponent().getRouter().navTo("ProductDetail", { productId: sProductId });
      }
    });
  });
  