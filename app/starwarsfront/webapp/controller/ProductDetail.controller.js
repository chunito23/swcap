// controller/ProductDetail.controller.js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, History, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("starwarsfront.controller.ProductDetail", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("ProductDetail").attachPatternMatched(this._onProductMatched, this);
        },
        
        _onProductMatched: function (oEvent) {
            var sProductId = oEvent.getParameter("arguments").productId;
            
            // Cargar datos del producto
            this._loadProductData(sProductId);
        },
        
        _loadProductData: function (sProductId) {
            var oModel = this.getOwnerComponent().getModel();
            var sPath = "/Products('" + sProductId + "')";
            
            oModel.read(sPath, {
                success: function (oData) {
                    var oProductModel = new sap.ui.model.json.JSONModel(oData);
                    this.getView().setModel(oProductModel, "product");
                    
                    // Cargar variantes
                    this._loadProductVariants(sProductId);
                }.bind(this),
                error: function () {
                    MessageBox.error("Error al cargar los detalles del producto");
                    this.onNavBack();
                }.bind(this)
            });
        },
        
        _loadProductVariants: function (sProductId) {
            var oModel = this.getOwnerComponent().getModel();
            var sPath = "/ProductVariants";
            var oFilter = new sap.ui.model.Filter("product_id", sap.ui.model.FilterOperator.EQ, sProductId);
            
            oModel.read(sPath, {
                filters: [oFilter],
                success: function (oData) {
                    var oVariantsModel = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oVariantsModel, "variants");
                    
                    // Seleccionar la primera variante por defecto
                    if (oData.results.length > 0) {
                        var oComboBox = this.byId("variantsComboBox");
                        oComboBox.setSelectedKey(oData.results[0].variantId);
                    }
                }.bind(this)
            });
        },
        
        onVariantSelect: function (oEvent) {
            var oSelectedVariant = oEvent.getParameter("selectedItem").getBindingContext("variants").getObject();
            var oQuantityInput = this.byId("quantityInput");
            
            // Actualizar máximo según stock de la variante
            oQuantityInput.setMax(oSelectedVariant.stock);
        },
        
        onAddToCart: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oProduct = this.getView().getModel("product").getData();
            var oVariantCombo = this.byId("variantsComboBox");
            var oQuantityInput = this.byId("quantityInput");
            
            var sVariantId = oVariantCombo.getSelectedKey();
            var iQuantity = oQuantityInput.getValue();
            
            if (!sVariantId) {
                MessageBox.error("Por favor, selecciona una variante");
                return;
            }
            
            // Llamar a la acción addToCart
            oModel.callFunction("/addToCart", {
                method: "POST",
                urlParameters: {
                    productId: oProduct.id,
                    variantId: sVariantId,
                    quantity: iQuantity
                },
                success: function () {
                    MessageToast.show("Producto añadido al carrito");
                },
                error: function (oError) {
                    MessageBox.error("Error al añadir al carrito: " + oError.message);
                }
            });
        },
        
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("catalog", {}, true);
            }
        }
    });
});