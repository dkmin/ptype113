var pageSession = new ReactiveDict();

Template.Form2Details.onCreated(function() {
	
});

Template.Form2Details.onDestroyed(function() {
	
});

Template.Form2Details.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form2Details.events({
	
});

Template.Form2Details.helpers({
	
});

Template.Form2DetailsDetailsForm.onCreated(function() {
	
});

Template.Form2DetailsDetailsForm.onDestroyed(function() {
	
});

Template.Form2DetailsDetailsForm.onRendered(function() {
	

	pageSession.set("form2DetailsDetailsFormInfoMessage", "");
	pageSession.set("form2DetailsDetailsFormErrorMessage", "");

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

Template.Form2DetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form2DetailsDetailsFormInfoMessage", "");
		pageSession.set("form2DetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form2DetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(form2DetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form2DetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form2DetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("form2", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.Form2DetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form2DetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form2DetailsDetailsFormErrorMessage");
	}
	
});
