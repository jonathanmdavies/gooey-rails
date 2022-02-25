require 'rails_helper'

describe 'Feeds Index', type: :request, inertia: true do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'sorts by created_at DESC by default' do
    create(:feed, created_at: 1.day.ago, account: @account, name: 'Newest')
    create(:feed, created_at: 2.days.ago, account: @account, name: 'Old')
    create(:feed, created_at: 3.days.ago, account: @account, name: 'Oldest')
    get feeds_path

    names = inertia.props[:feeds].map(&:object).map(&:name)

    expect(names).to eq(['Newest', 'Old', 'Oldest'])
  end

  it 'sorts by created_at ASC' do
    create(:feed, created_at: 1.day.ago, account: @account, name: 'Newest')
    create(:feed, created_at: 2.days.ago, account: @account, name: 'Old')
    create(:feed, created_at: 3.days.ago, account: @account, name: 'Oldest')
    get feeds_path(column: 'created_at', order: 'asc')

    names = inertia.props[:feeds].map(&:object).map(&:name)

    expect(names).to eq(['Oldest', 'Old', 'Newest'])
  end

  it 'sorts name ASC' do
    create(:feed, account: @account, name: 'A')
    create(:feed, account: @account, name: 'B')
    create(:feed, account: @account, name: 'C')
    get feeds_path(column: 'name', order: 'asc')

    names = inertia.props[:feeds].map(&:object).map(&:name)

    expect(names).to eq(['A', 'B', 'C'])
  end

  it 'sorts name DESC' do
    create(:feed, account: @account, name: 'A')
    create(:feed, account: @account, name: 'B')
    create(:feed, account: @account, name: 'C')
    get feeds_path(column: 'name', order: 'desc')

    names = inertia.props[:feeds].map(&:object).map(&:name)

    expect(names).to eq(['C', 'B', 'A'])
  end

  it 'sorts status ASC' do
    create(:feed, account: @account, status: :active)
    create(:feed, account: @account, status: :inactive)
    create(:feed, account: @account, status: :inactive)
    get feeds_path(column: 'status', order: 'asc')

    statuses = inertia.props[:feeds].map(&:object).map(&:status)

    expect(statuses).to eq(['active', 'inactive', 'inactive'])
  end

  it 'sorts status DESC' do
    create(:feed, account: @account, status: :active)
    create(:feed, account: @account, status: :inactive)
    create(:feed, account: @account, status: :inactive)
    get feeds_path(column: 'status', order: 'desc')

    statuses = inertia.props[:feeds].map(&:object).map(&:status)

    expect(statuses).to eq(['inactive', 'inactive', 'active'])
  end
end
