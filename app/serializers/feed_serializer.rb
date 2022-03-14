class FeedSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :status, :created_at, :first_item

  def status
    object.status.humanize
  end

  def created_at
    object.created_at.strftime('%b %d, %Y')
  end
end
