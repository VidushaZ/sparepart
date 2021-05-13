import React, { Component } from "react";
import Order from "./order";
import axios from "axios";


let token =localStorage.getItem('login')

class Orders extends Component {

    state = {

        allOrders: [],
        allOrderItems: [],
        allOrderStatus: [],
        
       
        
       
    };
    render() {
      
       
        
        return (
            <div className="container" > <br/><br/><br/><br/>
              <h3 className="text-center">CUURENT ORDERS</h3><br/><br/>
               
                <div className="row">
            
                    {this.state.allOrders.map((order) => (

                        <div  key={order.orderId} className="col">
                        <Order 
                        key= {order.orderId}
                        order={order}

                        onDeleteOrder={() => this.deleteOrder(order.orderId)}
                        onUpdateOrderStatusPreparing={() => this.updateOrderStatusPreparing(order.orderId)}
                        onUpdateOrderStatusProcessing={() => this.updateOrderStatusProcessing(order.orderId)}
                        onUpdateOrderStatusDelivered={() => this.updateOrderStatusDelivered(order.orderId)}
                       
                         
                       

                        />
                         
                    </div>

                    

                    ))}


                    

                </div>
            </div>
            
        );
    }
    async componentDidMount() {
        const {data} = await axios.get("http://localhost:5000/api/orders", {
             headers:{
            "token":token
        }
        });
        let orders = data.map((order) => {
            return{
                orderId: order,
            
                
            };
        });
        this.setState({ allOrders: orders});


      



    }

    async deleteOrder(orderId){
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`,{

        headers:{
            "token":token
        }
        });
        let updatedOrders = this.state.allOrders.filter(
            (order) => order.orderId !== orderId,

        );
        this.setState({allOrders: updatedOrders});
    }


    async updateOrderStatusPreparing(orderId){

        const statusObject = {
          status: "Preparing",
          
        };
        console.log("Order status changed to Preparing")
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, statusObject,{

       
      
        headers:{
            "token":token
        }
        });
        
      }


      async updateOrderStatusProcessing(orderId){

        const statusObject = {
          status: "Processing",
          
        };
        console.log("Order status changed to Processing")
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, statusObject,{

       
      
        headers: {
            "token":token
        }
        });
        
      }

      async updateOrderStatusDelivered(orderId){

        const statusObject = {
          status: "Delivered",
          
        };
        console.log("Order status changed to Delivered")
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, statusObject,{

       
      
        headers:{
            "token":token
        }
        });
        
      }
     


        
    }

    

     


    


export default Orders; 