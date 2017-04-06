import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';
import { Dropdown ,Button,Input} from 'semantic-ui-react';
import DisplayCards from './displaycard.jsx';
import Display from './card2.jsx';


var $ = require('jquery');

export default class Sample extends React.Component {
	constructor () {
		super();
		this.state = {
			city : " ",
			cuisine : " ",
			city_id: " ",
			cuisine_id : "",
			cuisine_arr : [],
			cuisine_name : [],restaurantData:[],x1:[],
			
		}
	}

	handleCity(event){
		this.setState({city: event.target.value})
	}

	handleCuisine(event,data){
		var arr = this.state.cuisine_arr;
		for(var i=0;i<arr.length;i++){
			if(arr[i].cuisine.cuisine_name === data.value){
				this.setState({cuisine_id : arr[i].cuisine.cuisine_id})
			}
		}
	}
	
	findCuisines(){
		var cuisArr = [];
		var cityId;
		let url_1 = 'https://developers.zomato.com/api/v2.1/cities?q='
		+ this.state.city + '&apikey=c91566a5fe283199ddc8fce8be24c6a4';
		$.ajax(url_1,{
			success: function(data){
				cityId = data.location_suggestions[0].id;
				this.setState({city_id : cityId});
				let url_2 = 'https://developers.zomato.com/api/v2.1/cuisines?city_id='+ cityId + '&apikey=c91566a5fe283199ddc8fce8be24c6a4';
				$.ajax(url_2,{
					success: function(data){
						let arr = data.cuisines;
						this.setState({cuisine_arr : arr});
						var cuisine_name = this.state.cuisine_name;
						for(var i=0;i<arr.length;i++){
							let temp = arr[i].cuisine.cuisine_name;
							cuisine_name.push({key:temp, text:temp, value:temp});
							this.setState({cuisine_name:cuisine_name});
						}



					}.bind(this)
				})
			}.bind(this)
		})
	}
	viewFav()
	{
		this.setState({restaurantData:[]})
		$.ajax({
			url: "http://localhost:8080/viewData/",
			type: "GET",

			success:function(dat){
				console.log("view data");
				console.log(dat);
				this.setState({x1:dat})


				this.setState({content:"viewed"});
			}.bind(this),
			
		})
	}

	searchCity(event)
	{
		const city=event.target.value;
		$.ajax({
			url: "https://developers.zomato.com/api/v2.1/cities?q="+city,
			type: "GET",
			dataType: "json",
			headers: {  "Accept":" application/json" ,"user-key":"e323dd0da29677f21f8206c654d28ed5" },
			success:function(data){
				var states=[];
				this.setState({cityId:data.location_suggestions});
				this.state.cityId.forEach(function(data){
					states.push({key:data.id,value:data.id,text:data.name});
				})
				this.setState({stateOptions:states});
                                       //console.log(this.state.cityId);
                                   }.bind(this)
                               })
		console.log(states);
	}
	getRestaurantDetails(){
		var city = this.state.city_id;
		var cus_id = this.state.cuisine_id;
		this.setState({x1:[]})
		console.log(city);
		console.log(cus_id);
		let url_3='https://developers.zomato.com/api/v2.1/search?entity_id='+city+'&entity_type=city'+ '&cuisines=' + cus_id + '&apikey=c91566a5fe283199ddc8fce8be24c6a4';
		$.ajax(url_3,{
			success: function(data){
				let x=[];
				data.restaurants.forEach(function(d){
					x.push({_id:d.restaurant.id,image:d.restaurant.featured_image,
						name:d.restaurant.name,rating:d.restaurant.user_rating.aggregate_rating,
						votes:d.restaurant.user_rating.votes,address:d.restaurant.location.address,
						comments:d.restaurant.user_rating.rating_text})

				})//end of foreach
				this.setState({restaurantData:x})




			}.bind(this)
		})
	}

	render () {

		return(


			<div >
			<h1>Hello zomato</h1>
			<Input icon='search' placeholder='Search...' onChange={this.handleCity.bind(this)} value={this.state.city} />

			<RaisedButton label="Search" primary={true}
			onClick={this.findCuisines.bind(this)}/>
			<br/>
			<br/>
			<br/>


			
			<Dropdown id="Dropdown " placeholder="Cuisines"
			search selection options={this.state.cuisine_name} 
			onChange={this.handleCuisine.bind(this)}/>
			<RaisedButton label="Primary" primary={true}
			onClick = {this.getRestaurantDetails.bind(this)}/>
			<br/>
			<br/>

			<br/>
			
			<Button color='red'  onClick={this.viewFav.bind(this)}>View Favourites</Button>
			<DisplayCards restaurantData={this.state.restaurantData}/>
			<Display card3={this.state.x1} />
			
			</div>

			);

	}
}

