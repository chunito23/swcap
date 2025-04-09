sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
  ], function (Controller, UIComponent) {
    "use strict";
  
    return Controller.extend("starwarsfront.controller.BaseController", {
  
      /**
       * Devuelve el router para navegación.
       * @returns {sap.ui.core.routing.Router}
       */
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },
  
      /**
       * Devuelve el modelo del view.
       * @param {string} [sName] Nombre del modelo
       * @returns {sap.ui.model.Model}
       */
      getModel: function (sName) {
        return this.getView().getModel(sName);
      },
  
      /**
       * Asigna un modelo al view.
       * @param {sap.ui.model.Model} oModel El modelo
       * @param {string} [sName] Nombre del modelo
       */
      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },
  
      /**
       * Devuelve el recurso i18n bundle.
       * @returns {sap.ui.model.resource.ResourceModel}
       */
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },
  
      /**
       * Navegación hacia atrás, usando historial o fallback.
       */
      onNavBack: function () {
        const oHistory = sap.ui.core.routing.History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();
  
        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getRouter().navTo("list", {}, true);
        }
      }
  
    });
  });
  