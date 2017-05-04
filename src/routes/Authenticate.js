import React, {Component, PropTypes as PT} from "react";
import { connect } from "react-redux";
import { addFlashMessage } from "actions/flashMessages";


export default function(ComposedComponent) {

    class Authenticate extends Component {

        static propTypes = {
            isAuthenticated: PT.bool,
            addFlashMessage: PT.func.isRequired
        }

        static contextTypes = {
            router: PT.object.isRequired
        }

        static defaultProps = {
            isAuthenticated: false
        }

        componentWillMount() {
            if(!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to login to access this page."
                });
                this.context.router.push("/");
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.push("/dashboard");
            }
        }

        render() {
            return ( <ComposedComponent {...this.props} /> );
        }

    }

    const mapStateToProps = ({ user }) => ({
        isAuthenticated: user.isAuthenticated
    });

    const mapDispatchToProps = dispatch => ({
        addFlashMessage: (sms) => dispatch(addFlashMessage(sms))
    });

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
