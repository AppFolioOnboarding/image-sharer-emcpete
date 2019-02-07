class Api::V1::ImagesController < Api::V1::BaseController
    def index
      respond_with tagged
    end
  
    def create
      respond_with :api, :v1, Image.create(image_params)

      #@image = Image.new
      #@image.url = 'http://www.google2.com'
      #@image.tag_list = ['tag1', 'tag2']
      #@image.save
      #respond_with :api, :v1, @image
    end
  
    def destroy
      respond_with Image.destroy(params[:id])
    end
  
    def update
      image = Image.find(params["id"])
      image.update_attributes(image_params)
      respond_with image, json: image
    end
  
    private
  
    def image_params
      params.require(:image).permit(:url, :tag_list, :tag)
    end

    def tagged
      if params[:tag].present?
        @images = Image.tagged_with(params[:tag])
      else
        @images = Image.all.order('id desc')
      end
    end

  end