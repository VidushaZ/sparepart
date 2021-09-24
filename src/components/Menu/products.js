import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Productadd from '../Products/productadd';

const useStyles = makeStyles(() => ({
	button: {
		color: 'white',
		fontSize: '14px'
	}
}));

export default function SimpleMenu() {
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ addopen, setAddopen ] = React.useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setAddopen(true);
	};

	return (
		<div>
			<Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				Products
			</Button>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={handleClose}>
					<Link to="Products">Products</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link>Add Products</Link>
				</MenuItem>
			</Menu>
			{addopen ? <Productadd /> : null}
		</div>
	);
}
