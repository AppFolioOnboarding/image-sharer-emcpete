require 'uri'

class Image < ApplicationRecord
    acts_as_taggable_on :tags
    
    validates :url, :format => URI::regexp(%w(http https))
end


