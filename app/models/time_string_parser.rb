class TimeStringParser
  def self.parse(string)
    case string.to_sym
    when :one_day_ago
      1.day.ago
    when :three_days_ago
      3.days.ago
    when :one_week_ago
      1.week.ago
    when :two_weeks_ago
      2.weeks.ago
    else
      raise "Invalid string value: #{string}"
    end
  end
end
