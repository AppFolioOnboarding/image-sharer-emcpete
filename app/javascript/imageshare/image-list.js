import React, {Component} from 'react'
import ImageCard from '../imageshare/image-card'

class ImageList extends Component {
    constructor(props) {
      super(props);
        this.state = {
      };
    }
  
    render() {
        return (
            <div>
            {this.props.images.map(item => (
                <div className="my-5" key={item.id} >
                <ImageCard url={item.url}/>
                </div>
            ))}
            </div>
        );
    }
  }

  export default ImageList;