import React, {Component} from 'react'
import { Alert } from 'reactstrap';

class SuccessAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.onDismiss = this.onDismiss.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.show});
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                Image successly added!
          </Alert>
        );
    }
}

export default SuccessAlert;