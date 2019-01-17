require 'uri'

class Image < ApplicationRecord
    validates :url, :format => URI::regexp(%w(http https))
end
