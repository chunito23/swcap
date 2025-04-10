sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ], function(Controller, Filter, FilterOperator) {
    "use strict";
  
    return Controller.extend("starwarsfront.controller.Detail", {
      onInit: function() {

      },

      onSearch:function(oEvent){
        let aFilter = []
        let sQuery = oEvent.getParameter("query")
        if(sQuery){
          aFilter.push(new Filter("name",FilterOperator.Contains,sQuery))
        }

        let oList = this.byId("productList")
        let oBinding = oList.getBinding("items")
        oBinding.filter(aFilter)

      }

  
      
    });
  });