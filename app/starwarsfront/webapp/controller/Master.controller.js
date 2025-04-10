sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function(Controller) {
    "use strict";
  
    return Controller.extend("starwarsfront.controller.Master", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
          },

    
        CategoryPress: function(oEvent) {
        var oItem = oEvent.getParameter("listItem"); // Esta es la forma correcta
        var oCtx = oItem.getBindingContext();
        console.log(oItem)
        console.log(oCtx)
        if (oCtx) {
          var sCategoryId = oCtx.getProperty("id");
          console.log(sCategoryId)
          this.oRouter.navTo("category", {
            categoryId: sCategoryId
          });
        } else {
          console.warn("No se pudo obtener el binding context del item seleccionado.");
        }
      }
      
    });
  });
  