require 'rails_helper'

describe 'Importing a feed', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'uploads an OPML file with three feeds' do
    visit feeds_path

    click_on 'Import OPML'
    attach_file 'opml_file', Rails.root.join('spec', 'fixtures', 'example_opml.xml')
    click_on 'Upload File'

    expect(page).to have_content('Feeds Importing...')
    expect(ImportFeedJob.jobs.size).to eq(3)
  end
end
