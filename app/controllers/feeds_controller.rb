class FeedsController < ApplicationController
  before_action :authenticate_account!

  def index
    column = params[:column] || 'created_at'
    order = params[:order] || 'desc'

    # rubocop:disable Airbnb/RiskyActiverecordInvocation`
    # Safe as of Rails 6 [https://www.bigbinary.com/blog/rails-5-2-disallows-raw-sql-in-active-record]
    pagy, records = pagy(current_account.feeds.order("#{column} #{order}"))
    # rubocop:enable Airbnb/RiskyActiverecordInvocation`
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
