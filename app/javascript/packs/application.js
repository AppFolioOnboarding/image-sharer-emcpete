import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SuccesAlert from '../imageshare/success-alert'
import FormModal from '../imageshare/form-modal'
import ImageCard from '../imageshare/image-card'
import FilterLabel from '../imageshare/filter-label'
import { Button } from 'reactstrap';

class ImageSharer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: '',
      images: [],
      activeImage: '',
      addImageSuccess: false,
      modal: false,
      tags: [],
      filter: ''
    };

    this.addNewImage = this.addNewImage.bind(this);
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    fetch('/api/v1/images.json?tag=' + this.state.filter)
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

  handleAddImage = (image) => {
    var images = this.state.images;
    images.unshift(image);
    this.setState({
      images: images,
      modal: false,
      addImageSuccess: true
    });
  }

  handleEditImage = (image) => {
    var newImages = this.state.images.map((item) => {
      if(item.id == image.id) {
        item = image;
      }
      return item;
    });
    this.setState({
      images: newImages, 
      modal: false
    });
  }

  handleDeleteImage = (id) => {
    var newImages = this.state.images.filter((item) => {
      return item.id != id;
    });
    this.setState({
      images: newImages,
      modal: false
    });
  }

  openEditImageTags = (image) => {
    this.setState({
      activeImage: image,
      modal: true
    });
  }

  addNewImage = (image) => {
    this.setState({
      activeImage: {id:'', url: '', tag_list: []},
      modal: true
    });
  }

  filterDisplay() {
    return this.state.filter ? this.state.filter : 'none';
  }

  clearFilter = () => {
    this.setState({
      filter: ''
    }, this.getImages);
  }

  setFilter = (filter) => {
    this.setState({
      filter: filter
    }, this.getImages);
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div className="m-5">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="m-5">Loading...</div>;
    } else {

      return (
        <div>
          <SuccesAlert show={this.state.addImageSuccess}/>
          <Button color="primary" onClick={this.addNewImage}>Add New Image URL</Button>
          <FormModal onAddImage={this.handleAddImage} onEditImage={this.handleEditImage} image={this.state.activeImage} show={this.state.modal}/>
          <FilterLabel filter={this.filterDisplay()} onClearFilter={this.clearFilter}/>
          <div>
            {this.state.images.map(item => (
                <div className="my-4" key={item.id} >
                <ImageCard onSetFilter={this.setFilter} onImageCardEditModal={this.openEditImageTags} onImageCardDelete={this.handleDeleteImage} item={item} />
                </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

ReactDOM.render(
<ImageSharer />,
  document.getElementById('app')
)
