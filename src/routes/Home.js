import React, {Component, PropTypes} from 'react';
import { connect } from "react-redux";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Layout from './Layout';

import { fetchUsers } from "actions/user";


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class IndexPage extends Component {

	componentDidMount(){
		this.props.getUsers();
	}

	render() {
		return (
			<Layout title="Home">
				<div id="page-index" className="page" style={{marginTop:10}}>
					<List>
		        <Subheader>Today</Subheader>
						{ this.props.users.map( (item, index) => ([
			        <ListItem
								key={item.id}
			          leftAvatar={<Avatar>{item.firstName.charAt(0).toUpperCase()}</Avatar>}
								rightIconButton={rightIconMenu}
			          primaryText={item.firstName}
			          secondaryText={
			            <p>
			              {item.email}
			            </p>
			          }
			          secondaryTextLines={2}
			        />,  <Divider inset={true} /> ]
						))}
		      </List>

				</div>
			</Layout>);
	}
}

IndexPage.propTypes = {
  users: PropTypes.array,
	getUsers: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  users: user.users,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
