class FeedsController < ApplicationController
  before_action :authenticate_account!

  def index
    pagy, records = pagy(current_account.feeds)
    feeds = records.map { |feed| FeedSerializer.new(feed) }

    render inertia: 'Feeds/Index', props: { feeds: feeds, pagy: pagy_metadata(pagy) }
  end

  def create
    result = FeedCreator.new.create_feed(current_account, url: feed_params[:url])

    if result.created?
      flash[:notice] = 'Feed was successfully added.'
      redirect_to feeds_path
    else
      redirect_back fallback_location: feeds_path, inertia: { errors: result.feed.errors.messages }
    end
  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end
end
