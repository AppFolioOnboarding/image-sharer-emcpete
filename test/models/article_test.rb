require "test_helper"

describe Article do
  let(:article) { Article.new }

  it "must be valid" do
    value(article).must_be :valid?
  end
end
