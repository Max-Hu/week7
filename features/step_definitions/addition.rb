Given(/^click add button$/) do
  click_on 'my-button'
  sleep 1
end

Given(/^type book mark name "([^"]*)"$/) do |name|
  fill_in 'bookMarkName', with: name
  sleep 1
end

Given(/^type url "([^"]*)"$/) do |url|
  fill_in 'bookMarkAddress', with: url
  sleep 1
end

When(/^I click confirm button$/) do
  click_on 'add'
end


