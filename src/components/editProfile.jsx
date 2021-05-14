import React, { Component, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from "react-router-dom"

let token =localStorage.getItem('login')

const errStyle = { color:'red',  fontSize: 14};


export default class EditProfile extends Component {

  constructor(props) {
    super(props)

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);

     // State
     this.state = {
        userName: '',
        email: '',

        errormessage: ''
       
  
      
        
      }
    
    
  }


 


  async componentDidMount() {


    let token =localStorage.getItem('login')

    await axios.post('http://localhost:5000/api/auth/get/userId',token,{
       
        headers:{
          'token':token
        }
      })
    .then((res) => {

     if(res.data){

      
      this.setState({userId: res.data});

     

     }

     else{
        console.log("Error while authorization please Log in again.")
      }
      
      
    }).catch((error) => {
      console.log('Error while authorization please Log in again.')
      console.log(error)
    })


   
    
    axios.get('http://localhost:5000/api/users/' + this.state.userId)
      .then(res => {
        this.setState({
            userName: res.data.userName,
           
            email:res.data.email
            
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUserName(e) {
    
    this.setState({ userName: e.target.value })
    
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }

  


  onSubmit(e) {
    e.preventDefault();

   
         const userObject = {
      userName: this.state.userName,
      email: this.state.email
    };


    axios.put('http://localhost:5000/api/users/' + this.state.userId, userObject)
      .then((res) => {
        console.log(res.data)
        console.log('User profile updated successfully')
            // Redirect to Student List 
            this.props.history.push('/products')
      }).catch((error) => {
        console.log(error)
      })
    }

   
  

  
 

  

  render() {
      
    return (
        
        
    <div onSubmit={this.mySubmitHandler} className="form-wrapper" ><br/><br/>
             <br/> <h3 className="text-center">Edit Your Profile Here</h3>
      <form  onSubmit={this.onSubmit}>
        <Form.Group  controlId="Name">
          <br/> <br/><br/><br/>
          <span>&nbsp;&nbsp;&nbsp;</span>  <Form.Label class="text-primary">Name</Form.Label>
          <Form.Control type="text" autoComplete="off"  value={this.state.userName} onChange={this.onChangeUserName} />
        </Form.Group><br/>

        <Form.Group controlId="Email">
          <span>&nbsp;&nbsp;&nbsp;</span>  <Form.Label class="text-primary">Email</Form.Label>
          <Form.Control type="text" autoComplete="off" value={this.state.email} onChange={this.onChangeEmail} />
        </Form.Group><br/>

       

        <Button variant="outline-success" size="lg" block="block" type="cancel">
         Update Profile
        </Button><br/><br/>
        <Link to={"/products"}> <Button variant="btn btn-outline-dark" size="lg" block="block" type="submit"> 
          Cancel
        </Button></Link>
      </form>
    </div>);
  }
}
