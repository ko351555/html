var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	_id: Number,
	name: String,

	address: String,
	image:  String,
	
	rating: String,
	
	votes:  String,
	comments: String,


	

});
module.exports=mongoose.model('restaurantdetails',blogSchema)