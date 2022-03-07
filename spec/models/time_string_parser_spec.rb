require 'rails_helper'

RSpec.describe TimeStringParser, type: :model do
  describe '.parse' do
    it 'returns correct time for one_day_ago' do
      freeze_time do
        time = TimeStringParser.parse('one_day_ago')
        expect(time).to eq(1.day.ago)
      end
    end

    it 'returns correct time for three_days_ago' do
      freeze_time do
        time = TimeStringParser.parse('three_days_ago')
        expect(time).to eq(3.days.ago)
      end
    end

    it 'returns correct time for one_week_ago' do
      freeze_time do
        time = TimeStringParser.parse('one_week_ago')
        expect(time).to eq(1.week.ago)
      end
    end

    it 'returns correct time for two_weeks_ago' do
      freeze_time do
        time = TimeStringParser.parse('two_weeks_ago')
        expect(time).to eq(2.weeks.ago)
      end
    end

    it 'raises error for invalid string' do
      freeze_time do
        expect { TimeStringParser.parse('invalid_string') }.to raise_error('Invalid string value: invalid_string')
      end
    end
  end
end
