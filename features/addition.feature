Feature: Addition
  Scenario: Add a book mark
    Given I open the homepage
    And click add button
    And type book mark name "hello world"
    And type url "baidu.com"
    When I click confirm button
    And Search "hello world"
    Then Have 1 result

