import React, { Component } from "react";
import Product from "./product";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'


let token =localStorage.getItem('login')

class Products extends Component {

    state = {

        allProducts: [],
        rate:""
       
        
       
    };
    render() {
      
       
        
        return (
            <div className="container" > 
               <Carousel className="d-block w-100">
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100"
      src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/01/19/950817-covid19.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100"
      src="https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/who_hydroxychloraquine_hd.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100"
      src="https://www.hpcismart.com/images/website/ManChemNews/DIR_189/F_98505.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
               <br></br><br></br>
               
                <div className="row">
            
                    {this.state.allProducts.map((product) => (

                        <div  key={product.id} className="col">
                        <Product 
                        key= {product.id}
                        product={product}
                         
                        onTrueAvailable={() => this.availabilityTrue(product.id)}
                         onFalseAvailable={() => this.availabilityFalse(product.id)}
                        onDelete={() => this.deleteProduct(product.id)}
                        onCurrency ={() => this.Currency(product)}

                        />
                         
                    </div>

                    

                    ))}

                </div>
            </div>
            
        );
    }
    async componentDidMount() {
        const {data} = await axios.get("http://localhost:5000/api/products/");
        let products = data.map((product) => {
            return{
                id: product._id,
                imgUrl:product.imgUrl,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                isAvailable: product.isAvailable,
            };
        });
        this.setState({ allProducts: products});



        


    }

   
    async deleteProduct(id){
        await axios.delete(`http://localhost:5000/api/products/${id}`,{

        headers:{
            "token":token
        }
        });
        let updatedProducts = this.state.allProducts.filter(
            (product) => product.id !== id,

        );
        this.setState({allProducts: updatedProducts});
    }

     async availabilityTrue(id){

         const setAvailable = {

             isAvailable: true

         }
         
        await axios.put(`http://localhost:5000/api/products/availablity/${id}`, setAvailable,{

headers:{
        "token":token
    }
      
        });
       
    }

     async availabilityFalse(id){

         const setAvailable = {

             isAvailable: false

         }
         
        await axios.put(`http://localhost:5000/api/products/availablity/${id}`, setAvailable,{

headers:{
        "token":token
    }
      
        });
       
    }
}

export default Products; 