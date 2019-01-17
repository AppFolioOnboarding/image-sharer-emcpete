import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class URLForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      urlValid: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.validateField("url", this.state.url)) {
      this.setState({urlValid: true});
    } else {
      this.setState({urlValid: false});
      return false;
    }
    this.props.onURLForm(this.state.url);

    fetch('/api/v1/images.json', {
        method: 'POST',
        body: JSON.stringify({ image: {url: this.state.url }}),
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        }
    }).then(
      (result) => {
        if(!result.ok) {
          this.setState({
            urlValid: false
          });
          return false;
        }
        this.setState({url: ''});
      }
    )
  }

  validateField(fieldName, value) {
    var isValid = false;
    switch(fieldName) {
      case 'url':
        isValid = value.match(/^(ftp|http|https):\/\/[^ "]+$/i);
        break;
      default: break;
    }
    return isValid;
  }

  getErrorClass(fieldIsValid) {
    return fieldIsValid ? '' : 'is-invalid';
  }

  render() {
    return (
      <div className="m-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
          <label>Image URL:</label>
          <input type="text" className={'form-control ' + this.getErrorClass(this.state.urlValid)} aria-describedby="urlHelp" placeholder="Enter URL" value={this.state.url} onChange={this.handleChange} />
          <small id="urlHelp" className="form-text text-muted ">Enter an image URL.</small>
          <div class="invalid-feedback">That URL is invalid.</div>
          <input type="submit" className="mt-3" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

class DisplayImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      images: []
    };
  }

  componentDidMount() {
    fetch('/api/v1/images.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            images: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, images } = this.state;
    if (error) {
      return <div className="m-5">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="m-5">Loading...</div>;
    } else {
      return (
        <div>
          {images.map(item => (
            <div className="m-5" key={item.id} >
              <img src={item.url} />
            </div>
          ))}
        </div>
      );
    }
  }
}

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
        <DisplayImages url={this.state.url}/>
      </div>
    )
  }
}

ReactDOM.render(
<ImageSharer />,
  document.getElementById('test')
)
