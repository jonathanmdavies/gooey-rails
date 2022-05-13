class ImportFeedJob
  include Sidekiq::Job

  def perform(url, current_account_id)
    current_account = Account.find(current_account_id)

    result = FeedCreator.new.create_feed(
      current_account,
      url: url,
    )

    if !result.created?
      Rails.logger.error "Failed to import #{url}: #{result.feed.errors.full_messages.join(', ')}"
    end
  end
end
