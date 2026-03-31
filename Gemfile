source "https://rubygems.org"

gem "jekyll", "~> 4.3.0"
gem "jekyll-theme-minimal"
gem "jekyll-feed"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"

# JS runtime for execjs (used by some Jekyll plugins)
gem "execjs"
gem "mini_racer"

# Windows and JRuby does not include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby
platforms :jruby do
  gem "http_parser.rb", "~> 0.6.0"
end
