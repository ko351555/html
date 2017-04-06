import React from 'react';
import { Icon,Input,Button,Dropdown,Card, Image,Label,Segment,Popup,Form, TextArea   } from 'semantic-ui-react';
import $ from 'jquery';
/*Class for Dropdown props: states: */
export default class GetCusine extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
     restaurants : this.props.savedRestaurants,
     textContent : '',
     deletedId : ''
   }
 }
 getTheContent(e){
   this.setState({textContent:e.target.value})
 }

 deleteFromDB(e,data){

   console.log(e._id);
   const deleteIdObject = {"_id":e._id}
   const restaurants = this.state.restaurants;

   $.ajax({
     url: "http://localhost:8080/delete/",
     type: "DELETE",
     data : deleteIdObject,

     success:function(dat){
       console.log(dat);
       this.setState({deletedId:e._id});
       const index = restaurants.indexOf(e);
       restaurants.splice(index, 1);
       this.setState({restaurants:restaurants});

     }.bind(this),
     error : function(err,dat){
       console.log(err, dat);
       console.log(dat);
     }
   })
 }
 updateThisRestaurant(e,data){
   e.review = this.state.textContent;
   $.ajax({
     url: "http://localhost:8080/update/",
     type: "PUT",
     data : e,
     success:function(dat){
       console.log("success "  );
       console.log(dat);
     },
     error : function(err,dat){
       console.log(err, dat);
       console.log(dat);
     }
   })
 }
 render () {
   const savedRestaurants = this.state.restaurants;
   const deletedId = this.state.deletedId.toString();

   const Cards = savedRestaurants.map((restaurant)=>{
     console.log(restaurant)
     return(
       <Card key={restaurant._id.toString()}>
       <Segment raised>
       <Popup
       trigger={<Label as='a' color='red' corner onClick={this.deleteFromDB.bind(this,restaurant)} ><Icon name='hand scissors' /></Label>}
       content= 'Dont like it! Delete it!'
       basic />
       <Image src={restaurant.image} height='50%' />
       </Segment>
       <Card.Content>
       <Card.Header>{restaurant.name}</Card.Header>
       <Card.Meta>Rating : {restaurant.rating} Votes: {restaurant.votes}</Card.Meta>
       <Card.Description>{restaurant.address}</Card.Description>
       </Card.Content>
       <Card.Content extra>
       <Card.Header>Review Us</Card.Header>
       <Form>
       <TextArea placeholder='Feel free,Let us improve'  autoHeight onChange={this.getTheContent.bind(this)} />
       </Form>
       <a>
       <div className='ui two buttons'>
       <Button basic color='red' onClick={this.updateThisRestaurant.bind(this,restaurant)}>Add my review</Button>
       </div>
       </a>
       </Card.Content>
       </Card>)
});
return (
  <div>
  <Card.Group itemsPerRow={3}>{Cards}</Card.Group>
  </div>
  );
}
// componentDidMount(){}
}