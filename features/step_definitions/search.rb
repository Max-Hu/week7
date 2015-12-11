Given(/^I open the homepage$/) do
  #puts "start"
  visit'/'
  sleep 1
end

Given(/^Search "([^"]*)"$/) do |search_content|
  fill_in 'textbox', with: search_content
  sleep 1
end

Given(/^Have (\d+) result$/) do | expect |
  sleep 1
  result = all('#listitem')
  sleep 1
  expect(result.length).to eq expect.to_i
end
