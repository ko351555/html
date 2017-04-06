import React from 'react';
import { Button, Card, Image,Form, TextArea } from 'semantic-ui-react'
var $ = require('jquery');

export default class DisplayCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {'id': '' , 'name': '' , 'address': '', 'rating': '' ,'viewArray' : [],
    'comment': '', content: 'Add to Favourites', disable: false,textContent:''}

  }
  getTheContent(e){
   this.setState({textContent:e.target.value})
 }


 savedata(e)
 {

  console.log("e ",e);


  $.ajax({
    url: 'http://localhost:8080/add/',
    type: 'POST',
    data: e,
    success: function(data) {
      console.log("inside success");
      console.log("inserted successfully",data);
    }.bind(this),
    error: function(err) {
     console.error(err.toString());
   }.bind(this)
 })
}


viewbyid()
{

  $.ajax({
    url: "http://localhost:8080/viewData/",
    type: "GET",

    success:function(dat){

     console.log("success viewed");

     this.setState({content:"viewed"});
   }.bind(this),
   error : function(err,dat){
    console.log(err, dat);
    console.log(dat);
  }
})
}

deleteid(e){
  const key = {"id":e._id}
  console.log("hei"+e._id);


  $.ajax({
    url: "http://localhost:8080/del/",
    type: "DELETE",
    data : key,

    success:function(dat){
      console.log("successfully deleted"+ dat);

      this.setState({content:"deleted"});
    }.bind(this),
    error : function(err,dat){
      console.log(err, dat);
      console.log(dat);
    }
  })
}
  //end

  render(){
    const listdat=this.props.restaurantData;
    const listItems=listdat.map((dat,index)=>{
      var img;
      if (dat.image)
        img=dat.image
      else
        img="http://coxsupply.com/welcome.png"
      return (
        <Card key={String(index)} color='red'>
        <Card.Content>
        <Image floated='left' size='medium' src={img} />
        <Card.Header>
        {dat.name}
        </Card.Header>
        <Card.Meta>
        rating : {dat.rating} &nbsp; votes : {dat.votes}
        </Card.Meta>
        <Card.Description>
        {String(dat.address)}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Card.Header></Card.Header>
        <a>
        <div className='ui two buttons'>
        </div>
        </a>
        <div className='ui two buttons'>
        <a href ="#">
        <Button basic color='green' onClick={this.savedata.bind(this,dat)}> Save to Favourites</Button>
        
        </a>
        </div>
        </Card.Content>
        </Card>
        );
    })
    return <Card.Group itemsPerRow={3} color='red'> {listItems}  </Card.Group>;

//return null;

}
}
