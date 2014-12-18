Ship = new Mongo.Collection("ship");
Map = new Mongo.Collection("map");
Item = new Mongo.Collection("item");

if (Meteor.isClient)
{
	Meteor.subscribe('userData');
	Meteor.subscribe('ship');
	Meteor.subscribe('map');
	Meteor.subscribe('item');
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
	Template.zoom.helpers({ item: function () { a = Ship.find().fetch()[0]; if (!a) return (ret); item = Item.find({ $and: [ { pos: { $gt: a.p } }, { pos: { $lt: ((Math.floor(a.p / 100) + 1 ) * 100) } } ] }).fetch(); i = 0;	while (item[i])	{ item[i].pos = item[i].pos % 100; i++; } console.log(item); return item; } });
	Template.zoom.helpers({ equip: function () { return Item.find({ $and: [ { equip: 1 }, { pos: { $exists: true } } ] }).fetch() } });
	Template.zoom.helpers({ evenement: function () { return Item.find({ $and: [ { equip: 1 }, { pos: { $exists: false } } ] }).fetch() } });

	Template.zoom.events({ 'click input.reset': function (event) {   Meteor.call('reset'); } });
}

if (Meteor.isServer)
{
  Meteor.startup(function () {	
  	Meteor.setInterval(function() { time_item(); }, 1000)
  	if (Ship.find().count() === 0)	{ Ship.insert({ p: 0, inc: 1 });} if (Map.find().count() === 0) { 
  	var planete = new Array;
  	 planete[0] = "Earth"; planete[1] = "Mars"; planete[2] = "Jupiter"; planete[3] = "Saturne"; planete[4] = "Alderann"; planete[5] = "Bonadan"; planete[6] = "Malastare"; planete[7] = "Kuat"; planete[8] = "Mustafar"; planete[9] = "Umbara"; planete[10] = "Onderon"; planete[11] = "Vortex"; planete[12] = "Yavin 4"; planete[13] = "Ziost"; planete[14] = "Wayland"; planete[15] = "Sullust"; planete[16] = "Rodia"; planete[17] = "Ord Mantell"; planete[18] = "Nal Hutta"; planete[19] = "Kiffy"; planete[20] = "Ithor"; planete[21] = "Hapes"; planete[22] = "Eriadu"; planete[23] = "Dathomir"; planete[24] = "Falleen"; planete[25] = "Géonosis"; planete[26] = "Kashyyyk"; planete[27] = "Kamino"; planete[28] = "Naboo"; planete[29] = "Coruscant";
  	i = 0; while (i < 30) {Map.insert({id: i, name: "from " + planete[i] + " to " + planete[i + 1] + "."}); i++;} }
  if (Item.find().count() === 0) { 
  	date = new Date();
  	Item.insert({name: "coca", time: 5, mult: 1, add: 3, pos: 6, equip: 0});
  	Item.insert({name: "pepsi", time: 10, mult: 1, add: 5, pos: 85, equip: 0});
  	Item.insert({name: "propulseur", mult: 3, add: 0, pos: 210, equip: 0});
  	Item.insert({name: "propulseur2", mult: 5, add: 0, pos: 1015, equip: 0});
  	Item.insert({name: "vent favorable", time_start: (date.getTime() + (2 * 1000 * 60)), time_end: (date.getTime() + (3 * 1000 * 60)), mult: 5, add: 0, equip: 0});
   }
  Accounts.onCreateUser(function(options, user) { user.walked = 0; return user; }) });
  Meteor.publish("userData", function () { return Meteor.users.find(); });
  Meteor.publish("ship", function () { return Ship.find(); });
  Meteor.publish("map", function () { return Map.find(); });
  Meteor.publish("item", function () { return Item.find(); });
// if (Meteor.users.find().count() === 0)
//   	{

//   		i = 0;
//   		while (i < 10000)
//   		{
// 			  seed1UserId = Accounts.createUser({ 
// 			    username: 'lance' + i.toString(), 
// 			    email: 'l@oo.com' + i.toString(), 
// 			    password: '123456' + i.toString() 
// 			  }); 
// 			i++;

// 		} 
// 	}
}

//bdd

//avancée

function test()
{
	ship = Ship.find().fetch()[0];
	item = Item.find({equip: 0, pos: { $lte: ship.p }}).fetch();
	i = 0;
	ret = "";
	while (item[i])
	{
		Meteor.call('add_item', ship, item[i]);
		ret += "Vous avez obtenu un '" + item[i].name + "'!\n";
		i++;
	}
	// if (ship.p  == 5)
	// {
	// 	Meteor.call('upt', ship._id, 2);
	// 	return ("vous avez bu un coca (p = 5, inc = 2)");
	// }
	// else if(ship.p == 21)
	// {
	// 	Meteor.call('upt', ship._id, 1);
	// 	return ("pression du coca disparu (p = 21, inc = 1)");
	// }
	// else if(ship.p == 30)
	// {
	// 	Meteor.call('upt', ship._id, 5);
	// 	return ("vous avez obtenu un propulseur (p = 30, inc = 5)");
	// }
	// else if(ship.p == 50)
	// {
	// 	Meteor.call('upt', ship._id, 10);
	// 	return ("voie rapide de l'espace (p = 50, inc = 10)");
	// }
	// else if(ship.p == 120)
	// {
	// 	Meteor.call('upt', ship._id, 5);
	// 	return ("fin de la voie rapide (p = 120, inc = 5)");
	// }
	// else if(ship.p == 150)
	// {
	// 	Meteor.call('upt', ship._id, 15);
	// 	return ("vent favorable (p = 150, inc = 15)");
	// }
	// else if(ship.p == 270)
	// {
	// 	Meteor.call('upt', ship._id, 5);
	// 	return ("plus de vent (p = 270, inc = 5)");
	// }
	// else if(ship.p == 285)
	// {
	// 	Meteor.call('upt', ship._id, 1);
	// 	return ("perte du propulseur (p = 285, inc = 1)");
	// }
	if(ship.p >= 2900)
	{
		Meteor.call('upt', ship._id, 0);
	 	ret += "fin du jeu";
	}
	return ret;
}

function time_item()
{
	ship = Ship.find().fetch()[0];
	item = Item.find({equip: 1, time: { $gte: 0 }}).fetch();
	i = 0;
	ret = "";
	while (item[i])
	{
		if (item[i].time <= 0)
		{
			ret += "Vous avez perdu un '" + item[i].name + "'!\n";
			Meteor.call('rm_item', ship, item[i]);
		}
		else
			Meteor.call('upt_item', item[i]);
		i++;
	}
	date = new Date();
	item = Item.find({equip: 0, time_start: { $lte: date.getTime() }}).fetch();
	i = 0;
	while (item[i])
	{
		Meteor.call('add_item', ship, item[i]);
		ret += "Vous avez obtenu un '" + item[i].name + "'!\n";
		i++;
	}
	item = Item.find({equip: 1, time_end: { $lte: date.getTime() }}).fetch();
	i = 0;
	while (item[i])
	{
		ret += "Vous avez perdu un '" + item[i].name + "'!\n";
		Meteor.call('rm_item', ship, item[i]);
		i++;
	}
	console.log(ret);
	return (ret);
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
	},
	add_item: function (ship, item)
	{
		Ship.update({_id: ship._id}, {$set: {'inc': Math.floor(((ship.inc * item.mult) + item.add))}});
		Item.update({_id: item._id}, {$set: {'equip': 1}});
	},
	rm_item: function (ship, item)
	{
		Ship.update({_id: ship._id}, {$set: {'inc': Math.floor(((ship.inc - item.add) / item.mult))}});
		Item.remove({_id: item._id});
	},
	upt_item: function (item)
	{
		Item.update({_id: item._id}, {$inc: {'time': -1}});
	},

})