var pageSession = new ReactiveDict();

Template.Form2DetailsInsert.onCreated(function() {
	
});

Template.Form2DetailsInsert.onDestroyed(function() {
	
});

Template.Form2DetailsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form2DetailsInsert.events({
	
});

Template.Form2DetailsInsert.helpers({
	
});

Template.Form2DetailsInsertInsertForm.onCreated(function() {
	
});

Template.Form2DetailsInsertInsertForm.onDestroyed(function() {
	
});

Template.Form2DetailsInsertInsertForm.onRendered(function() {
	

	pageSession.set("form2DetailsInsertInsertFormInfoMessage", "");
	pageSession.set("form2DetailsInsertInsertFormErrorMessage", "");

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

Template.Form2DetailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form2DetailsInsertInsertFormInfoMessage", "");
		pageSession.set("form2DetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form2DetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(form2DetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form2DetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("form2.details", mergeObjects(Router.currentRouteParams(), {invoiceId: self.params.invoiceId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form2DetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.invoiceId = self.params.invoiceId;

				Meteor.call("invoiceItemsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.Form2DetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form2DetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form2DetailsInsertInsertFormErrorMessage");
	}
	
});
