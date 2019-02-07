import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import TagsInput from 'react-tagsinput';

class FormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      id: '',
      urlValid: true,
      modal: false,
      tags: [],
      tag: '',
      tagsValid: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.doImageValidation = this.doImageValidation.bind(this);

    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { id, url, tag_list } = nextProps.image;
    this.setState({
      modal: nextProps.show,
      url: url,
      id: id,
      tags: tag_list
    });
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.doImageValidation();
  }

  doImageValidation() {
    const { id } = this.state;

    if(this.validateField("url", this.state.url)) {
      this.setState({urlValid: true});
    } else {
      this.setState({urlValid: false});
      return false;
    }

    if(this.validateField("tags", this.state.tags)) {
      this.setState({tagsValid: true});
    } else {
      this.setState({tagsValid: false});
      return false;
    }
    //If id present do a put, else do a post
    id ? this.doPutImage(id) : this.doPostImage();
  }

  doPostImage() {
    fetch('/api/v1/images.json', {
      method: 'POST',
      body: JSON.stringify({ image: {url: this.state.url, tag_list: this.state.tags.join(",") }}),
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }
    })
    .then(
      (result) => {
        if(!result.ok) {
          this.setState({
            urlValid: false
          });
          return false;
        }
        return result.json();
      }
    )
    .then(
      (obj) => {
        this.clearFormCloseModal();
        this.props.onAddImage(obj);
      }
    );
  }

  doPutImage(id) {
    fetch(`/api/v1/images/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ image: {url: this.state.url, tag_list: this.state.tags.join(",") }}),
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }
    })
    .then(
      (result) => {
        if(!result.ok) {
          this.setState({
            urlValid: false
          });
          return false;
        }
        return result.json();
      }
    )
    .then(
      (obj) => {
        this.clearFormCloseModal();
        this.props.onEditImage(obj);
      }
    );
  }

  clearFormCloseModal() {
    this.setState({id: '', url: '', tag_list: []});
    this.toggle();
  }

  validateField(fieldName, value) {
    var isValid = false;
    switch(fieldName) {
      case 'url':
        isValid = value.match(/^(ftp|http|https):\/\/[^ "]+$/i);
        break;
      case 'tags':
        isValid = value.length;
        break;
      default: break;
    }
    return isValid;
  }

  getErrorClass(fieldIsValid) {
    return fieldIsValid ? '' : 'is-invalid';
  }

  handleChangeTags(tags) {
    this.setState({tags});
  }

  handleChangeInput(tag) {
    this.setState({tag});
  }

  render() {
    return (
      <div className="my-5">
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add/Edit an Image URL</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              {this.state.id && 
                <FormGroup>
                  <Label for="url">Current Image:</Label>
                  <div>
                    <img src={this.state.url} style={{ 'maxWidth': 200, 'maxHeight': 200 }} />
                  </div>
                </FormGroup>
              }
              <FormGroup>
                <Label for="url">Image URL:</Label>
                <Input type="text" name="url" placeholder="Enter URL" className={'form-control ' + this.getErrorClass(this.state.urlValid)} value={this.state.url} onChange={this.handleChange}/>
                <FormText color="muted">Enter an image URL.</FormText>
                <FormFeedback>That URL is invalid.</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="tags">Image Tags:</Label>
                <TagsInput
                  name="tag_list" 
                  value={this.state.tags}
                  onChange={this.handleChangeTags}
                  inputValue={this.state.tag}
                  onChangeInput={this.handleChangeInput}
                  className={'form-control ' + this.getErrorClass(this.state.tagsValid)}
                />
                <FormText color="muted">Enter image tags</FormText>
                <FormFeedback>Please enter at least one tag for the image.</FormFeedback>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.doImageValidation} type="submit">Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

FormModal.propTypes = {
  url: PropTypes.string
};

export default FormModal;