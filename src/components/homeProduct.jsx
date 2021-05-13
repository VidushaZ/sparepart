import React, { Component } from "react";
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button';


class HomeProductUser extends Component {

    state = {
       
    
        name: '',
        description: '',
        price: '',
        imgUrl: '',
        category:[],
        userId:""
 
        
    };
    

  
    showcategory() {
        if (this.props.product.category.length == 0) return <p>No category available</p>;
        return this.props.product.category.map((movie, index) => (
        <li key= {index}>{movie}</li>
        ));
    }



    
    render() {
     
      
        return (
        
           <div> 
               
           <div  className="card"  style={{width: "18rem"}}>
               
              
  <img src={this.props.product.imgUrl} width="100" height="200" className="card-img-top" alt="..."/>
  <div className="card-body">
        <h5 className="card-title"><p class="text-light bg-dark">{this.props.product.name}</p></h5>
        <p className="text-muted">{this.showcategory()}</p>
    <p className="card-text">RS. {this.props.product.price}</p>
   
    <button className="btn btn-warning" onClick={this.props.onAddCart}>Add to Cart</button> <br/> <br/><br/>

<Link className="avenger-detail" to={"/products/"+ this.props.product.id}>
    
<span></span>    <Button variant="light">Show more...</Button>
</Link> 
              
  </div>

</div>
<br/><br/><br/><br/>
</div>

      

        );
    }
}

export default HomeProductUser;