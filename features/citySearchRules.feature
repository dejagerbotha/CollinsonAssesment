Feature: City Search with Query Length and Character Rules
  As a user
  I want the search behavior to vary based on my query
  So that I get relevant results based on what I type

  Background: The city search API is available for use
    Given the city search API is available

  # Rule 1: Empty string or 1 character - only response time
  Scenario: Search with empty string returns only response time
    When I search for city ""
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain no city results

  Scenario: Search with 1 character returns only response time
    When I search for city "L"
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain no city results

  # Rule 2: 2 characters - exact match only
  Scenario: Search with 2 characters and exact match returns results
    When I search for city "NY"
    Then I should receive a successful response
    And the response should contain generation time
    And if results exist they should exactly match "NY"

  Scenario: Search with 2 characters and no exact match returns no results
    When I search for city "XY"
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain no city results

  # Rule 3: 3+ characters - return list (max 10)
  Scenario: Search with 3 characters returns city list
    When I search for city "Lon"
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain city results
    And the response should contain coordinates

  @smoke
  Scenario: Search with 4+ characters returns city list
    When I search for city "London"
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain city results
    And the response should contain coordinates

  Scenario: Search results should never exceed 10 cities
    When I search for city "San"
    Then I should receive a successful response
    And the response should contain city results
    And the number of results should not exceed 10

  Scenario: Search with long query returns limited results
    When I search for city "New"
    Then I should receive a successful response
    And the number of results should not exceed 10

  # Rule 4: Numbers only - only response time
  Scenario: Search with only numbers should be accepted
    When I search for city "12345"
    Then I should receive a successful response
    And the response should contain generation time

  # Rule 5: Special characters only - only response time
  Scenario: Search with special characters returns only response time
    When I search for city "!@#$%"
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain no city results

  Scenario: Search with punctuation returns only response time
    When I search for city "..."
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain no city results

  # Edge cases
  Scenario: Search with mix of valid text and numbers
    When I search for city "London123"
    Then I should receive a successful response
    And the response should contain generation time

  @smoke
  Scenario: Search with valid city name containing spaces
    When I search for city "New York"
    Then I should receive a successful response
    And the response should contain city results
    And the response should contain city name "New York"

  Scenario: Search with lowercase returns results
    When I search for city "london"
    Then I should receive a successful response
    And the response should contain city results

  Scenario: Search with uppercase returns results
    When I search for city "LONDON"
    Then I should receive a successful response
    And the response should contain city results