class OpmlParser
  def initialize(file)
    @content = File.open(file) { |f| Nokogiri::XML(f) }
  end

  def parse
    results = []
    @content.xpath("//outline[@type='rss']").each do |outline|
      results << { title: get_feed_name(outline), url: outline.attr('xmlUrl') }
    end

    results
  end

  private

  def get_feed_name(outline)
    outline.attr("title") || outline.attr("text")
  end
end
