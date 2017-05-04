import React, {Component, PropTypes} from 'react';
import { connect } from "react-redux";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import ThemeDefault from '../theme-default';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Header from 'components/Header';
import LeftDrawer from 'components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import { userLogout } from "actions/user";
import Data from './data';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
      navDrawerOpen: false
    };
	}

	componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

	static propTypes = {
		title: React.PropTypes.string.isRequired
	};

	handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

	render() {
		let { navDrawerOpen } = this.state;
		const paddingLeftDrawerOpen = 236;
		const styles = {
			header: {
				paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
			},
			container: {
				margin: '80px 20px 20px 15px',
				paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
			}
		};

		return (
			<MuiThemeProvider muiTheme={ThemeDefault}>
				<div id="layout" style={{backgroundColor: 'white'}}>
					<Header styles={styles.header}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
						handleLogout={this.props.logout}/>
					<LeftDrawer navDrawerOpen={navDrawerOpen}
            menus={Data.menus}
            username="User Admin"/>
					{this.props.children}
				</div>
			</MuiThemeProvider>);
	}
}

Layout.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatchToProps)(Layout);
