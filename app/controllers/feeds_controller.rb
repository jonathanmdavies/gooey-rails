class FeedsController < ApplicationController
  before_action :authenticate_account!

  def create
    result = FeedCreator.new.create_feed(current_account, feed_params)

    if result.created?
      redirect_to feeds_path, success: "Feed added successfully"
    else
      redirect_to feeds_path, inertia: { errors: result.feed.errors.messages }
    end
  end

  def index
    feeds = current_account.feeds
    render inertia: 'Feeds/Index', props: { feeds: feeds }
  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end
end
