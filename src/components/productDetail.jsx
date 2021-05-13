import React, { Component } from "react";
import axios from 'axios';
import {decode as base64_decode, encode as base64_encode} from 'base-64'


export default class ProductDetail extends Component {

  constructor(props) {
    super(props)

    
   
    // State
    this.state = {
      name: '',
      description: '',
      price: '',
      imgUrl: '',
      isAvailable:'',
      category:[],
      userId:"",


      
    }
  }

 async componentDidMount() {
   
   await axios.get('http://localhost:5000/api/products/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          isAvailable: res.data.isAvailable,
          price: res.data.price,
          description: res.data.description,
          imgUrl: res.data.imgUrl,
          category:res.data.category,

          
        
        });
      })
      .catch((error) => {
        console.log(error);
      })


  }

 

  render() {

    return(
      <div> <br/><br/><br/>
        <div  className="card"   style={{width: "18rem"}}>
        <img src={this.state.imgUrl} height="350" className="card-img-top"  alt="..."/>
        <div className="card-body">
              <h5 className="card-title">{this.state.name}</h5>
          <p className="card-text">{this.state.description}</p><br></br>
          <p className="card-text">PRICE:<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Rs. {this.state.price}</p>
         <p className = "">{this.state.category.map((movie, index) => (
        <p key= {index}>CATEGORY: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{movie}</p>
        ))} </p>
        
        <p className="card-text">AVAILABILITY:  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>   {String(this.state.isAvailable)}</p>
          
          </div>

          </div>
</div>

    )
  }

}
