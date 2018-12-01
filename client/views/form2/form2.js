Template.Form2.onCreated(function() {
	
});

Template.Form2.onDestroyed(function() {
	
});

Template.Form2.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form2.events({
	
});

Template.Form2.helpers({
	
});


var Form2ViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InvoiceListPagedSearchString") || "",
		searchFields: Session.get("InvoiceListPagedSearchFields") || ["systemname", "systemnote", "systemtype", "info3", "system3", "evaluator", "years", "customerId", "customer.name"],
		sortBy: Session.get("InvoiceListPagedSortBy") || "",
		sortAscending: Session.get("InvoiceListPagedSortAscending") || true
	};

	var exportFields = ["systemname", "systemnote", "systemtype", "info3", "system3", "evaluator", "years", "customer.name"];

	

	Meteor.call("invoiceListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.Form2View.onCreated(function() {
	
});

Template.Form2View.onDestroyed(function() {
	
});

Template.Form2View.onRendered(function() {
	Session.set("Form2ViewStyle", "table");
	
});

Template.Form2View.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("InvoiceListPagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("InvoiceListPagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("InvoiceListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("form2.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		Form2ViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		Form2ViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		Form2ViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		Form2ViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InvoiceListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InvoiceListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InvoiceListPagedPageNo") || 0;
		if(currentPage < this.invoice_list_paged_page_count - 1) {
			Session.set("InvoiceListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.Form2View.helpers({

	"insertButtonClass": function() {
		return Invoices.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.invoice_list_paged || this.invoice_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.invoice_list_paged && this.invoice_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.invoice_list_paged && this.invoice_list_paged.count() == 0 && Session.get("InvoiceListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InvoiceListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InvoiceListPagedPageNo") || 0) < this.invoice_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InvoiceListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("Form2ViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("Form2ViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("Form2ViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("Form2ViewStyle") == "gallery";
	}

	
});


Template.Form2ViewTable.onCreated(function() {
	
});

Template.Form2ViewTable.onDestroyed(function() {
	
});

Template.Form2ViewTable.onRendered(function() {
	
});

Template.Form2ViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InvoiceListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InvoiceListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InvoiceListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InvoiceListPagedSortAscending", !sortAscending);
		} else {
			Session.set("InvoiceListPagedSortAscending", true);
		}
	}
});

Template.Form2ViewTable.helpers({
});


Template.Form2ViewTableItems.onCreated(function() {
	
});

Template.Form2ViewTableItems.onDestroyed(function() {
	
});

Template.Form2ViewTableItems.onRendered(function() {
	
});

Template.Form2ViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("form2.details", mergeObjects(Router.currentRouteParams(), {invoiceId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("invoicesUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("invoicesRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("form2.edit", mergeObjects(Router.currentRouteParams(), {invoiceId: this._id}));
		return false;
	}
});

Template.Form2ViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Invoices.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Invoices.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
