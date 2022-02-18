require 'rails_helper'

RSpec.describe 'Logout', type: :system do
  describe 'logout' do
    it 'successfully' do
      account = FactoryBot.create(:account)
      login_as(account)
      visit root_path
      expect(page).to have_content('Welcome! You have signed up successfully.')
      click_on 'Settings'
      click_on 'Log out'
      expect(page).to have_content('Signed out successfully.')
    end
  end
end
