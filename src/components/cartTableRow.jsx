/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
       
    }

    
    
 

    

    render() {
        return (
         
            <tbody>
            <tr>
                <td width="50"> <img src={this.props.avenger.imgUrl} width="80" height="80"></img></td>
                <td width="120">{this.props.avenger.name}</td>
                <td width="170">{this.props.avenger.description}</td>
                <td width="100">Rs. {this.props.avenger.price}</td>
                <td width="150">{this.props.avenger.category}</td>
                
                <td width="100"> 
                    
                    <Button  onClick={this.props.onDelete} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
            </tbody>
            
        );
    }
}