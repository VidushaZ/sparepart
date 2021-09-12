import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

let token = localStorage.getItem('login');

const errStyle = { color: 'red', fontSize: 14 };

export default class EditAvenger extends Component {
	constructor(props) {
		super(props);

		this.onChangeProductName = this.onChangeProductName.bind(this);
		this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
		this.onChangeProducPrice = this.onChangeProducPrice.bind(this);
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
			isAvailable: '',
			category: '',
			errormessage: ''
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/api/products/' + this.props.match.params.id, {
				headers: {
					token: token
				}
			})
			.then((res) => {
				this.setState({
					name: res.data.name,
					isAvailable: res.data.isAvailable,
					price: res.data.price,
					description: res.data.description,
					imgUrl: res.data.imgUrl,
					category: res.data.category
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onChangeProductName(e) {
		this.setState({ name: e.target.value });
	}

	onChangeProductDescription(e) {
		this.setState({ description: e.target.value });
	}

	onChangeProducPrice(e) {
		this.setState({ price: e.target.value });
	}

	onChangeProductCategory(e) {
		this.setState({ category: e.target.value });
	}

	onChangeProductIsAvailable(e) {
		this.setState({ isAvailable: e.target.value });
	}

	onChangeProductImgUrl(e) {
		this.setState({ imgUrl: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const productObject = {
			name: this.state.name,
			description: this.state.description,
			price: this.state.price,
			category: this.state.category,
			isAvailable: this.state.isAvailable,
			imgUrl: this.state.imgUrl
		};

		axios
			.put('http://localhost:5000/api/products/' + this.props.match.params.id, productObject, {
				headers: {
					token: token
				}
			})
			.then((res) => {
				console.log(res.data);
				console.log('Product successfully updated');
				// Redirect to Student List
				this.props.history.push('/products');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div onSubmit={this.mySubmitHandler} className="form-wrapper">
				<br />
				<br />
				<br /> <h3 className="text-center">Edit Your Existing Product Here</h3>
				<form onSubmit={this.onSubmit}>
					<Form.Group controlId="Name">
						<br /> <br />
						<br />
						<br />
						<span>&nbsp;&nbsp;&nbsp;</span> <Form.Label class="text-primary">Name</Form.Label>
						<Form.Control
							type="text"
							autoComplete="off"
							value={this.state.name}
							onChange={this.onChangeProductName}
						/>
						{this.state.errormessage}
					</Form.Group>
					<br />

					<Form.Group controlId="BirthName">
						<span>&nbsp;&nbsp;&nbsp;</span> <Form.Label class="text-primary">Description</Form.Label>
						<Form.Control
							type="text"
							autoComplete="off"
							value={this.state.description}
							onChange={this.onChangeProductDescription}
						/>
					</Form.Group>
					<br />

					<Form.Group controlId="LikeCount">
						<span>&nbsp;&nbsp;&nbsp;</span> <Form.Label class="text-primary">Price </Form.Label>
						<Form.Control
							type="text"
							autoComplete="off"
							value={this.state.price}
							onChange={this.onChangeProducPrice}
						/>
					</Form.Group>
					<br />

					<Form.Group controlId="Movies">
						<span>&nbsp;&nbsp;&nbsp;</span> <Form.Label class="text-primary">Category</Form.Label>
						<Form.Control
							type="text"
							autoComplete="off"
							value={this.state.category}
							onChange={this.onChangeProductCategory}
						/>
					</Form.Group>
					<br />

					<Form.Group controlId="Deceased">
						<span>&nbsp;&nbsp;&nbsp;</span> <Form.Label class="text-primary">Availablity Status</Form.Label>
						<Form.Control
							type="text"
							autoComplete="off"
							value={this.state.isAvailable}
							onChange={this.onChangeProductIsAvailable}
						/>
					</Form.Group>
					<br />

					<Form.Group controlId="ImgUrl">
						<span>&nbsp;&nbsp;&nbsp;</span> <Form.Label class="text-primary">ImgUrl</Form.Label>
						<Form.Control
							type="text"
							autoComplete="off"
							value={this.state.imgUrl}
							onChange={this.onChangeProductImgUrl}
						/>
					</Form.Group>
					<br />

					<Button variant="outline-success" size="lg" block="block" type="cancel">
						Update Product
					</Button>
					<br />
					<br />
					<Link to={'/Avengers'}>
						{' '}
						<Button variant="btn btn-outline-dark" size="lg" block="block" type="submit">
							Cancel
						</Button>
					</Link>
				</form>
			</div>
		);
	}
}
