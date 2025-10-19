const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');
const assert = require('assert');
const {
    assertHasGenerationTime,
    assertResponseTime,
    assertNoResults,
    assertHasResults,
    assertExactMatch,
    assertMaxResults,
    assertHasCoordinates,
    assertContainsCityName,
    assertStatusCode,
} = require('../assertions/searchRulesAssert.js');


Given('the city search API is available', async function() {
    this.response = await this.apiClient.searchCity("");

    if (!this.response || this.response.status !== 200) {
        throw new Error(`API is not available. Status: ${this.response ? this.response.status : 'No response'}`);
    }
});


// Step: Search for a city (reusable from citySearch.steps.js)
When('I search for city {string}', async function(cityName) {
    this.response = await this.apiClient.searchCity(cityName);
});

// Step: Verify successful response
Then('I should receive a successful response', function() {
    assertStatusCode(this.response, 200);
});

// Step: Verify response contains generation time
Then('the response should contain generation time', function() {
    assertHasGenerationTime(this.response);
});

// Step: Verify no city results are returned
Then('the response should contain no city results', function() {
    assertNoResults(this.response);
});

// Step: Verify results exist
Then('the response should contain city results', function() {
    assertHasResults(this.response);
});

// Step: Verify exact match for 2-character search
Then('if results exist they should exactly match {string}', function(searchTerm) {
    assertExactMatch(this.response, searchTerm);
});

// Step: Verify coordinates are present (reusable)
Then('the response should contain coordinates', function() {
    assertHasCoordinates(this.response);
});

// Step: Verify result count does not exceed maximum
Then('the number of results should not exceed {int}', function(maxCount) {
    assertMaxResults(this.response, maxCount);
});

// Step: Verify city name in results (case-insensitive)
Then('the response should contain city name {string}', function(expectedCity) {
    assertContainsCityName(this.response, expectedCity);
});

// Step: Verify response time is under threshold
Then('the response time should be less than {float} milliseconds', function(maxTime) {
    assertResponseTime(this.response, maxTime);
});