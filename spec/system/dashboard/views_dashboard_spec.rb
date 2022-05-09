require 'rails_helper'

RSpec.describe 'Dashboard', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account, scope: :account)
  end

  it 'shows most recent unread items' do
    create(:unread_item, account: @account, title: 'Unread Item')

    visit dashboard_path

    expect(page).to have_content('Recently Published')
    expect(page).to have_content('Unread Item')
  end
end
