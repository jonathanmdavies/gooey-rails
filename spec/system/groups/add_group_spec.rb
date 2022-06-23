require 'rails_helper'

describe 'Managing Groups', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'adds a new group' do
    visit root_path

    click_on 'Add Group'
    fill_in 'Group Name', with: 'Apple Group'
    click_on 'Create Group'

    expect(page).to have_content("Group successfully created.")
    expect(page).to have_content("Apple Group")
  end
end
