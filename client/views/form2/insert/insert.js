var pageSession = new ReactiveDict();

Template.Form2Insert.onCreated(function() {
	
});

Template.Form2Insert.onDestroyed(function() {
	
});

Template.Form2Insert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form2Insert.events({
	
});

Template.Form2Insert.helpers({
	
});

Template.Form2InsertInsertForm.onCreated(function() {
	
});

Template.Form2InsertInsertForm.onDestroyed(function() {
	
});

Template.Form2InsertInsertForm.onRendered(function() {
	

	pageSession.set("form2InsertInsertFormInfoMessage", "");
	pageSession.set("form2InsertInsertFormErrorMessage", "");

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

Template.Form2InsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form2InsertInsertFormInfoMessage", "");
		pageSession.set("form2InsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form2InsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(form2InsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form2InsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("form2.details", mergeObjects(Router.currentRouteParams(), {invoiceId: result}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form2InsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("invoicesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.Form2InsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form2InsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form2InsertInsertFormErrorMessage");
	}
	
});
