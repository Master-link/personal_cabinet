source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem "rails", "~> 6.1.4", ">= 6.1.4.4"
# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"
# Use Puma as the app server
gem "puma", "~> 5.0"

gem "actionpack-page_caching"
gem "hiredis"
gem "redis", "~> 4.0"
gem "redis-namespace"
gem "redis-rack-cache"
gem "redis-rails"
gem "bcrypt", "~> 3.1.7"
gem "config"
gem "hashdiff", require: false
gem "active_model_serializers"
gem "fast_jsonapi"
gem "jsonapi-serializers", "~> 1.0.1"
gem "cancancan"
gem "jwt"
gem "rack-cors"
gem "rolify"
gem "will_paginate"
gem "aasm"
gem "api-pagination"
gem "money"
gem "paranoia"
gem "rack-attack"
gem "swagger-docs"
gem "wicked_pdf"
gem "numbers_and_words"
gem "wkhtmltopdf-binary"
gem "sass-rails"
gem "async-http-faraday"
gem "faraday_middleware"
gem "rails-i18n"
gem "json-schema"
gem "thor"
gem "json"
gem "rails_param"
gem "sneakers"
gem "activerecord_json_validator"
gem "bunny"
gem "oj"
gem "rails-observers"
gem "activeresource"
gem "anima"
gem "counter_culture"
gem "dry-monads"
gem "dry-schema", ">= 1.4.2"
gem "dry-types", ">= 1.2"
gem "dry-validation", ">= 1.4.2"
gem "whenever", require: false
gem "axlsx", "~> 2.0.1"
gem "down"
gem "rubyzip"
gem "jsonapi-rails"
gem "image_processing", "~> 1.2"
gem "audited", "~> 4.9"
gem "logging-rails", require: "logging/rails"
gem "lograge"

gem "bootsnap", ">= 1.4.4", require: false
gem "tzinfo-data"

group :development, :test do
  gem "awesome_print"
  gem "bunny-mock"
  gem "faker"
  gem "rspec-json_expectations"
  gem "rubocop"
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "standard"
end

group :development do
  gem "annotate"
  gem "listen", "~> 3.3"
  gem "spring"
  # для писем
  gem "letter_opener"
  gem "letter_opener_web"
end

group :test do
  gem "database_cleaner"
  gem "database_cleaner-active_record"
  gem "factory_bot_rails"
  gem "rspec-rails", "~> 5.0.0"
  gem "rspec-sidekiq"
  gem "shoulda-matchers", "~> 4.0"
  gem "simplecov", "0.20.0"
  gem "webmock"
end
