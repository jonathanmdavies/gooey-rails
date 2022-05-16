class Manage::FeedsController < ApplicationController
  before_action :authenticate_account!

  def index
    column = params[:column].present? ? params[:column] : 'created_at'
    order = params[:order].present? ? params[:order] : 'desc'

    pagy, records = pagy(current_account.feeds.reorder(column => order))
    feeds = FeedResource.new(records).serializable_hash

    render inertia: 'Feeds/Index', props: { feeds: feeds, pagy: pagy_metadata(pagy) }
  end

  def create
    result = FeedCreator.new.create_feed(
      current_account,
      url: feed_params[:url],
      initially_fetch: feed_params[:initially_fetch]
    )

    if result.created?
      RefreshFeedJob.perform_async(result.feed.id)
      flash[:notice] = 'Feed was successfully added.'
      redirect_to feeds_path
    else
      redirect_back fallback_location: feeds_path, inertia: { errors: result.feed.errors.messages }
    end
  end

  def destroy
    feed = current_account.feeds.find(params[:id])

    if feed.destroy
      flash[:notice] = "You've successfully unsubscribed from the feed."
      redirect_to feeds_path
    else
      flash[:alert] = 'There was a problem unsubscribing from this feed.'
      redirect_to feeds_path
    end
  end

  private

  def feed_params
    params.require(:feed).permit(:url, :initially_fetch)
  end
end
