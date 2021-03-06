import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Editproduct from './editproduct';
import Confirmdelete from '../Dialogs/confirm';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345
	},
	media: {
		height: 0,
		backgroundSize: 'contain',
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatarRed: {
		backgroundColor: red[500]
	},
	avatarGreen: {
		backgroundColor: green[500]
	}
}));

export default function RecipeReviewCard(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ expanded, setExpanded ] = React.useState(false);
	const [ editopen, setEditopen ] = React.useState(false);
	const [ deleteopen, setDeleteopen ] = React.useState(false);

	const classes = useStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleEditopen = () => {
		setEditopen(true);
	};
	const handleEditclose = () => {
		setEditopen(false);
	};

	const handleDeleteopen = () => {
		setDeleteopen(true);
	};
	const handleDeleteclose = () => {
		setDeleteopen(false);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={{
					...(props.product.isAvailable ? (
						<Tooltip title="Available" placement="top">
							<Avatar aria-label="recipe" className={classes.avatarGreen}>
								A
							</Avatar>
						</Tooltip>
					) : (
						<Tooltip title="Out of Stock">
							<Avatar aria-label="recipe" className={classes.avatarRed}>
								O
							</Avatar>
						</Tooltip>
					))
				}}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon onClick={handleClick} />
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem opened="true" onClick={handleEditopen}>
								Edit
							</MenuItem>
							<MenuItem opened="true" onClick={handleDeleteopen}>
								Delete
							</MenuItem>
							{/* {props.product.isAvailable ? <MenuItem onClick={handleMenuClose}>Out of stock</MenuItem> : null} */}
						</Menu>
					</IconButton>
				}
				title={props.product.name}
				subheader={props.product.category}
			/>
			<CardMedia className={classes.media} image={props.product.imgUrl} />

			<CardActions disableSpacing>
				Rs {props.product.price}
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Description:</Typography>

					<Typography paragraph>{props.product.description}</Typography>
				</CardContent>
			</Collapse>
			{editopen ? (
				<Editproduct
					itemid={props.product.id}
					handleEditclose={handleEditclose}
					handleMenuClose={handleMenuClose}
				/>
			) : null}
			{deleteopen ? (
				<Confirmdelete
					itemid={props.product.id}
					itemname={props.product.name}
					handleMenuClose={handleMenuClose}
					handleDeleteclose={handleDeleteclose}
				/>
			) : null}
		</Card>
	);
}
