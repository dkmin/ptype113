Template.Form3.onCreated(function() {
	
});

Template.Form3.onDestroyed(function() {
	
});

Template.Form3.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Form3.events({
	
});

Template.Form3.helpers({
	
});
