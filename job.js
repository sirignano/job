if (Meteor.isClient) {
	Meteor.subscribe('userData');
	Meteor.subscribe('ship');
	Accounts.ui.config({    passwordSignupFields: 'USERNAME_ONLY' });

	Template.map.user = function () { return Meteor.user(); }
	Template.zoom.events({ 'click input.map': function (event) {  Meteor.call('map'); } });
	Template.zoom.events({ 'click input.left': function (event) {  console.log("avance de gauche"); } });
	Template.zoom.events({ 'click input.right': function (event) {  console.log("avance de droite"); } });
	Template.map.p = function () { return ship.find().fetch()[0].p; }
	Template.map.events({ 'click input.zoom': function (event) {  Meteor.call('zoom'); } });
	Template.gen.onmap = function () { return Meteor.user().onmap; }
 //code client
}

if (Meteor.isServer) {
  Meteor.startup(function () {

	if (ship.find().count() === 0)
	{
		ship.insert({
			p: 0
		});
	}

	Meteor.publish("userData", function () {
		return Meteor.users.find({}, {sort: {'money': -1}});
	});

	Accounts.onCreateUser(function(options, user) {
					user.walked = 0;
					user.timed = 0;
					user.onmap = true;
					return user;
	})
	Meteor.publish("inventaire", function () {
		return ship.find();
	});
    // code to run on server at startup
  });
}

//bdd

//avancée
ship = new Mongo.Collection("ship");


Meteor.methods({
	map: function () {
//
		Meteor.users.update({_id: this.userId}, {$set: {'onmap': true}});
	},
	zoom: function () {
//
		Meteor.users.update({_id: this.userId}, {$set: {'onmap': false}});
	},
})