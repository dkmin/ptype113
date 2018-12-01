var pageSession = new ReactiveDict();

Template.Form1Details.onCreated(function() {
	
});

Template.Form1Details.onDestroyed(function() {
	
});

Template.Form1Details.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form1Details.events({
	
});

Template.Form1Details.helpers({
	
});

Template.Form1DetailsDetailsForm.onCreated(function() {
	
});

Template.Form1DetailsDetailsForm.onDestroyed(function() {
	
});

Template.Form1DetailsDetailsForm.onRendered(function() {
	

	pageSession.set("form1DetailsDetailsFormInfoMessage", "");
	pageSession.set("form1DetailsDetailsFormErrorMessage", "");

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

Template.Form1DetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form1DetailsDetailsFormInfoMessage", "");
		pageSession.set("form1DetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form1DetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(form1DetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form1DetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form1DetailsDetailsFormErrorMessage", message);
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

		Router.go("form1", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("form1", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.Form1DetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form1DetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form1DetailsDetailsFormErrorMessage");
	}
	
});
