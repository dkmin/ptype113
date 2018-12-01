var pageSession = new ReactiveDict();

Template.Form2DetailsEdit.onCreated(function() {
	
});

Template.Form2DetailsEdit.onDestroyed(function() {
	
});

Template.Form2DetailsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form2DetailsEdit.events({
	
});

Template.Form2DetailsEdit.helpers({
	
});

Template.Form2DetailsEditEditForm.onCreated(function() {
	
});

Template.Form2DetailsEditEditForm.onDestroyed(function() {
	
});

Template.Form2DetailsEditEditForm.onRendered(function() {
	

	pageSession.set("form2DetailsEditEditFormInfoMessage", "");
	pageSession.set("form2DetailsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.Form2DetailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form2DetailsEditEditFormInfoMessage", "");
		pageSession.set("form2DetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form2DetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(form2DetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form2DetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("form2.details", mergeObjects(Router.currentRouteParams(), {invoiceId: self.params.invoiceId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form2DetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("invoiceItemsUpdate", t.data.invoice_item._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("form2.details", mergeObjects(Router.currentRouteParams(), {invoiceId: this.params.invoiceId}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.Form2DetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form2DetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form2DetailsEditEditFormErrorMessage");
	}
	
});
