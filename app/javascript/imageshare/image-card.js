import React, {Component} from 'react'
import { Button, Badge, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.showModalEdit = this.showModalEdit.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
  }

  deleteImage() {
    const { id } = this.props.item;
    if(confirm("Delete this image")) {
      fetch(`/api/v1/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        }
      })
      .then(
        (result) => {
          if(result.ok) {
            this.props.onImageCardDelete(id);
          }
        }
      )
    }
  }

  showModalEdit() {
    this.props.onImageCardEditModal(this.props.item);
  }

  filterByTag(item) {
    this.props.onSetFilter(item);
  }

  render() {
    return (
        <div>
        <Card style={{ 'maxWidth': 400 }}>
          <CardImg top width="100%" src={this.props.item.url} alt={this.props.item.url} />
          <CardBody>
            <Button close aria-label="Delete" className="text-danger ml-3" onClick={this.deleteImage}><span aria-hidden="true">×</span></Button>
            <CardTitle>
              <Button color="link" className="pl-1" onClick={this.showModalEdit}>EDIT IMAGE</Button>
            </CardTitle>
              <div>
                {this.props.item.tag_list.map(item => (
                    <span key={item} >
                      <Button color="info" className="mr-2 btn-sm" onClick={() => this.filterByTag(item)}>{item}</Button>
                    </span>
                ))}
              </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ImageCard;