/* eslint-disable */
import React, { Component } from "react";
import {Link} from "react-router-dom"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axios from "axios";


const muteParaStyle = { fontSize: 12};
class Product extends Component {

    state = {
       
 
        
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
   


<p class="text-secondary" style = {muteParaStyle}><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Availability </p>  
<Link className="avenger-detail" to={"/detail/"+ this.props.product.id}>
    
                        <button className="btn btn-warning">Show more...</button>
</Link> <span>&nbsp;&nbsp;</span>

<BootstrapSwitchButton
    checked={this.props.product.isAvailable}
    onlabel='ON'
    offlabel='OFF'
    onChange={(checked: true) => {


        if(checked == true){

        
              this.props.onTrueAvailable()
            
        }

        if(checked == false){

            this.props.onFalseAvailable()
            
        }
       
    }}
    width={80}
    onstyle="outline-success" 
    offstyle="outline-danger"
/> 
<br/>
<br/>

<Link className="edit-link" to={"/edit/"+ this.props.product.id}>
                        <button className="btn btn-outline-primary">Edit</button>
                    </Link> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button
    className="btn btn-outline-danger"
    onClick= {this.props.onDelete}

    >
        Delete
</button>

       
       
                    
  </div>
</div>
</div>

      

        );
    }
}

export default Product;