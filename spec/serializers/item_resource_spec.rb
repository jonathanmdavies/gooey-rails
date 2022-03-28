require 'rails_helper'
include Rails.application.routes.url_helpers

RSpec.describe ItemResource do
  before(:each) do
    @item = build_stubbed(:item)
  end

  it 'generates item_path if no context provided' do
    item_path = ItemResource.new(@item).serializable_hash[:item_path]
    expect(item_path).to eq(item_path(@item))
  end

  it 'generates feed_item_path if feed context provided' do
    item_path = ItemResource.new(@item, params: { context: :feed }).serializable_hash[:item_path]
    expect(item_path).to eq(feed_item_path(@item.feed, @item))
  end
end
