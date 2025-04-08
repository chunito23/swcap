sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("starwarsfront.controller.", {
        onInit() {
        },

        onpress:function(){
            console.log("hola")
            const oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo("catalog")
        }
    });
});