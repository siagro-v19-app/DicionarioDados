sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",	
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageToast, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("br.com.idxtecDicionarioDados.controller.App", {

		onInit: function(){
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			oModel.attachMetadataLoaded(function() {
				that._processaMetadata();
			});
		},
		
		_processaMetadata: function() {
			var oModel = this.getOwnerComponent().getModel();
			var oMeta = oModel.getServiceMetadata();
			
			var schema = oMeta.dataServices.schema[0];
			var oJSONModel = new JSONModel();
			oJSONModel.setData(schema);
			
			this.getView().byId("table").setModel(oJSONModel,"model");
		},
		
		handleFilter: function(oEvent) {
			var sQuery = oEvent.getParameter("query");
			var aFilter = [];
			if (sQuery) {
				aFilter.push(new Filter("model>name", FilterOperator.Contains, sQuery));
			}
				
			this.getView().byId("table").getBinding("rows").filter(aFilter, "Application");
		}
		
	});
});