class ItemResource
  include Alba::Resource
  include Rails.application.routes.url_helpers

  attributes :id, :title, :content, :permalink, :published_at, :feed_id, :entry_id,
             :read_at, :bookmarked_at

  attribute :item_path do |item|
    if params[:context] == :feed
      feed_item_path(item.feed, item)
    else
      item_path(item)
    end
  end
end
