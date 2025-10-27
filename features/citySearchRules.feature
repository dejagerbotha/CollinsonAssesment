@citysearch
Feature: City Search with Query Length and Character Rules
  As a user
  I want the search behavior to vary based on my query
  So that I get relevant results based on what I type

  Background: The city search API is available for use
    Given the city search API is available

  # Rule 1 & 5: Empty, single character, or special characters - only response time
  Scenario Outline: Search with <description> returns only response time
    When I search for city "<query>"
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain no city results

    Examples:
      | query   | description                |
      |         | empty string               |
      | L       | 1 character                |
      | !@#$%   | special characters         |
      | ...     | punctuation                |
      | !       | single special character   |

  @smoke
  # Rule 2: 2 characters - exact match behavior
  Scenario Outline: Search with 2 characters for "<query>"
    When I search for city "<query>"
    Then I should receive a successful response
    And the response should contain generation time
    And if results exist they should exactly match "<expected_match>"

    Examples:
      | query | expected_match |
      | NY    | NY             |
      | ny    | NY             |
      | XY    | XY             |

  # Rule 3: 3+ characters - return list (max 10)
  @smoke
  Scenario Outline: Search with valid queries returns city list with coordinates
    When I search for city "<query>"
    Then I should receive a successful response
    And the response should contain generation time
    And the response should contain city results
    And the response should contain coordinates

    Examples:
      | query  |
      | Lon    |
      | London |

  Scenario Outline: Search results should not exceed maximum limit
    When I search for city "<query>"
    Then I should receive a successful response
    And the response should contain city results
    And the number of results should not exceed 10

    Examples:
      | query |
      | San   |
      | New   |

  # Rule 4 & Edge cases: Numbers and mixed content
  Scenario Outline: Search with <description> should be accepted
    When I search for city "<query>"
    Then I should receive a successful response
    And the response should contain generation time

    Examples:
      | query                              | description                    |
      | 12345                              | only numbers                   |
      | London123                          | valid text and numbers         |
      | 123London                          | numbers at the start           |
      | abcdefghijklmnopqrstuvwxyz1234567890 | very long query string      |
      |                                    | only spaces                    |
      | São Paulo                          | special characters in name     |

  @smoke
  # Case sensitivity and special queries
  Scenario Outline: Search with different cases for "<query>" returns results
    When I search for city "<query>"
    Then I should receive a successful response
    And the response should contain city results

    Examples:
      | query  |
      | london |
      | LONDON |

  @smoke
  Scenario: Search with valid city name containing spaces
    When I search for city "New York"
    Then I should receive a successful response
    And the response should contain city results
    And the response should contain city name "New York"

  @performance
  Scenario: API response time should be under 5 milliseconds
    When I search for city "London"
    Then I should receive a successful response
    And the response time should be less than 5 milliseconds