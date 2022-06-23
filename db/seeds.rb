
puts "seeding db"

@account = Account.create!(
  email: 'account@example.com',
  password: 'Password12',
  name: 'Test Account'
)

Feed.create!(
    name: 'Daring Fireball',
    url: 'https://daringfireball.net/feeds/main',
    status: :active,
    account_id: @account.id,
    last_fetched_at: 3.days.ago
  )

  Feed.create!(
    name: 'Six Colors',
    url: 'https://sixcolors.com/feed/',
    status: :active,
    account_id: @account.id,
    last_fetched_at: 3.days.ago
  )

  Feed.create!(
    name: 'David Heinemeier Hansson',
    url: 'https://world.hey.com/dhh/feed.atom',
    status: :active,
    account_id: @account.id,
    last_fetched_at: 3.days.ago
  )