import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class URLForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    this.props.onURLForm(this.state.url);
    this.setState({url: ''});
    event.preventDefault();
  }

  render() {
    return (
      <div className="m-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
          <label>Image URL:</label>
          <input type="text" className="form-control" aria-describedby="urlHelp" placeholder="Enter URL" value={this.state.url} onChange={this.handleChange} />
          <small id="urlHelp" className="form-text text-muted">Enter an image URL.</small>
          <input type="submit" className="mt-3" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

const DisplayImage = props => (
  <div className="m-5">
    <img src={props.url} />
  </div>
)

class ImageSharer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  handleURL = (urlValue) => {
    this.setState({url: urlValue});
  }

  render() {
    return (
      <div>
        <URLForm onURLForm={this.handleURL}/>
        <DisplayImage url={this.state.url}/>
      </div>
    )
  }
}

ReactDOM.render(
<ImageSharer />,
  document.getElementById('test')
)
