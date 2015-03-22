var express 	= require('express'),
    app     	= express(),
    server  	= require('http').createServer(app),
    MongoClient = require('mongodb').MongoClient,
    assert 		= require('assert'),
    bodyParser  = require('body-parser');

var dbUrl = 'mongodb://localhost:27017/todo';

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/**
*	GET ALL TODO
*/
app.get('/', function(req, res){
	MongoClient.connect(dbUrl, function(err, db) {
		if(err) throw new Error('No connection to db');
		var collection = db.collection('todo');
		collection.find({}).toArray(function(err, docs) {
			if(err) throw new Error('Error finding');
			res.json(docs);
			db.close();
		});      
	});
});

/**
*	GET TODO BY ID
*/
app.get('/todo/:id', function(req, res){
	MongoClient.connect(dbUrl, function(err, db) {
		if(err) throw new Error('No connection to db');
		var collection = db.collection('todo'),
			query = { 'index': parseInt(req.params.id) };
		collection.findOne(query, function(err, doc) {
			if(err) throw new Error('Error finding');
			if(doc == null){
				res.status(404).send("404, Not found!");
			}else{
				res.json(doc);	
			}
			db.close();
		});      
	});
});

/**
*	DELETE TODO BY ID
*/
app.delete('/todo/:id', function(req, res){
	MongoClient.connect(dbUrl, function(err, db) {
		if(err) throw new Error('No connection to db');
		var collection = db.collection('todo'),
			query = { 'index': parseInt(req.params.id) };
		collection.remove(query, function(err, removed) {
			if(err) throw new Error('Error deleting');
			res.json(removed);
			db.close();
		});      
	});
});

/**
*	CREATE TODO
*/
app.post('/todo', function(req, res){
	MongoClient.connect(dbUrl, function(err, db) {
		if(err) throw new Error('No connection to db');
		var collection 	= db.collection('todo'),
			item 		= {};
		item.index 	= parseInt(req.body.index, 10);
		item.title 	= req.body.title;
		collection.insert(item, function(err, saved) {
			if(err) throw new Error('Error creating');
			res.json(saved);
			db.close();
		});      
	});
});
/**
*	UPDATE TODO BY ID
*/
app.post('/todo/:id', function(req, res){
	MongoClient.connect(dbUrl, function(err, db) {
		if(err) throw new Error('No connection to db');
		var collection 	= db.collection('todo'),
			item 		= {};
		item.index 	= parseInt(req.body.index, 10);
		item.title 	= req.body.title;
		collection.insert(item, function(err, saved) {
			if(err) throw new Error('Error creating');
			res.json(saved);
			db.close();
		});      
	});
});

server.listen(3030);
