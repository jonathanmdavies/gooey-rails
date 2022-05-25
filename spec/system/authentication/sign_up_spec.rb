require 'rails_helper'

describe 'Signing up', type: :system do
  it 'signs up a new user' do
    visit new_account_registration_path

    fill_in 'Name', with: 'John Doe'
    fill_in 'Email Address', with: 'hello@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Confirm password', with: 'password'
    click_on 'Sign up'

    expect(page).to have_content('Welcome! You have signed up successfully.')
  end
end
