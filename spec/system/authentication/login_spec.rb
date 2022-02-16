require 'rails_helper'

RSpec.describe 'Login', type: :system do
  describe 'logging in' do
    it 'successfully' do
      account = FactoryBot.create(:account)
      visit new_account_session_path
      fill_in 'Email', with: account.email
      fill_in 'Password', with: account.password
      click_on 'Log in'
      expect(page).to have_content('Signed in successfully.')
    end

    it 'unsuccessfully' do
      visit new_account_session_path
      fill_in 'Email', with: 'hello@example.com'
      fill_in 'Password', with: 'password'
      click_on 'Log in'
      expect(page).to have_content('Invalid Email or password')
    end
  end
end
