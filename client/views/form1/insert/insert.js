var pageSession = new ReactiveDict();

Template.Form1Insert.onCreated(function() {
	
});

Template.Form1Insert.onDestroyed(function() {
	
});

Template.Form1Insert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form1Insert.events({
	
});

Template.Form1Insert.helpers({
	
});

Template.Form1InsertInsertForm.onCreated(function() {
	
});

Template.Form1InsertInsertForm.onDestroyed(function() {
	
});

Template.Form1InsertInsertForm.onRendered(function() {
	

	pageSession.set("form1InsertInsertFormInfoMessage", "");
	pageSession.set("form1InsertInsertFormErrorMessage", "");

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

Template.Form1InsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("form1InsertInsertFormInfoMessage", "");
		pageSession.set("form1InsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var form1InsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(form1InsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("form1InsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("form1", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("form1InsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("customersInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.Form1InsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("form1InsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("form1InsertInsertFormErrorMessage");
	}
	
});
