Given(/^click a delete button$/) do
  click_on '1387243199'
  sleep 1
end

When(/^I confirm to delete$/) do
  find('.layui-layer-btn0').click
  sleep 2
end
