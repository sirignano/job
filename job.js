Ship = new Mongo.Collection("ship");

if (Meteor.isClient)
{
	Meteor.subscribe('userData');
	Meteor.subscribe('ship');
	Accounts.ui.config({ passwordSignupFields: 'USERNAME_ONLY' });

	Template.zoom.events({ 'click input.left': function (event) { Session.set('alert', 'left'); if (Session.get('old') == "right") { Meteor.call('left'); Session.set('notice', test());} Session.set('old', 'left');} });
	Template.zoom.events({ 'click input.right': function (event) { Session.set('alert', 'right'); if (Session.get('old') == "left") { Meteor.call('right'); Session.set('notice', test());} Session.set('old', 'right');} });
	Template.zoom.events({ 'click input.map': function (event) {  Session.set('onmap', true); } });
	Template.map.events({ 'click input.zoom': function (event) {  Session.set('onmap', false); } });

	Template.gen.helpers({ onmap: function () { return Session.get('onmap'); } });
	Template.gen.helpers({ alert: function () { return Session.get('alert'); } });
	Template.gen.helpers({ notice: function () { return Session.get('notice'); } });
	Template.map.helpers({ user: function () { return Meteor.user(); } });
	Template.zoom.helpers({ p: function () { a = Ship.find().fetch()[0]; if (!a) return (0); return ((a.p / 3)); } });
}

if (Meteor.isServer)
{
  Meteor.startup(function () {	if (Ship.find().count() === 0)	{ Ship.insert({ p: 0, inc: 1 }); }
  Accounts.onCreateUser(function(options, user) { user.walked = 0; return user; }) });
  Meteor.publish("userData", function () { return Meteor.users.find(); });
  Meteor.publish("ship", function () { return Ship.find(); });
}

//bdd

//avancée
function test()
{
	ship = Ship.find().fetch()[0];
	if (ship.p == 5)
	{
		Meteor.call('upt', ship._id, 2);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 2}});
		return ("vous avez bu un coca (p = 5, inc = 2)");
	}
	else if(ship.p == 21)
	{
		Meteor.call('upt', ship._id, 1);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 1}});
		return ("pression du coca disparu (p = 21, inc = 1)");
	}
	else if(ship.p == 30)
	{
		Meteor.call('upt', ship._id, 5);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 5}});
		return ("vous avez obtenu un propulseur (p = 30, inc = 5)");
	}
	else if(ship.p == 50)
	{
		Meteor.call('upt', ship._id, 10);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 10}});
		return ("voie rapide de l'espace (p = 50, inc = 10)");
	}
	else if(ship.p == 120)
	{
		Meteor.call('upt', ship._id, 5);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 5}});
		return ("fin de la voie rapide (p = 120, inc = 5)");
	}
	else if(ship.p == 150)
	{
		Meteor.call('upt', ship._id, 15);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 15}});
		return ("vent favorable (p = 150, inc = 15)");
	}
	else if(ship.p == 270)
	{
		Meteor.call('upt', ship._id, 5);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 5}});
		return ("plus de vent (p = 270, inc = 5)");
	}
	else if(ship.p == 285)
	{
		Meteor.call('upt', ship._id, 1);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 1}});
		return ("perte du propulseur (p = 285, inc = 1)");
	}
	else if(ship.p == 300)
	{
		Meteor.call('upt', ship._id, 0);
	//	Ship.update({_id: ship._id}, {$set: {'inc': 0}});
		return ("fin du jeu (p = 300)");
	}
	return null;
}

Meteor.methods({
	left: function ()
	{
		ship = Ship.find().fetch()[0];
		Ship.update({_id: ship._id}, {$inc: {'p': ship.inc}});
		Meteor.users.update({_id: this.userId}, {$inc: {'walked': 1}});

	},
	right: function ()
	{
		ship = Ship.find().fetch()[0];
		Ship.update({_id: ship._id}, {$inc: {'p': ship.inc}});
		Meteor.users.update({_id: this.userId}, {$inc: {'walked': 1}});
	},
	upt: function (id, inc)
	{
		Ship.update({_id: id}, {$set: {'inc': inc}});
	},
})