# Slim

A an experimental thin media player for BBC media playout nerds

## Installation

Developers need a minimum of:

 - A text editor
 - [Ruby 1.9.2][ruby] or above.
 - [Git][git]

Good package management solutions are [rvm][rvm] and [Homebrew][brew].

## Getting Started

    git clone git://github.com/simongregory/slim.git
    cd slim
    bundle install
    rake

Want to know what else you can do?

    rake -T

## Notes

Destroying and re-creating instances of MediaPlayer is problematic. There's an outstand bug raised against Adobe to fix. It's not garbage collected and will continue to operate when destroyed.

## License

    Copyright MMXII British Broadcasting Corporation. All Rights Reserved.

[brew]: http://mxcl.github.com/homebrew/ "Homebrew package manager"
[git]: http://git-scm.org/
[ruby]: http://ruby-lang.org/
[rvm]: https://rvm.beginrescueend.com/ "Ruby Version Manager"
