Ship = new Mongo.Collection("ship");
Map = new Mongo.Collection("map");

if (Meteor.isClient)
{
	Meteor.subscribe('userData');
	Meteor.subscribe('ship');
	Meteor.subscribe('map');
	Accounts.ui.config({ passwordSignupFields: 'USERNAME_ONLY' });

//	Template.zoom.events({ 'click input.left': function (event) { Session.set('alert', 'left'); if (Session.get('old') == "right") { Meteor.call('left'); } Session.set('old', 'left');} });
//	Template.zoom.events({ 'click input.right': function (event) { Session.set('alert', 'right'); if (Session.get('old') == "left") { Meteor.call('right'); } Session.set('old', 'right');} });
	Template.zoom.events({ 'click input.left': function (event) { Session.set('alert', 'left'); if (Session.get('old') == "right") { Meteor.call('left'); Session.set('notice', test());} Session.set('old', 'left');} });
	Template.zoom.events({ 'click input.right': function (event) { Session.set('alert', 'right'); if (Session.get('old') == "left") { Meteor.call('right'); Session.set('notice', test());} Session.set('old', 'right');} });
	Template.zoom.events({ 'click input.map': function (event) {  Session.set('onmap', true); } });
	Template.map.events({ 'click input.zoom': function (event) {  Session.set('onmap', false); } });
	Template.zoom.events({ 'click input.hhh': function (event) {   Meteor.call('cheat'); } });

	Template.gen.helpers({ onmap: function () { return Session.get('onmap'); } });
	Template.zoom.helpers({ alert: function () { return Session.get('alert'); } });
	Template.zoom.helpers({ notice: function () { return Session.get('notice'); } });
	Template.map.helpers({ user: function () { return Meteor.user(); } });
	Template.map.helpers({ maps: function () {
		return Map.find({}, {sort: {'id': 1}}).fetch();
	} });
	Template.zoom.helpers({ map: function () { 
		a = Ship.find().fetch()[0];
		if (!a)
			return (0);
		ret = Map.findOne({id: Math.floor(a.p / 100)});
		return (ret.name);
	} });
	Template.zoom.helpers({ p: function () { a = Ship.find().fetch()[0]; if (!a) return (0); return ((a.p % 100) + 0.000001); } });
	Template.zoom.helpers({ pl: function () { a = Ship.find().fetch()[0]; if (!a) return (0); if (a.p <= 10) return(10); return ((a.p % 100) - 5); } });


	Template.zoom.events({ 'click input.reset': function (event) {   Meteor.call('reset'); } });
}

if (Meteor.isServer)
{
  Meteor.startup(function () {	if (Ship.find().count() === 0)	{ Ship.insert({ p: 0 });} if (Map.find().count() === 0) { 
  	var planete = new Array;
  	 planete[0] = "Earth";
  	 planete[1] = "Mars";
  	 planete[2] = "Jupiter";
  	 planete[3] = "Saturne";
  	 planete[4] = "Alderann";
  	 planete[5] = "Bonadan";
  	 planete[6] = "Malastare";
  	 planete[7] = "Kuat";
  	 planete[8] = "Mustafar";
  	 planete[9] = "Umbara";
  	 planete[10] = "Onderon";
  	 planete[11] = "Vortex";
  	 planete[12] = "Yavin 4";
  	 planete[13] = "Ziost";
  	 planete[14] = "Wayland";
  	 planete[15] = "Sullust";
  	 planete[16] = "Rodia";
  	 planete[17] = "Ord Mantell";
  	 planete[18] = "Nal Hutta";
  	 planete[19] = "Kiffy";
  	 planete[20] = "Ithor";
  	 planete[21] = "Hapes";
  	 planete[22] = "Eriadu";
  	 planete[23] = "Dathomir";
  	 planete[24] = "Falleen";
  	 planete[25] = "Géonosis";
  	 planete[26] = "Kashyyyk";
  	 planete[27] = "Kamino";
  	 planete[28] = "Naboo";
  	 planete[29] = "Coruscant";
  	i = 0; while (i < 30) {Map.insert({id: i, name: "from " + planete[i] + " to " + planete[i + 1] + "."}); i++;} }
  Accounts.onCreateUser(function(options, user) { user.walked = 0; return user; }) });
  Meteor.publish("userData", function () { return Meteor.users.find(); });
  Meteor.publish("ship", function () { return Ship.find(); });
  Meteor.publish("map", function () { return Map.find(); });
if (Meteor.users.find().count() === 0)
  	{

  		i = 0;
  		while (i < 10000)
  		{
			  seed1UserId = Accounts.createUser({ 
			    username: 'lance' + i.toString(), 
			    email: 'l@oo.com' + i.toString(), 
			    password: '123456' + i.toString() 
			  }); 
			i++;

		} 
	}
}

//bdd

//avancée

function test()
{
	ship = Ship.find().fetch()[0];
	if (ship.p  == 5)
	{
		Meteor.call('upt', ship._id, 2);
		return ("vous avez bu un coca (p = 5, inc = 2)");
	}
	else if(ship.p == 21)
	{
		Meteor.call('upt', ship._id, 1);
		return ("pression du coca disparu (p = 21, inc = 1)");
	}
	else if(ship.p == 30)
	{
		Meteor.call('upt', ship._id, 5);
		return ("vous avez obtenu un propulseur (p = 30, inc = 5)");
	}
	else if(ship.p == 50)
	{
		Meteor.call('upt', ship._id, 10);
		return ("voie rapide de l'espace (p = 50, inc = 10)");
	}
	else if(ship.p == 120)
	{
		Meteor.call('upt', ship._id, 5);
		return ("fin de la voie rapide (p = 120, inc = 5)");
	}
	else if(ship.p == 150)
	{
		Meteor.call('upt', ship._id, 15);
		return ("vent favorable (p = 150, inc = 15)");
	}
	else if(ship.p == 270)
	{
		Meteor.call('upt', ship._id, 5);
		return ("plus de vent (p = 270, inc = 5)");
	}
	else if(ship.p == 285)
	{
		Meteor.call('upt', ship._id, 1);
		return ("perte du propulseur (p = 285, inc = 1)");
	}
	else if(ship.p >= 300)
	{
		Meteor.call('upt', ship._id, 0);
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
	cheat: function ()
	{
		ship = Ship.find().fetch()[0];
		Ship.update({_id: ship._id}, {$inc: {'p': ship.inc}});
		Meteor.users.update({_id: this.userId}, {$inc: {'walked': 1}});
	},
	reset: function ()
	{
		Ship.update({_id: Ship.find().fetch()[0]._id}, {$set: {'p': 1, 'inc': 1}});
	}
})