@account = Account.create(
  email: 'account@example.com',
  password: 'Password12'
)

15.times.each do |i|
  Feed.create(
    name: Faker::App.name,
    url: Faker::Internet.url(path: '/feed'),
    status: [0, 1].sample,
    account_id: @account.id,
    last_fetched_at: Faker::Time.between(from: 1.day.ago, to: Time.now)
  )
end
