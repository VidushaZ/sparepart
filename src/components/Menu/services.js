import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Serviceadd from '../Services/serviceadd';

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

	const handleCloseOnly = () => {
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setAddopen(true);
	};
	const handleaddopen = () => {
		setAddopen(false);
	};

	return (
		<div>
			<Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				Services
			</Button>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseOnly}>
				<MenuItem onClick={handleCloseOnly}>
					<Link to="Services">Services</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link>Add Services</Link>
				</MenuItem>
			</Menu>
			{addopen ? <Serviceadd handleaddopen={handleaddopen} /> : null}
		</div>
	);
}
