var pageSession = new ReactiveDict();

Template.Form1Edit.onCreated(function() {
	
});

Template.Form1Edit.onDestroyed(function() {
	
});

Template.Form1Edit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form1Edit.events({
	
});

Template.Form1Edit.helpers({
	
});

Template.Form1EditEditForm.onCreated(function() {
	
});

Template.Form1EditEditForm.onDestroyed(function() {
	
});

Template.Form1EditEditForm.onRendered(function() {
	

	pageSession.set("form1EditEditFormInfoMessage", "");
	pageSession.set("form1EditEditFormErrorMessage", "");

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

Template.Form1EditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form1EditEditFormInfoMessage", "");
		pageSession.set("form1EditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form1EditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(form1EditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form1EditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("form1", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form1EditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("customersUpdate", t.data.customer_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("form1", mergeObjects(Router.currentRouteParams(), {}));
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

Template.Form1EditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form1EditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form1EditEditFormErrorMessage");
	}
	
});
