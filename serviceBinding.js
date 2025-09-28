function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZGBC_FLEET_PROCESS_DLT_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}