var pageSession = new ReactiveDict();

Template.Form2Edit.onCreated(function() {
	
});

Template.Form2Edit.onDestroyed(function() {
	
});

Template.Form2Edit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form2Edit.events({
	
});

Template.Form2Edit.helpers({
	
});

Template.Form2EditEditForm.onCreated(function() {
	
});

Template.Form2EditEditForm.onDestroyed(function() {
	
});

Template.Form2EditEditForm.onRendered(function() {
	

	pageSession.set("form2EditEditFormInfoMessage", "");
	pageSession.set("form2EditEditFormErrorMessage", "");

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

Template.Form2EditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form2EditEditFormInfoMessage", "");
		pageSession.set("form2EditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form2EditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(form2EditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form2EditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("form2", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form2EditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("invoicesUpdate", t.data.invoice_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("form2", mergeObjects(Router.currentRouteParams(), {}));
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

Template.Form2EditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form2EditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form2EditEditFormErrorMessage");
	}
	
});
