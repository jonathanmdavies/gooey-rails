require 'rails_helper'

RSpec.describe 'Signing up', type: :system do
  describe 'Signing up' do
    it 'signs up a new user' do
      visit new_account_registration_path
      fill_in 'Email', with: 'hello@example.com'
      fill_in 'Password', with: 'password'
      fill_in 'Password confirmation', with: 'password'
      click_on 'Sign up'
      expect(page).to have_content('Welcome! You have signed up successfully.')
    end
  end
end
