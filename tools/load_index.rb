#!/usr/bin/env ruby

load 'refresh.rb'

def process_index(template_file, input_dir, output_dir, level)
  index_file = output_dir + "index.html"
  puts index_file
  doc = File.open(index_file) { |f| Nokogiri::HTML(f) }
  puts doc.title

  doc.css('h1').each do |h1|
    href = h1.parent['href']
    puts "Processing #{h1.text} #{href} ..."
    input_file  = input_dir + href
    output_file  = output_dir + href

    begin  
      refresh_one_file(template_file, input_file, output_file, 1)
    rescue StandardError => msg  
      # display the system generated error message  
      puts msg  
    end  
  end
  nil
end

def main
    template_file = ARGV[0]
    input_dir = ARGV[1]
    output_dir = ARGV[2]
    level = ARGV[3]
  
    process_index(template_file, input_dir, output_dir, level)
end


if __FILE__ == $0
  usage = <<-EOU

usage: ruby #{File.basename($0)} template_file input_dir output_dir level

  EOU

  abort usage if ARGV.length < 4

  main

end