import React, { Component } from 'react';
import Product from '../product';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Carousel from 'react-bootstrap/Carousel';
import Productlist from './productlist';
import Grids from './grid';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


let token = localStorage.getItem('login');
const Styles = (theme) => ({
	paper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		maxWidth: 345
	},
	Carousel: {
		maxHeight: '400px',
    position:"relative"
	},
  griditem:{
    maxWidth: '345px'
  }
});

class Products extends Component {
	state = {
		allProducts: [],
		rate: ''
	};
	render() {
		const { classes } = this.props;

		return (
			<div>
				<div  className={classes.Carousel}>
					<Carousel  className={classes.Carousel}>
						<Carousel.Item interval={2000} className={classes.Carousel}>
							<img
								className="d-block w-100"
								src="https://wallpapercave.com/wp/wp4043196.jpg"
								alt="First slide"
							/>
							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={2000} className={classes.Carousel}>
							<img
								className="d-block w-100"
								src="https://1.bp.blogspot.com/-xcmCaD7km_4/XWAbv3ZmCDI/AAAAAAAAAOo/DoFyVRvilKIBXf4eadtT8K_TiR7GZ5QDQCLcBGAs/w1200-h630-p-k-no-nu/Automobile%2BSpare%2BParts%2BBusiness.jpg"
								alt="Second slide"
							/>
							<Carousel.Caption>
								<h3>Second slide label</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</Carousel.Caption>
						</Carousel.Item>
						
						<Carousel.Item interval={2000} className={classes.Carousel}>
							<img
								className="d-block w-100"
								src="http://www.ifmpimeks.com/english/images/uretim.jpg"
								alt="Third slide"
							/>
							<Carousel.Caption>
								<h3>Third slide label</h3>
								<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</div>
				<br />
				<br />

				<Grid container spacing={1}>
					{this.state.allProducts.map((product) => (
						<Grid item xs={12} sm={6} md={3} className={classes.griditem} >
							<Productlist key={product.id} product={product} />
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
	async componentDidMount() {
		const { data } = await axios.get('http://localhost:5000/api/products/');
		let products = data.map((product) => {
			return {
				id: product._id,
				imgUrl: product.imgUrl,
				name: product.name,
				description: product.description,
				price: product.price,
				category: product.category,
				isAvailable: product.isAvailable
			};
		});
		this.setState({ allProducts: products });
	}

	async deleteProduct(id) {
		await axios.delete(`http://localhost:5000/api/products/${id}`, {
			headers: {
				token: token
			}
		});
		let updatedProducts = this.state.allProducts.filter((product) => product.id !== id);
		this.setState({ allProducts: updatedProducts });
	}

	async availabilityTrue(id) {
		const setAvailable = {
			isAvailable: true
		};

		await axios.put(`http://localhost:5000/api/products/availablity/${id}`, setAvailable, {
			headers: {
				token: token
			}
		});
	}

	async availabilityFalse(id) {
		const setAvailable = {
			isAvailable: false
		};

		await axios.put(`http://localhost:5000/api/products/availablity/${id}`, setAvailable, {
			headers: {
				token: token
			}
		});
	}
}
export default withStyles(Styles)(Products);
