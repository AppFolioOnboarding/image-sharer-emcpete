import React, {Component} from 'react'
import { Button, Badge } from 'reactstrap';

class FilterLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.clearFilter = this.clearFilter.bind(this);
  }

  clearFilter() {
    this.props.onClearFilter();
  }

  render() {
    return (
        <div>
            <h5>
                Images Filtered By: <Badge color="secondary">{this.props.filter} </Badge>
                <Button color="link" className="pl-1 ml-2" onClick={this.clearFilter}>clear filter</Button>
            </h5>
        </div>
    );
  }
}

export default FilterLabel;