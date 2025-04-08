// controller/Cart.controller.js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("starwarsfront.controller.Cart", {
        onInit: function () {
            this._loadCartItems();
        },
        
        _loadCartItems: function () {
            var oModel = this.getOwnerComponent().getModel();
            
            // Llamar a la función personalizada en el servicio CAP
            oModel.callFunction("/getCart", {
                method: "GET",
                success: function (oData) {
                    var aCartItems = oData.results || [];
                    
                    // Calcular el total
                    var fTotal = 0;
                    aCartItems.forEach(function(oItem) {
                        fTotal += oItem.quantity * oItem.variant.price;
                    });
                    
                    // Crear modelo local para el carrito
                    var oCartModel = new sap.ui.model.json.JSONModel({
                        items: aCartItems,
                        total: fTotal.toFixed(2)
                    });
                    
                    this.getView().setModel(oCartModel, "cart");
                }.bind(this),
                error: function (oError) {
                    MessageBox.error("Error al cargar los productos del carrito");
                }
            });
        },
        
        onQuantityChange: function (oEvent) {
            var oModel = this.getOwnerComponent().getModel();
            var iQuantity = oEvent.getParameter("value");
            var oItem = oEvent.getSource().getBindingContext("cart").getObject();
            
            // Llamar a la acción de actualizar
            oModel.callFunction("/updateCartItem", {
                method: "POST",
                urlParameters: {
                    cartItemId: oItem.id,
                    quantity: iQuantity
                },
                success: function () {
                    MessageToast.show("Cantidad actualizada");
                    this._loadCartItems(); // Recargar para actualizar totales
                }.bind(this),
                error: function () {
                    MessageBox.error("Error al actualizar la cantidad");
                }
            });
        },
        
        onDeleteCartItem: function (oEvent) {
            var oModel = this.getOwnerComponent().getModel();
            var oItem = oEvent.getParameter("listItem").getBindingContext("cart").getObject();
            
            // Llamar a la acción de eliminar
            oModel.callFunction("/removeFromCart", {
                method: "POST",
                urlParameters: {
                    cartItemId: oItem.id
                },
                success: function () {
                    MessageToast.show("Producto eliminado del carrito");
                    this._loadCartItems();
                }.bind(this),
                error: function () {
                    MessageBox.error("Error al eliminar el producto del carrito");
                }
            });
        },
        
        onCheckout: function () {
            // Aquí implementarías el proceso de checkout
            MessageBox.information("Funcionalidad de checkout en desarrollo");
        },
        
        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("catalog");
        }
    });
});