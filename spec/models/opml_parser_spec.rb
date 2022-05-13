require 'rails_helper'

RSpec.describe OpmlParser, type: :model do
  it 'parses flat OPML file' do
    parser = OpmlParser.new(Rails.root.join('spec', 'fixtures', 'example_opml.xml'))

    results = parser.parse

    expect(results.first).to eq({ title: 'All in the head', url: 'http://allinthehead.com/rss/' })
    expect(results.second).to eq({ title: 'Jason Santa Maria', url: 'http://feeds.feedburner.com/jsm-rss' })
    expect(results.third).to eq({ title: 'Jonathan Snook', url: 'http://feeds.feedburner.com/snookca' })
  end

  it 'parses OPML file with groups' do
    parser = OpmlParser.new(Rails.root.join('spec', 'fixtures', 'example_opml_with_groups.xml'))

    results = parser.parse

    expect(results.first).to eq({ title: 'Big News Finland', url: 'http://www.bignewsnetwork.com/?rss=37e8860164ce009a' })
    expect(results.second).to eq({ title: 'CNN Entertainment', url: 'http://rss.cnn.com/rss/edition_entertainment.rss' })
  end
end
