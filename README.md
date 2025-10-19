# City Search API Test Automation

## Installation Requirements

### Prerequisites
- **Node.js** (version 14.x or higher recommended)
- **npm** (comes with Node.js)

### Setup
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Tests

To run all tests:
```bash
npx cucumber-js
```

To run a specific feature file:
```bash
npx cucumber-js features/citySearchRules.feature
```

To run tests with specific tags:
```bash
npx cucumber-js --tags "@smoke"
```
### Available Tags
- `@smoke` - Runs 4 selected smoke tests
- `@citysearch` - Runs all city search feature tests

## Project Structure

```
Project/
├── features/
│   ├── stepDefinitions/        # Step definition files
│   │   └── citySearchRules.steps.js
│   ├── assertions/             # Reusable assertion helpers
│   │   └── assertions.js
│   ├── support/                # Support files (hooks, world, etc.)
│   │   └── api_openMeteo.js    # Reusable API requests
│   │   └── world.js            # Shared context across step definitions
│   └── *.feature               # Gherkin feature files
├── manual_test_script.md       # Manual test documentation
├── bdd-scenarios.feature       # BDD test scenarios in Gherkin
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Overview of Approach

### Initial Analysis
Thoroughly reviewing the assessment requirements to understand the complete feature flow:
1. **City Search/Geocoding** - User enters city name, autocomplete provides suggestions
2. **Weather Forecast** - System retrieves 7-day weather data using coordinates
3. **Activity Ranking** - System ranks activities (Skiing, Surfing, Outdoor Sightseeing, Indoor Sightseeing) based on weather conditions

### Research and Exploration
Using Postman, I explored the Open-Meteo APIs to understand their capabilities, constraints, and response structures. This hands-on exploration revealed:
- The Geocoding API provides city search and coordinate retrieval
- The Weather Forecast API returns detailed 7-day weather predictions using the coordinates retried
- The Activity Ranking system is the feature under development (not yet available for testing)



### Testing Strategy
Based on the above and focussing on the example from the assessment, testing efforts were focussed on the city search APIs while documenting test scenarios for the complete feature:
1. **Manual Test Script** - Test coverage of all three system components, including integration points and edge cases, even for systems not yet available
2. **BDD Scenarios** - Focus on the City Search/Geocoding functionality using real API rules documented at https://open-meteo.com/en/docs/geocoding-api
3. **Automated Tests** - Implementation of BDD scenarios for the Geocoding API to demonstrate testing approach and framework setup

This strategy ensures complete test documentation while providing working automated tests for the currently available functionality.

### Architecture Decisions

**Separation of Concerns:**
- **Step Definitions** - Clean, readable implementation of Gherkin steps
- **API Layer** (`api_openMeteo.js`) - Centralized API call logic for reusability
- **Assertions** (`assertions.js`) - Reusable validation functions to avoid duplication
- **World Context** (`world.js`) - Shared state management across test steps

**Benefits of this structure:**
- Improved readability - Step definitions read almost like plain English
- Enhanced maintainability - API changes only require updates in one location
- Better reusability - Assertion and API functions can be shared across multiple features
- Easier debugging - Clear separation makes issue isolation simpler

### Test Coverage

**What's Included:**
- City Search/Geocoding API functionality
- Manual test cases for all three system components
- Edge cases: invalid input, special characters, ambiguous city names
- Error handling scenarios
- API integration failure scenarios

**What's Excluded (Due to Time/Availability):**
- Weather Forecast API automated tests (manual tests documented)
- Activity Ranking system automated tests (manual tests documented)
- End-to-end integration tests across all three systems
- Performance and load testing
- UI/Frontend autocomplete interaction tests

## How AI Assisted

**AI Tool Used:** Claude AI (Anthropic)

**How AI Was Used:**
1. **Code Generation** - Initial boilerplate for Cucumber setup, step definitions, and API wrapper functions
2. **Problem Solving** - Debugging API response handling and async/await patterns in JavaScript
3. **Documentation** - Structuring the manual test script and generating comprehensive test case templates
4. **Best Practices** - Guidance on proper Cucumber project structure and separation of concerns
5. **Gherkin Refinement** - Improving scenario wording for clarity and proper BDD style

## Omissions & Trade-offs

### Intentional Omissions
1. **Weather Forecast API Automation** - Documented in manual tests but not automated due to unknows for the activities api / system
2. **Activity Ranking System Tests** - System not available; manual tests prepared for future implementation
3. **UI Testing** - Focused on API layer; autocomplete UI interaction would require additional framework (e.g., Playwright, Cypress)
4. **Performance Testing** - Response time assertions included but no load/stress testing

### Trade-offs Made
- **Depth vs. Breadth** - Chose to fully implement one feature (Geocoding) rather than partially implement all three
- **Simplicity vs. Complexity** - Kept test framework simple; could add custom reporters, parallel execution, etc.
- **Mocking vs. Real APIs** - Used real Open-Meteo APIs; in production would mock external dependencies
- **Test Data** - Used hardcoded city names; could implement data-driven testing with external test data files

### Future Enhancements
- Add automated tests for Weather Forecast API
- Implement Activity Ranking tests once system is available
- Add end-to-end integration tests
- Create CI/CD pipeline configuration
- Expand negative testing scenarios
