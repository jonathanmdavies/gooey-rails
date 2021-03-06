require 'rails_helper'

describe 'Refreshing all feeds', type: :request, inertia: true do
  it 'enqueues refresh jobs for all active feeds' do
    account = create(:account)
    login_as(account)
    create_list(:feed, 3, account: account)

    post refresh_path
    follow_redirect!

    expect(RefreshFeedJob.jobs.size).to eq(3)
  end
end
