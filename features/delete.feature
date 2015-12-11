Feature: Delete
  Scenario: Delete a book mark
    Given I open the homepage
    And click a delete button
    When I confirm to delete
    And Search "Profile"
    Then Have 0 result