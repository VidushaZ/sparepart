import React, { Component } from "react";
import Product from "./homeProduct";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'


const danger = { color:'red',  fontSize: 12};
const green = { color:'green',  fontSize: 12};
const blue = { color:'blue',  fontSize: 12};
const defaultStyle = {font:12};
let token =localStorage.getItem('login')

class HomeProductsUsers extends Component {

    state = {

        allProducts: [],
        newConfirm:'',
        totalCases:'',
        newDeaths:'',
        totalDeaths:'',
        newRecovered:'',
        totalRecovered:'',


       
  
       
        
       
    };
    render() {

        return (
            <div className="container" > 
              
               <br></br><br></br> <br></br><br></br>
               <h4 className="text-center">All Products</h4>
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
                        onAddCart={() => this.addCart(product.id)}

                        />
                         
                    </div>

                    

                    ))}

                </div>
            </div>
            
        );
    }
    async componentDidMount() {
        const {data} = await axios.get("http://localhost:5000/api/products/available/");
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


        await axios({
          method: "GET",
          url: "https://api.covid19api.com/summary",
          
        })
         
       
          .then((response) => {
            
            this.setState({ newConfirm: response.data.Global.NewConfirmed})
            this.setState({ totalCases: response.data.Global.TotalConfirmed})
            this.setState({ newDeaths: response.data.Global.NewDeaths})
            this.setState({ totalDeaths: response.data.Global.TotalDeaths})
            this.setState({ newRecovered: response.data.Global.NewRecovered})
            this.setState({ totalRecovered: response.data.Global.TotalRecovered})


          

          })
          .catch((error) => {
            console.log(error);
          });



        
    }

    


   
    async Currency(){

        await axios({
            method: "GET",
            url: "https://v6.exchangerate-api.com/v6/b1545c28a1aa27fbdd3d66ad/latest/LKR",
            
          })
           
         
            .then((response) => {
              
            localStorage.setItem(`exRate`, response.data.conversion_rates.USD)


              console.log(response.data.conversion_rates.USD);

            })
            .catch((error) => {
              console.log(error);
            });
            
    }


    
 

    
    async deleteProduct(id){
        await axios.delete(`http://localhost:5000/api/avengers/${id}`,{

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


    async addCart(id) {

        await axios.get(`http://localhost:5000/api/products/${id}`)
        .then(res => {
          this.setState({
            name: res.data.name,
            price: res.data.price,
            description: res.data.description,
            imgUrl: res.data.imgUrl,
            category:res.data.category,
  
            
          
          });
        })
        .catch((error) => {
          console.log(error);
        })

    
        let token =localStorage.getItem('login')
      
        await axios.post('http://localhost:5000/api/auth/get/userId',token,{
           
            headers:{
              'token':token
            }
          })
        .then((res) => {
      
         if(res.data){
      
          this.userId =(res.data);
      
         
      
         }
      
         else{
            console.log("Error while authorization please Log in again.")
          }
          
          
        }).catch((error) => {
          console.log('Error while authorization please Log in again.')
          console.log(error)
        })
      
      
          const CartAvengerObject = {
            
            userId:this.userId,
            name: this.state.name,
            price: this.state.price,
            category: this.state.category,
            imgUrl:this.state.imgUrl,
            description:this.state.description,

            
          };
      
          
      
         await axios.post(`http://localhost:5000/api/carts/`, CartAvengerObject,{
            headers:{
              "token":token
            }
          })
            .then((res) => {
              console.log(res.data)
              console.log(token)
              console.log('Avenger added to cart successfully ')
                 
            }).catch((error) => {
              console.log(error)
            })
      
      
      
        }

}
export default HomeProductsUsers; 