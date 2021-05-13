import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from "react-router-dom"
import {decode as base64_decode, encode as base64_encode} from 'base-64'



export default class Register extends Component {

  constructor(props) {
    super(props)

    this.onChangeAvengerName = this.onChangeAvengerName.bind(this);
    this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
    this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
    this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
    this.onChangeProductIsAvailable = this.onChangeProductIsAvailable.bind(this);
    this.onChangeProductImgUrl = this.onChangeProductImgUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

     // State
     this.state = {
        name: '',
        description: '',
        price: '',
        imgUrl: '',
        isAvailable:'',
        category:[],
        errormessage: ''
       
  
      
        
      }
    
    
  }
  async componentDidMount() {

  


    let token =localStorage.getItem('login')

    await axios.post('http://localhost:5000/api/auth/check',token,{
       
        headers:{
          'token':token
        }
      })
    .then((res) => {
     if(res.data=="Admin"){

      let userRole = base64_encode(res.data);

      localStorage.setItem(`userRole`, userRole)
       console.log("User login successfully")
       console.log("Login role: ADMIN")
      
    
      
     }
    else if(res.data=="User"){
      let userRole = base64_encode(res.data);
      localStorage.setItem(`userRole`, userRole)
      console.log("User login successfully")
      console.log("Login role: USER")

     
     
     
    }

    else{
      console.log("Error while authorization")
    }
    
          
          
    }).catch((error) => {
      console.log('Authorization failed!')
      console.log(error)
    })
    

  
  }

  

  



  onChangeAvengerName(e) {
    
    
   
    this.setState({ name: e.target.value })
    
  }

  onChangeProductDescription(e) {
    this.setState({ description: e.target.value })
  }

  onChangeProductPrice(e) {
    this.setState({ price: e.target.value })
  }

  onChangeProductCategory(e) {
    this.setState({ category: e.target.value })
  }

  onChangeProductIsAvailable(e) {
    this.setState({ isAvailable: e.target.value })
  }

  onChangeProductImgUrl(e) {
    this.setState({ imgUrl: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    
         const avengerObject = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      isAvailable: this.state.isAvailable,
      imgUrl: this.state.imgUrl
    };

    

    let token =localStorage.getItem('login')
    axios.post('http://localhost:5000/api/products/', avengerObject,{
      headers:{
        "token":token
      }
    })
      .then((res) => {
        console.log(res.data)
        console.log(token)
        console.log('Student successfully updated')
            // Redirect to Student List 
            this.props.history.push('/products')
      }).catch((error) => {
        console.log(error)
      })
    
    

   
  }
  

  
 

  

  render() {
      
    return (
        
        
    <div onSubmit={this.mySubmitHandler} className="form-wrapper"><br/><br/>
       <br/> <h3 className="text-center">Add Your New Product Here</h3><br/><br/>
      <form  onSubmit={this.onSubmit}>
        <Form.Group  controlId="Name">
         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <Form.Label class="text-secondary">Name</Form.Label>
          <Form.Control type="text" autoComplete="off"  value={this.state.name} onChange={this.onChangeAvengerName} />
          {this.state.errormessage}
        </Form.Group><br/>

        <Form.Group controlId="description">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  <Form.Label class="text-secondary"> Description</Form.Label>
          <Form.Control type="text" autoComplete="off" value={this.state.description} onChange={this.onChangeProductDescription} />
        </Form.Group><br/>

        <Form.Group controlId="price">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  <Form.Label class="text-secondary">Price </Form.Label>
         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <Form.Control type="text" autoComplete="off" value={this.state.price} onChange={this.onChangeProductPrice} />
        </Form.Group><br/>

        <Form.Group controlId="category">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  <Form.Label class="text-secondary">Category</Form.Label>
          <Form.Control type="text"  autoComplete="off" value={this.state.category} onChange={this.onChangeProductCategory} />
        </Form.Group><br/>

        <Form.Group controlId="isAvailable">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  <Form.Label class="text-secondary">Availability Status</Form.Label>
          <Form.Control type="text"  autoComplete="off" value={this.state.isAvailable} onChange={this.onChangeProductIsAvailable} />
        </Form.Group><br/>

        <Form.Group controlId="ImgUrl">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  <Form.Label class="text-secondary">ImgUrl</Form.Label>
          <Form.Control type="text" autoComplete="off" value={this.state.imgUrl} onChange={this.onChangeProductImgUrl} />
        </Form.Group><br/>

       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <Button variant="btn btn-outline-success" size="lg" block="block" type="cancel">
          Add New Product
        </Button><br/><br/>
        <Link to={"/Avengers"}> <Button variant="btn btn-outline-dark" size="lg" block="block" type="submit"> 
          Cancel
        </Button></Link>
      </form>
    </div>);
  }
}
