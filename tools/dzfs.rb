#!/usr/bin/env ruby

require 'nokogiri'
require 'csv'

def process_node(node, template_file2, submodule_id, submodule_title, youtube_url)
    template = File.read(template_file2)
    template = template.gsub('submodule_id', submodule_id)
    template = template.gsub('submodule_title', submodule_title)
    template = template.gsub('youtube_url', youtube_url)

    new_node = Nokogiri::HTML(template)
    node2 = node.add_child(new_node.at_css('div'))
end

def process_one_file(template_file1, template_file2, input_dir, output_dir, index, class_title, playlist)
    template = File.read(template_file1)
    template = template.gsub('title_to_be_replaced', class_title)
    template = template.gsub('iframe_placeholder', playlist)

    doc = Nokogiri::HTML(template)
  
    node = doc.at_css('article')
    # puts node
    submodule_id = 1
    table = CSV.parse(File.read("./csv/dzfs_submodules.csv"), headers: true)
    table.each do |r|
        if r[0] && r[0].match(/^\d+$/)
            if index == "%02d" % r[0].to_i
                submodule_title = r[1]
                youtube_url = r[2]

                submodule_title += "(未找到視頻)" if !youtube_url
                youtube_url = "" if !youtube_url

                puts "#{index},#{class_title},#{submodule_id},#{submodule_title},#{youtube_url}"

                process_node(node, template_file2, submodule_id.to_s, submodule_title, youtube_url)
                submodule_id += 1
            end
        end
    end

    result = doc.to_s
        
    File.open("#{output_dir}/#{index}.html", 'w') { |file| file.write(result) } 
    puts "Done for #{doc.title}"
end

def process_index(template_file1, template_file2, input_dir, output_dir)
    index_html = File.read("#{input_dir}/index.html")
    doc = Nokogiri::HTML(index_html)
    node = doc.css("ol#generated_list")[0]

    table = CSV.parse(File.read("./csv/dzfs_sessions.csv"), headers: true)
    table.each do |r|
        index = "%02d" % r[0]
        name = r[1]
        playlist = r[2] || ""
        process_one_file(template_file1, template_file2, input_dir, output_dir, index, name, playlist)
        
        list_element = "<li><a href=\"#{index}.html\">#{name}</a></li>"
        new_node = Nokogiri::HTML(list_element)
        node.add_child(new_node.at_css('li'))
    end

    result = doc.to_s
    File.open("#{output_dir}/index.html", 'w') { |file| file.write(result) } 
  nil
end

def main
    template_file1 = ARGV[0]
    template_file2 = ARGV[1]
    input_dir = ARGV[2]
  
    output_dir = input_dir
    if ARGV.length > 3
        output_dir = ARGV[3]
    end

    process_index(template_file1, template_file2, input_dir, output_dir)
end


if __FILE__ == $0
  usage = <<-EOU

usage: ruby #{File.basename($0)} template_file1 template_file2 input_dir (optional)output_dir

  EOU

  abort usage if ARGV.length < 3

  main

end
#./dzfs.rb templates/dzfs_template.html templates/one_video.html ../dzfs