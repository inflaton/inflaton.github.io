#!/usr/bin/env ruby

require 'nokogiri'

def refresh_one_file(input_file, template_file = 'template.html')
  template = File.read(template_file)
  doc = File.open(input_file) { |f| Nokogiri::HTML(f) }
  node = doc.at_css('article')
  
  if node.first_element_child['class'] == "smartideo"
    #puts "Removed smartvideo <div>"
    node.first_element_child.remove
  end

  result = template.sub('<article />', node.to_s)
  result = result.gsub('title_to_be_replaced', doc.title) 
  File.open(input_file, 'w') { |file| file.write(result) } 
  puts "Done for #{doc.title}"
end

def process_list(input_file)
  doc = File.open(input_file) { |f| Nokogiri::HTML(f) }
  puts doc.title

  doc.css('h1').each do |h1|
    href = h1.parent['href']
    filename = href.sub('/', '/rxl/index.php/archives/')
    puts "Processing #{h1.text} #{filename} ..."
    refresh_one_file(filename)
  end
  nil
end

if __FILE__ == $0
  process_list('list1.html')
  process_list('list2.html')
end