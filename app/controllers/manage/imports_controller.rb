class Manage::ImportsController < ApplicationController
  before_action :authenticate_account!

  def create
    file = import_params[:opml_file]
    opml_feeds = OpmlParser.new(file.tempfile).parse

    opml_feeds.each do |feed|
      ImportFeedJob.perform_async(feed[:url], current_account.id)
    end

    redirect_to feeds_path
  end

  private

  def import_params
    params.permit(:opml_file)
  end
end
