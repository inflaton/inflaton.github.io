#!/usr/bin/env ruby

load 'refresh.rb'

def refresh_all(template_file, input_dir)
  files = Dir["#{input_dir}**/*.html"]

  files.each do |file_name|
    if !File.directory? file_name
      unless file_name.include?("/tools/")
        level = file_name.count('/') - input_dir.count('/') + 1
        begin  
          puts "Processing #{file_name} ..."
          refresh_one_file(template_file, file_name, file_name, level)
        rescue StandardError => msg  
          # display the system generated error message  
          puts msg  
        end  
          end
    end
  end
end

def main
    template_file = ARGV[0]
    input_dir = ARGV[1]
  
    refresh_all(template_file, input_dir)
end


if __FILE__ == $0
  usage = <<-EOU

usage: ruby #{File.basename($0)} template_file input_dir

  EOU

  abort usage if ARGV.length < 2

  main

end
