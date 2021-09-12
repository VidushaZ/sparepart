import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function FormDialog(props) {
	let token = localStorage.getItem('login');
	const [ name, setName ] = React.useState('');
	const [ description, setDescription ] = React.useState('');
	const [ price, setPrice ] = React.useState('');
	const [ imgUrl, setImgUrl ] = React.useState('');
	const [ isAvailable, setIsAvaliable ] = React.useState('');
	const [ category, setCategory ] = React.useState('');
	const [ errormessage, setErrormessage ] = React.useState('');

	const { handleMenuClose, handleEditclose, itemid } = props;
	const [ open, setOpen ] = React.useState(true);

	React.useEffect(() => {
		handleMenuClose();
	});

	React.useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		axios
			.get('http://localhost:5000/api/products/' + itemid, {
				headers: {
					token: token
				}
			})
			.then((res) => {
				setName(res.data.name);
				setDescription(res.data.description);
				setPrice(res.data.price);
				setImgUrl(res.data.imgUrl);
				setCategory(res.data.category);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleClose = () => {
		setOpen(false);
		handleEditclose();
	};
	const onChangeProductName = (e) => {
		setName(e.target.value);
	};

	const onChangeProductDescription = (e) => {
		setDescription(e.target.value);
	};

	const onChangeProducPrice = (e) => {
		setPrice(e.target.value);
	};

	const onChangeProductCategory = (e) => {
		setCategory(e.target.value);
	};

	const onChangeProductIsAvailable = (e) => {
		setIsAvaliable(e.target.value);
	};

	const onChangeProductImgUrl = (e) => {
		setImgUrl(e.target.value);
	};

	return (
		<div>
			<Dialog
				disableBackdropClick
				fullWidth
				maxWidth="md"
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						value={name}
						label="Name"
						fullWidth
						onChange={onChangeProductName}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						value={description}
						label="Description"
						multiline
						fullWidth
						onChange={onChangeProductDescription}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						value={price}
						label="Price"
						fullWidth
						onChange={onChangeProducPrice}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						value={category}
						label="Cetegory"
						fullWidth
						onChange={onChangeProductCategory}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						value={imgUrl}
						label="Image Url"
						fullWidth
						onChange={onChangeProductImgUrl}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Save
					</Button>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
