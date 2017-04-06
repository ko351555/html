import React from 'react';
import { Button, Card, Image,Form, TextArea } from 'semantic-ui-react'
var $ = require('jquery');

export default class Display extends React.Component {
  constructor(props){
    super(props);
    this.state = {'id': '' , 'name': '' , 'address': '', 'rating': '' ,'viewArray' : [],
    'comment': '', content: 'Add to Favourites', disable: false,textContent:''}

  }
  getTheContent(e){
   this.setState({textContent:e.target.value})
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



updatebyid(e)
{

  var data1={
    comment:this.state.textContent,
    id:e._id

  }

  $.ajax({
    url: "http://localhost:8080/updatebyid/",
    type: "PUT",
    data : data1,

    success:function(dat){
     console.log(dat);

     this.setState({content:"updated"});
   }.bind(this),
   error : function(err,dat){
    console.log(err, dat);
    console.log(dat);
  }
})
}
         //end

         render(){
          const listdat=this.props.card3;
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
              <Card.Header>Comment Us</Card.Header>
              <Form>
              <TextArea placeholder='comments' 
              autoHeight onChange={this.getTheContent.bind(this)} />

              </Form>
              <br/>
              <br/>
              <a>
              <div className='ui two buttons'>
              <Button  color='red' onClick={this.updatebyid.bind(this,dat)}>Add my review</Button>
              </div>
              </a>
              <div className='ui two buttons'>
              <a href ="#">
              <Button  color='green' onClick={this.deleteid.bind(this,dat)}>Deleting data</Button>
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
