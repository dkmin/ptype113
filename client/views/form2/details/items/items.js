Template.Form2DetailsItems.onCreated(function() {
	
});

Template.Form2DetailsItems.onDestroyed(function() {
	
});

Template.Form2DetailsItems.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form2DetailsItems.events({
	
});

Template.Form2DetailsItems.helpers({
	
});


var Form2DetailsItemsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InvoiceItemsPagedSearchString") || "",
		searchFields: Session.get("InvoiceItemsPagedSearchFields") || ["description", "ispass", "ispassnot"],
		sortBy: Session.get("InvoiceItemsPagedSortBy") || "",
		sortAscending: Session.get("InvoiceItemsPagedSortAscending") || true
	};

	var exportFields = ["description", "ispass", "ispassnot"];

	

	Meteor.call("invoiceItemsPagedExport", this.params.invoiceId, extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.Form2DetailsItemsView.onCreated(function() {
	
});

Template.Form2DetailsItemsView.onDestroyed(function() {
	
});

Template.Form2DetailsItemsView.onRendered(function() {
	Session.set("Form2DetailsItemsViewStyle", "table");
	
});

Template.Form2DetailsItemsView.events({
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
				Session.set("InvoiceItemsPagedSearchString", searchString);
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
					Session.set("InvoiceItemsPagedSearchString", searchString);
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
					Session.set("InvoiceItemsPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("form2.details.insert", mergeObjects(Router.currentRouteParams(), {invoiceId: this.params.invoiceId}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		Form2DetailsItemsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		Form2DetailsItemsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		Form2DetailsItemsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		Form2DetailsItemsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InvoiceItemsPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InvoiceItemsPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InvoiceItemsPagedPageNo") || 0;
		if(currentPage < this.invoice_items_paged_page_count - 1) {
			Session.set("InvoiceItemsPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.Form2DetailsItemsView.helpers({

	"insertButtonClass": function() {
		return InvoiceItems.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.invoice_items_paged || this.invoice_items_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.invoice_items_paged && this.invoice_items_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.invoice_items_paged && this.invoice_items_paged.count() == 0 && Session.get("InvoiceItemsPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InvoiceItemsPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InvoiceItemsPagedPageNo") || 0) < this.invoice_items_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InvoiceItemsPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("Form2DetailsItemsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("Form2DetailsItemsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("Form2DetailsItemsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("Form2DetailsItemsViewStyle") == "gallery";
	}

	
});


Template.Form2DetailsItemsViewTable.onCreated(function() {
	
});

Template.Form2DetailsItemsViewTable.onDestroyed(function() {
	
});

Template.Form2DetailsItemsViewTable.onRendered(function() {
	
});

Template.Form2DetailsItemsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InvoiceItemsPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InvoiceItemsPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InvoiceItemsPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InvoiceItemsPagedSortAscending", !sortAscending);
		} else {
			Session.set("InvoiceItemsPagedSortAscending", true);
		}
	}
});

Template.Form2DetailsItemsViewTable.helpers({
});


Template.Form2DetailsItemsViewTableItems.onCreated(function() {
	
});

Template.Form2DetailsItemsViewTableItems.onDestroyed(function() {
	
});

Template.Form2DetailsItemsViewTableItems.onRendered(function() {
	
});

Template.Form2DetailsItemsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("invoiceItemsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("invoiceItemsRemove", me._id, function(err, res) {
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
		Router.go("form2.details.edit", mergeObjects(Router.currentRouteParams(), {invoiceId: UI._parentData(1).params.invoiceId, itemId: this._id}));
		return false;
	}
});

Template.Form2DetailsItemsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InvoiceItems.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InvoiceItems.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
