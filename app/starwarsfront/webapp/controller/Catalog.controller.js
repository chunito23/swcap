sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("starwarsfront.controller.Catalog", {
    onInit: function () {
      // Cargar categorías
      const oModel = this.getOwnerComponent().getModel();
      oModel.read("/Categories", {
        success: function (oData) {
          const oCatModel = new JSONModel(oData.results);
          this.getView().setModel(oCatModel, "categories");
        }.bind(this)
      });

      // Cargar productos
      this._loadProducts();
    },

    onProductPress:function(oEvent){
      


      let id = oEvent.getParameter()
      let oRouter = this.getOwnerComponent().getRouter()
      oRouter.navTo("")
    },

    ResetProducts: function () {
      // Limpiar el campo de búsqueda
      this.byId("searchField").setValue("");
      this._loadProducts();
    },

    onSearch: function (oEvent) {
      // Obtener el valor de búsqueda
      const sQuery = oEvent.getSource().getValue();
      
      // Crear filtro si hay un término de búsqueda
      let aFilters = [];
      if (sQuery && sQuery.trim() !== "") {
        aFilters.push(new Filter("name", FilterOperator.Contains, sQuery));
      }
      
      // Aplicar filtro al modelo local
      const oList = this.byId("productsList");
      const oBinding = oList.getBinding("items");
      oBinding.filter(aFilters);
    },

    _loadProducts: function (aFilters) {
      const oModel = this.getOwnerComponent().getModel();
      
      // Marcar la página como ocupada
      this.byId("productsPage").setBusy(true);
      
      oModel.read("/Products", {
        filters: aFilters || [],
        success: function (oData) {
          // Crear modelo de productos
          const oProductsModel = new JSONModel(oData.results);
          this.getView().setModel(oProductsModel, "products");
          
          // Desmarcar la página como ocupada
          this.byId("productsPage").setBusy(false);
        }.bind(this),
        error: function () {
          // Desmarcar la página como ocupada
          this.byId("productsPage").setBusy(false);
        }.bind(this)
      });
    },

    onCategorySelect: function (oEvent) {
      const oItem = oEvent.getParameter("listItem");
      
      if (!oItem) {
        return;
      }
      
      const oContext = oItem.getBindingContext("categories");
      if (!oContext) {
        return;
      }
      
      const sCategoryId = oContext.getProperty("id");
      const oFilter = new Filter("subcategory/category/id", FilterOperator.EQ, sCategoryId);
      this._loadProducts([oFilter]);
    },

    onProductPress: function (oEvent) {
      const oItem = oEvent.getSource();
      const sProductId = oItem.getBindingContext("products").getProperty("id");
      this.getOwnerComponent().getRouter().navTo("ProductDetail", { productId: sProductId });
    }
  });
});