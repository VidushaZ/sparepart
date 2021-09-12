import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
	const { handleMenuClose, handleDeleteclose, itemid ,itemname } = props;
	const [ open, setOpen ] = React.useState(true);

	React.useEffect(() => {
		handleMenuClose();
	});

	const handleClose = () => {
		setOpen(false);
		handleDeleteclose();
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Are you sure you want to delete {itemname}?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Clicking Yes will delete this item permanently
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						No
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
