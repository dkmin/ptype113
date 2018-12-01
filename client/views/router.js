Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"form1",
	"form1.insert",
	"form1.details",
	"form1.edit",
	"form2",
	"form2.insert",
	"form2.details",
	"form2.details.items",
	"form2.details.insert",
	"form2.details.edit",
	"form2.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

Router.freeRoutes = [
	
];

Router.roleMap = [
	
];

Router.defaultFreeRoute = "";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// add unique class to body element for each route
	if(Router.current()) {
		var currentRouteName = Router.current().route.getName();
		var prevRouteName = Session.get("currentRouteName");
		if(prevRouteName && prevRouteName != currentRouteName) {
			$("body").removeClass("page-" + toKebabCase(prevRouteName));
		}
		Session.set("currentRouteName", currentRouteName);
		$("body").addClass("page-" + toKebabCase(currentRouteName));
	}

	// loading indicator here
	if(!this.ready()) {
		this.render("loading");
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}

});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/form1", {name: "form1", title: "", controller: "Form1Controller"});
	this.route("/form1/insert", {name: "form1.insert", title: "", controller: "Form1InsertController"});
	this.route("/form1/details/:customerId", {name: "form1.details", title: "", controller: "Form1DetailsController"});
	this.route("/form1/edit/:customerId", {name: "form1.edit", title: "", controller: "Form1EditController"});
	this.route("/form2", {name: "form2", title: "", controller: "Form2Controller"});
	this.route("/form2/insert", {name: "form2.insert", title: "", controller: "Form2InsertController"});
	this.route("/form2/details/:invoiceId", {name: "form2.details", title: "", controller: "Form2DetailsController"});
	this.route("/form2/details/:invoiceId/items", {name: "form2.details.items", title: "", controller: "Form2DetailsItemsController"});
	this.route("/form2/details/:invoiceId/insert", {name: "form2.details.insert", title: "", controller: "Form2DetailsInsertController"});
	this.route("/form2/details/:invoiceId/edit/:itemId", {name: "form2.details.edit", title: "", controller: "Form2DetailsEditController"});
	this.route("/form2/edit/:invoiceId", {name: "form2.edit", title: "", controller: "Form2EditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
});
