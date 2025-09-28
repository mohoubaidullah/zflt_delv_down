/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"fleet/zflt_delv_down/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});