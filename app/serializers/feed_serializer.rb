class FeedSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :status, :created_at

  def status
    object.status.humanize
  end

  def created_at
    object.created_at.strftime('%b %d, %Y')
  end
end
