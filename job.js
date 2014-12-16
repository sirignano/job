Ship = new Mongo.Collection("ship");

if (Meteor.isClient)
{
	Meteor.subscribe('userData');
	Meteor.subscribe('ship');
	Accounts.ui.config({ passwordSignupFields: 'USERNAME_ONLY' });

	Template.zoom.events({ 'click input.left': function (event) { Session.set('alert', 'left'); if (Session.get('old') == "right") { Meteor.call('left'); } Session.set('old', 'left');} });
	Template.zoom.events({ 'click input.right': function (event) { Session.set('alert', 'right'); if (Session.get('old') == "left") { Meteor.call('right'); } Session.set('old', 'right');} });
	Template.zoom.events({ 'click input.map': function (event) {  Session.set('onmap', true); } });
	Template.map.events({ 'click input.zoom': function (event) {  Session.set('onmap', false); } });

	Template.gen.helpers({ onmap: function () { return Session.get('onmap'); } });
	Template.gen.helpers({ alert: function () { return Session.get('alert'); } });
	Template.gen.helpers({ notice: function () { return Session.get('notice'); } });
	Template.map.helpers({ user: function () { return Meteor.user(); } });
	Template.zoom.helpers({ p: function () { a = Ship.find().fetch()[0]; if (!a) return (0); return (a.p % 100); } });
}

if (Meteor.isServer)
{
  Meteor.startup(function () {	if (Ship.find().count() === 0)	{ Ship.insert({ p: 0 }); }
  Accounts.onCreateUser(function(options, user) { user.walked = 0; return user; }) });
  Meteor.publish("userData", function () { return Meteor.users.find(); });
  Meteor.publish("ship", function () { return Ship.find(); });
}

//bdd

//avancée

Meteor.methods({
	left: function ()
	{
		Ship.update({_id: Ship.find().fetch()[0]._id}, {$inc: {'p': 1}});
		Meteor.users.update({_id: this.userId}, {$inc: {'walked': 1}});

	},
	right: function ()
	{
		Ship.update({_id: Ship.find().fetch()[0]._id}, {$inc: {'p': 1}});
		Meteor.users.update({_id: this.userId}, {$inc: {'walked': 1}});
	},
})