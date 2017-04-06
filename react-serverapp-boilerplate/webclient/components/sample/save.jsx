import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Button } from 'semantic-ui-react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react';
//import DisplayCards from './displayCards.jsx'
export default class Sample extends React.Component {
  constructor () {
    super();
    this.state = {
      name:'Guest name',
      cityid:"hey",
      stateOptions:[],
      cuisineOptions:[],
      entity_id:"",
      restaurantData:"",
      bool:""
    }
  }
  handleDropdown(e)
  {
    let x=e.target.value;
    $.ajax({
      url: "https://developers.zomato.com/api/v2.1/cities?q="+x,
      type: "GET",
      dataType: "json",
      headers: {  "Accept":" application/json" ,"user-key":" 8225e38bbac103d51383067ef6f4c1ec" },
      success:function(data){
       this.setState({cityid:data.location_suggestions});
       var stp=[];
       this.state.cityid.forEach(function (data) {
         stp.push({ key: data.id, value: data.id, text: data.name })
       })
       this.setState({stateOptions:stp});
     }.bind(this)
   })
  }
  saveCity(e){
    this.state.cityid.forEach(function (data) {
      $.ajax({
        url:"http://localhost:8080/stream/add?city="+data.name+"&id="+data.id,
        type: "POST",
        success:function () {
          console.log("1 data added to database")
        }
      })
    })
  }
  clickDropdown(e,d){
   this.setState({entity_id:d.value});
   $.ajax({
    url: "https://developers.zomato.com/api/v2.1/cuisines?city_id="+d.value,
    type: "GET",
    dataType: "json",
    headers: {  "Accept":" application/json" ,"user-key":" 8225e38bbac103d51383067ef6f4c1ec" },
    success:function (data) {
     var x=[];
     data.cuisines.forEach(function(dat){
      x.push({ key: dat.cuisine.cuisine_id,  value: dat.cuisine.cuisine_id, text: dat.cuisine.cuisine_name })
    })
     this.setState({cuisineOptions:x})
   }.bind(this)
 })
 }
 cuisinsDropdown(e,data){
  $.ajax({
   url: "https://developers.zomato.com/api/v2.1/search?entity_id="+this.state.entity_id+"&entity_type=city&cuisines="+data.value,
   type: "GET",
   dataType: "json",
   headers: {  "Accept":" application/json" ,"user-key":" 8225e38bbac103d51383067ef6f4c1ec" },
   success:function (data) {
    this.setState({restaurantData:data})
    this.setState({bool:true})
        // console.log(this.state.restaurantData)
      }.bind(this)
    })
}
render () {
  function Fdispcards(props){
    console.log(props.bool)
    if(props.bool){
      return <DisplayCards restaurantData={props.restaurantData}/>;
    }
    else{
      return null;
    }
  }
  return (
    <div>
    <h1>Hello {this.props.message}</h1>
    <br/>
    <Button  onClick={this.saveCity.bind(this)} >Database</Button>
    <Dropdown id="Dropdown " placeholder="city" onKeyDown={this.handleDropdown.bind(this)}   onChange={this.clickDropdown.bind(this)}   search selection options={this.state.stateOptions} />
    <Dropdown placeholder='Select Cuisine'  search selection options={this.state.cuisineOptions} onChange={this.cuisinsDropdown.bind(this)} />
    <Fdispcards bool={this.state.bool} restaurantData={this.state.restaurantData}/>
    </div>
    );
}
}//end of class
Add Comment