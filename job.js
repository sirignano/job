if (Meteor.isClient) {
	Meteor.subscribe('userData');
	Meteor.subscribe('ship');
	Accounts.ui.config({    passwordSignupFields: 'USERNAME_ONLY' });

	Template.map.user = function () { return Meteor.user(); }
	Template.zoom.events({ 'click input.map': function (event) {  Meteor.call('map'); } });
	Template.zoom.events({ 'click input.left': function (event) {  Meteor.call('left'); } });
	Template.zoom.events({ 'click input.right': function (event) {  Meteor.call('right'); } });
	Template.zoom.p = function () { return Ship.find({}).fetch()[0].p % 100; }
	Template.map.events({ 'click input.zoom': function (event) {  Meteor.call('zoom'); } });
	Template.gen.onmap = function () { return Meteor.user().onmap; }
 //code client
}

if (Meteor.isServer) {
  Meteor.startup(function () {

	if (Ship.find().count() === 0)
	{
		Ship.insert({
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
					user.old = "right";
					return user;
	})
	Meteor.publish("ship", function () {
		return Ship.find();
	});
    // code to run on server at startup
  });
}

//bdd

//avancée
Ship = new Mongo.Collection("ship");


Meteor.methods({
	left: function () {
//
	if (Meteor.user().old == "right")
		Ship.update({_id: Ship.find({}).fetch()[0]._id}, {$inc: {'p': 1}});
	Meteor.users.update({_id: this.userId}, {$set: {'old': "left"}});
	},
	right: function () {
//
	if (Meteor.user().old == "left")
		Ship.update({_id: Ship.find({}).fetch()[0]._id}, {$inc: {'p': 1}});
	Meteor.users.update({_id: this.userId}, {$set: {'old': "right"}});
	},	
	map: function () {
//
		Meteor.users.update({_id: this.userId}, {$set: {'onmap': true}});
	},
	zoom: function () {
//
		Meteor.users.update({_id: this.userId}, {$set: {'onmap': false}});
	},
})