require 'capybara'
require 'capybara/cucumber'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, {browser: :chrome})
end

Capybara.default_driver = :selenium
Capybara.app_host = 'http://127.0.0.1:8080'
