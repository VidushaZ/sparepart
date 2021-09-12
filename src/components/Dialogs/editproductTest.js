import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

export default function FormDialog(props) {
	const { handleMenuClose, handleEditclose, opened } = props;
	const [ open, setOpen ] = React.useState(true);

	React.useEffect(() => {
		handleMenuClose();
	});

	const handleClickOpen = () => {
		setOpen(true);
		handleMenuClose();
	};

	const handleClose = () => {
		setOpen(false);
		handleEditclose();
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
					<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
					<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
					<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
					<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
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
