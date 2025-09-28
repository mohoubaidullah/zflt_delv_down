var objVar = {
	currentUser: "",
	RequestId: "",
	allowSubmit: false
};
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessagePopover",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
	"sap/ui/model/json/JSONModel"
], function (Controller, Fragment, Filter, MessagePopover, MessageBox, FilterOperator, MessageToast, SimpleType, ValidateException,
	JSONModel) {
	"use strict";

	return Controller.extend("fleet.zflt_delv_down.controller.View1", {
		onInit: function () {
			this._wizard = this.byId("CreateDocumentWizard");
			var oMessageManager, oView;
			if (window.sap.ushell && window.sap.ushell.Container) {
				objVar.currentUser = window.sap.ushell.Container.getUser().getId();
			}
			oView = this.getView();
			oMessageManager = sap.ui.getCore().getMessageManager();
			oView.setModel(oMessageManager.getMessageModel(), "message");
			var string = "";
			var complete_url = window.location.href;
			var onView = {};
			onView = {
				generalMsg: "Please review vechile details",
				docRequiredMsg: "Please review uploaded documents",
				docImageMsg: "Please review uploaded images of vechile",
				idVehicleId: true,
				idfileUploaderIshtimarah: false,
				idfileUploaderInsurance: false,
				idfileUploaderMOTCard: false,
				idfileUploaderMVPIDocument: false,
				idfileUploaderSASOCertificate: false,
				idButtonUpload: false,
				idfileIshtimarah: false,
				idfileInsurance: false,
				idfileMOTCard: false,
				idfileMVPIDocument: false,
				idfileSASOCertificate: false,
				onSave: false

			};
			var that = this;
			this.oLocalModel = new sap.ui.model.json.JSONModel(onView);
			this.oLocalModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			oView.setModel(this.oLocalModel, "localModel");
			if (objVar.currentUser !== "") {
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/FleetUploadRoleSet('" + objVar.currentUser + "')";

				oModel.read(sPath, {
					success: function (oData, response) {
						var oModel3 = new sap.ui.model.json.JSONModel(oData);
						if (oData.IsAllowed === true) {
							that.getView().getModel("localModel").setProperty("/idfileUploaderIshtimarah", true);
							that.getView().getModel("localModel").setProperty("/idfileUploaderInsurance", true);
							that.getView().getModel("localModel").setProperty("/idfileUploaderMOTCard", true);
							that.getView().getModel("localModel").setProperty("/idfileUploaderMVPIDocument", true);
							that.getView().getModel("localModel").setProperty("/idfileUploaderSASOCertificate", true);
							that.getView().getModel("localModel").setProperty("/idButtonUpload", true);

						}
					},
					error: function () {}
				});
			}
		},
		openRightBtn: function (oEvent) {
			var Zftype = 'RIM';
			this.openDocument(oEvent, Zftype);
		},
		openLeftBtn: function (oEvent) {
			var Zftype = 'LIM';
			this.openDocument(oEvent, Zftype);
		},
		openFrontBtn: function (oEvent) {
			var Zftype = 'FIM';
			this.openDocument(oEvent, Zftype);
		},
		openBackBtn: function (oEvent) {
			var Zftype = 'BIM';
			this.openDocument(oEvent, Zftype);
		},
		onSave: function (oEvent) {

			var oModel = this.getOwnerComponent().getModel();
			var VehicleId = this.getView().byId("idVehicleId").getValue();
			var VehicleNo = this.getView().byId("idVehicleNo").getText();

			var that = this;
			this.getView().byId("idVehicleId").setEditable(false);
			//this.getView().byId('_id_wizard').invalidateStep(this.byId("_id_wizStp3");
			this._wizard.validateStep(this.byId("idDelvTruckDet"));
			this._wizard.invalidateStep(this.byId("idAttach"));

			// that._wizard.validateStep(that.byId("idCredit"));

			//var Pernr = id;
			//Ztempid = "'" + this.zrecord + "'";
			objVar.VehicleId = VehicleId;

			if (VehicleId && VehicleId !== "") {

				var myFilter = new sap.ui.model.Filter("Equnr", sap.ui.model.FilterOperator.EQ, (VehicleId));
				// filter.push(myFilter);
				oModel.read("/FleetDocumentsSet", {
					filters: [myFilter],
					success: function (oData, response) {
						for (var i = 0; i < oData.results.length; i++) {
							var obj = oData.results[i];
							switch (obj.DocType) {
							case "ISH":
								that.getView().getModel("localModel").setProperty("/idfileIshtimarah", true);

								that.getView().byId("idfileIshtimarah").setText(obj.Filename);

								break;
							case "INS":
								that.getView().getModel("localModel").setProperty("/idfileInsurance", true);

								that.getView().byId("idfileInsurance").setText(obj.Filename);
								break;
							case "MOT":
								that.getView().getModel("localModel").setProperty("/idfileMOTCard", true);
								that.getView().byId("idfileMOTCard").setText(obj.Filename);
								break;
							case "MVPI":
								that.getView().getModel("localModel").setProperty("/idfileMVPIDocument", true);
								that.getView().byId("idfileMVPIDocument").setText(obj.Filename);
								break;
							case "SASO":
								that.getView().getModel("localModel").setProperty("/idfileSASOCertificate", true);
								that.getView().byId("idfileSASOCertificate").setText(obj.Filename);
								break;
								// case "SHOPLICENSE":
								// 	that.getView().getModel("localModel").setProperty("/idfileLicense", true);
								// 	that.getView().byId("idfileLicense").setText(obj.Filename);
								// 	break;
								// case "PROMISSORY":
								// 	that.getView().getModel("localModel").setProperty("/idfilePromissory", true);
								// 	that.getView().byId("idfilePromissory").setText(obj.Filename);
								// 	break;
								// case "CREDITACC":
								// 	that.getView().getModel("localModel").setProperty("/idfileCreditAcc", true);
								// 	that.getView().byId("idfileCreditAcc").setText(obj.Filename);
								// 	break;
								// case "GUARANTEE":
								// 	that.getView().getModel("localModel").setProperty("/idfileBankLetter", true);
								// 	that.getView().byId("idfileBankLetter").setText(obj.Filename);
								// 	break;
								// case "AGING":
								// 	that.getView().getModel("localModel").setProperty("/idfileAgingReport", true);
								// 	that.getView().byId("idfileAgingReport").setText(obj.Filename);
								// 	break;
								// case "SEMA":
								// 	that.getView().getModel("localModel").setProperty("/idfileSEMAReport", true);
								// that.getView().byId("idfileSEMAReport").setText(obj.Filename);
								// break;
							}
						}
					},
					error: function (oError) {
						console.log(oError);
					}
				});

			} else {
				that.getView().getModel("localModel").setProperty("/idButtonUpload", false);
			}

		},

		onValueHelpSearchCust: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("VechileID", FilterOperator.Contains, sValue);
			//var oFilter2 = new Filter("Name", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		onValueHelpRequestCust: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView1 = this.getView();

			this.inputId1 = oEvent.getSource().getId();

			if (!this._valueHelpDialogCust) {
				this._valueHelpDialogCust = sap.ui.xmlfragment(
					"fleet.zflt_delv_down.fragments.ValueHelpDialogCust",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCust);
			}
			this._valueHelpDialogCust.getBinding("items").filter([new Filter(
				"VechileID",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCust.open(sInputValue);
		},
		onValueHelpCloseCust: function (oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}

			this.byId("idVehicleId").setValue(oSelectedItem.getTitle());
			this.byId("idVehicleNo").setText(oSelectedItem.getDescription());

			var so = oSelectedItem.getTitle();
			if (so === "") {
				this.getView().byId("idVehicleId").setValueState(sap.ui.core.ValueState.Error);
				//this._wizard.invalidateStep(this.byId("idCustomerDet"));
			} else {
				this.getView().byId("idVehicleId").setValueState(sap.ui.core.ValueState.None);

			}
		},
		viewImage: function (evt) {
			var obtn = evt.getSource();
			//now you have access to the respective button
			var customData = obtn.getCustomData()[0].getValue();
			// sap.m.MessageToast.show("button Clicked:" + customData)
			if (!this.displayContent) {
				this.displayContent = sap.ui.xmlfragment("fleet.zflt_delv_down.fragments.filepreview", this);
				this.getView().addDependent(this.displayContent);
			}
			sap.ui.getCore().byId("idPdfViewer").setVisible(false);
			sap.ui.getCore().byId("image").setVisible(true);
			sap.ui.getCore().byId("image").setSrc(customData);
			this.displayContent.open();

		},
		onEnterVechile: function () {
			var VehicleId = this.getView().byId("idVehicleId").getValue();

			if (VehicleId !== "") {
				var that = this;
				var btnHandler = function (evt) {
					that.viewImage(evt);
				};
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/VehicleDetails3Set('" + VehicleId + "')";

				oModel.read(sPath, {
					success: function (oData, response) {

						var oModel3 = new sap.ui.model.json.JSONModel(oData);

						var osf = that.getView().byId("SimpleFormChange354");
						// var osf2 = that.getView().byId("SimpleFormChange351");
						osf.setModel(oModel3);
						if (oData.VehicleCc !== "") {
							that.getView().getModel("localModel").setProperty("/onSave", true);
						}
						var oModelDoc = that.getOwnerComponent().getModel();

						var myFilter = new sap.ui.model.Filter("FleetId", sap.ui.model.FilterOperator.EQ, (VehicleId));
						oModelDoc.read("/FleetReqDocumentsSet", {
							filters: [myFilter],
							success: function (oDataImages, response1) {
								debugger;
								var oDataImagesData = new sap.ui.model.json.JSONModel(oDataImages);
								// oDataImagesData.setData(oDataImages);
								that.getView().setModel(oDataImagesData, "imagesButton");
								var oPanelLeft = that.getView().byId("idFleetImagesLeft");
								var oPanelRight = that.getView().byId("idFleetImagesRight");
								var oPanelFront = that.getView().byId("idFleetImagesFront");
								var oPanelBack = that.getView().byId("idFleetImagesBack");
								var oImages = [];
								oImages = oDataImages.results;
								for (let i = 0; i < oImages.length; i++) {
									let image = oImages[i];
									let name = "";
									if (image.AwsFileName !== "") {
										name = image.Zdate.toLocaleDateString();
										// value: "/fleet/"+image.AwsFileName 
										let oButton = new sap.m.Button({
												id: image.AwsFileName,
												text: name,
												type: "Accept",
												press: btnHandler,
												customData: new sap.ui.core.CustomData({
													key: "AwsFilePath",
													value: image.AwsFilePath

												})
											})
											// oPanel.addContent(oButton);
										if (image.DocType === "RIM") {
											oPanelRight.addContent(oButton);
										} else if (image.DocType === "BIM") {
											oPanelBack.addContent(oButton);
										} else if (image.DocType === "LIM") {
											oPanelLeft.addContent(oButton);
										} else if (image.DocType === "FIM") {
											oPanelFront.addContent(oButton);
										}
									}
								}
							},
							error: function () {
								sap.m.MessageToast.show("No Data retreived");
							}
						});
						// osf2.setModel(oModel3);
						// if (oData.Error !== "") {
						// 	that.getView().getModel("localModel").setProperty("/idRequestId", true);
						// } else {
						// 	that.getView().getModel("localModel").setProperty("/idRequestId", false);
						// }

						// if (oData.CustomerTypeNew !== "") {
						// 	that.onChangeCustType("OnLoad");
						// }
						// if (oData.ZtermNew !== "") {
						// 	that.onChangePayTerm("NO_WARNING");
						// }
					},
					error: function () {
						that.getView().byId("idVehicleNo").setText("");
						that.getView().byId("idVehicleText").setText("");
						that.getView().byId("idVehicleLocId").setText("");
						that.getView().byId("idVehicleLoc").setText("");
						that.getView().byId("idVehiclePlant").setText("");
						that.getView().byId("idVehicleVendor").setText("");
						that.getView().byId("idVehicleCc").setText("");

						sap.m.MessageToast.show("No Data retreived");
					}

				});

			}
		},

		//***************************************************************************************************************************************************************************		
		handleUploadFiles: function (oEvent) {
			var vechileId = this.getView().byId("idVehicleId").getValue();
			var oFileUploader = " ";
			if (vechileId !== "") {
				//shop licesnse
				oFileUploader = this.getView().byId("idfileUploaderIshtimarah");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameLicense = file.name;
					this.filetypeLicense = file.type;
					this.getView().byId("idfileUploaderIshtimarah").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//	var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//		"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeLicense + ";base64,", "");
						//that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "SHOPLICENSE");
						var oDataModelISH = that.getView().getModel();
						var payLoad = {
							"Equnr": vechileId,
							"DocType": "ISH",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameLicense,
							"Filetype": that.filetypeLicense

						};
						oDataModelISH.create("/FleetDocumentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//Guarantee
				oFileUploader = this.getView().byId("idfileUploaderInsurance");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameGuarantee = file.name;
					this.filetypeGuarantee = file.type;
					this.getView().byId("idfileUploaderInsurance").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeGuarantee + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModelINS = that.getView().getModel();
						var payLoad = {
							"Equnr": vechileId,
							"DocType": "INS",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameGuarantee,
							"Filetype": that.filetypeGuarantee

						};
						oDataModelINS.create("/FleetDocumentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//VAT
				oFileUploader = this.getView().byId("idfileUploaderMOTCard");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {

					this.filenameVAT = file.name;
					this.filetypeVAT = file.type;
					var that = this;
					this.getView().byId("idfileUploaderMOTCard").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						// var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						// 	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeVAT + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModelMOT = that.getView().getModel();
						var payLoad = {
							"Equnr": vechileId,
							"DocType": "MOT",
							// "Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameVAT,
							"Filetype": that.filetypeVAT

						};
						oDataModelMOT.create("/FleetDocumentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//Agency
				oFileUploader = this.getView().byId("idfileUploaderMVPIDocument");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameAgency = file.name;
					this.filetypeAgency = file.type;
					this.getView().byId("idfileUploaderMVPIDocument").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//	"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeAgency + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModelMVPI = that.getView().getModel();
						var payLoad = {
							"Equnr": vechileId,
							"DocType": "MVPI",
							//"Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameAgency,
							"Filetype": that.filetypeAgency

						};
						oDataModelMVPI.create("/FleetDocumentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//Bank stmt
				oFileUploader = this.getView().byId("idfileUploaderSASOCertificate");
				//if (oFileUploader !== "") {
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameBankStmt = file.name;
					this.filetypeBankStmt = file.type;
					this.getView().byId("idfileUploaderSASOCertificate").setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						/*	var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
								"");*/
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeBankStmt + ";base64,", "");
						//	that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "GUARANTEE");
						var oDataModelSASO = that.getView().getModel();
						var payLoad = {
							"Equnr": vechileId,
							"DocType": "SASO",
							// "Content": btoa(vContent),
							"Content": vContent,
							"Filename": that.filenameBankStmt,
							"Filetype": that.filetypeBankStmt

						};
						oDataModelSASO.create("/FleetDocumentsSet", payLoad, {
							success: function (oEvent) {
								sap.m.MessageToast.show("Success");
							},
							error: function (oError) {
								sap.m.MessageToast.show("error");
							}
						});
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}

				//at last
				var ishtimarah = this.getView().byId("idfileUploaderIshtimarah").getValueState();
				var insurance = this.getView().byId("idfileUploaderInsurance").getValueState();
				var mot = this.getView().byId("idfileUploaderMOTCard").getValueState();
				var mvpi = this.getView().byId("idfileUploaderMVPIDocument").getValueState();
				var saso = this.getView().byId("idfileUploaderSASOCertificate").getValueState();

				if (ishtimarah !== "Error" && insurance !== "Error" && mot !== "Error" && mvpi !== "Error" && saso !== "Error") {
					this._wizard.validateStep(this.byId("idAttach"));
				} else {
					objVar.zmsg = "Please upload all highlighted documents !";
					sap.m.MessageBox.alert(
						objVar.zmsg, {
							onClose: function (oAction) {
								//	window.print();

							}
						});
				}
				this._wizard.validateStep(this.byId("idAttach"));
			} else {
				//show message
				objVar.zmsg = "Vechile ID not created !";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			}

		},
		//***************************************************************************************************************************************************************************		

		wizardCompletedHandler: function (oEvent) {

			var that = this;

			var oModel = that.getOwnerComponent().getModel();
			var RequestId = this.getView().byId("idVehicleId").getValue();
			if (RequestId !== "" || RequestId !== null) {
				// if (false) {
				MessageToast.show("Successfuly Digitally Signed.", {
					duration: 9000, // default
					width: "30em", // default
					my: "center center", // default
					at: "center center", // default
					of: window, // default
					offset: "0 0", // default
					collision: "fit fit", // default
					onClose: null, // default
					autoClose: true, // default
					animationTimingFunction: "ease", // default
					animationDuration: 1000, // default
					closeOnBrowserNavigation: true // default
				});
				var oWizardStep = oEvent.getSource();
				oWizardStep.setVisible(false);
			} else {
				MessageToast.show("Error while Singing request. Please Try again.", {
					duration: 9000, // default
					width: "30em", // default
					my: "center center", // default
					at: "center center", // default
					of: window, // default
					offset: "0 0", // default
					collision: "fit fit", // default
					onClose: null, // default
					autoClose: true, // default
					animationTimingFunction: "ease", // default
					animationDuration: 1000, // default
					closeOnBrowserNavigation: true // default
				});
			}
			// } else {
			// 	objVar.zmsg = "Vechile ID not created !";
			// 	sap.m.MessageBox.alert(
			// 		objVar.zmsg, {
			// 			onClose: function (oAction) {
			// 				//	window.print();

			// 			}
			// 		});
			// }

		},
		handleWizardCancel: function () {
			location.reload();
		},
		openIshtimarahFile: function (oEvent) {

			var Zftype = 'ISH';
			this.openDocument(oEvent, Zftype);

		},
		openInsuranceFile: function (oEvent) {

			var Zftype = 'INS';
			this.openDocument(oEvent, Zftype);

		},
		openMOTCard: function (oEvent) {

			var Zftype = 'MOT';
			this.openDocument(oEvent, Zftype);

		},
		openMVPIDocument: function (oEvent) {

			var Zftype = 'MVPI';
			this.openDocument(oEvent, Zftype);

		},
		openSASOCertificateFile: function (oEvent) {

			var Zftype = 'SASO';
			this.openDocument(oEvent, Zftype);

		},
		openDocument: function (oEvent, Zftype) {
			var requestId = this.getView().byId("idVehicleId").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/FleetDocumentsSet(Equnr=" + "'" + requestId + "'" + ",DocType=" + "'" + Zftype + "'" + ",DocSeq='')";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.Filetype;
						var fName = oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("fleet.zflt_delv_down.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		handleFile: function (oEvent) {
			//var oFileUploader  = this.getView().byId("idfileUploaderVAT");
			//var oFileSize =  oFileUploader.getSize();
			sap.m.MessageToast.show("File Size exceeds 1 MB Size, Please uploade below 1 MB File");
		},
		onPressBarCloseBtn: function (oEvent) {
			this.displayContent.close();
			this.fragOpen = undefined;
		}
	});
});