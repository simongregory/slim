require 'rubygems'
require 'bundler'
Bundler.require

##############################
# Debug

task :setup_bin do
  mkdir_p "bin/debug/swf"
  cp_r FileList["web/*"].exclude(/(LOG|xml|proof|swf)$/), 'bin/debug'
end

# Compile the debug swf
mxmlc "bin/debug/swf/slim.swf" do |t|
  t.library_path << "lib/swc"
  t.input = "src/Slim.as"
  t.debug = true
end

desc "Compile and run the debug swf"
task :run => [:setup_bin, "bin/debug/swf/slim.swf"] do
  `open bin/debug/index.html`
end

##############################
# Test

# Compile the test swf
mxmlc "bin/test/slim-test.swf" do |t|
  t.input = "test/SlimRunner.as"
  t.library_path << "lib/test-swc" << 'lib/swc'
  t.source_path << 'test' << 'src'
  t.default_size = "100,100"
  t.debug = true
end

desc "Compile and run the test swf"
flashplayer :test => "bin/test/slim-test.swf"

# Compile the test swf
mxmlc "bin/release/slim.swf" do |t|
  t.input = "src/Slim.as"
  t.library_path << 'lib/swc'
  t.source_path << 'src'
  t.debug = false
end

##############################
# DEFAULT
task :default => :run

