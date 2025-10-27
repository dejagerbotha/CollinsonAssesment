const { Given, When, Then } = require('@cucumber/cucumber');
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

// ===== GIVEN =====

Given('the city search API is available', async function() {
    this.response = await this.apiClient.searchCity("");
    
    if (!this.response || this.response.status !== 200) {
        throw new Error(`API is not available. Status: ${this.response?.status ?? 'No response'}`);
    }
});

// ===== WHEN =====

When('I search for city {string}', async function(cityName) {
    this.response = await this.apiClient.searchCity(cityName);
});

// ===== THEN =====

Then('I should receive a successful response', function() {
    assertStatusCode(this.response, 200);
});

Then('the response should contain generation time', function() {
    assertHasGenerationTime(this.response);
});

Then('the response should contain no city results', function() {
    assertNoResults(this.response);
});

Then('the response should contain city results', function() {
    assertHasResults(this.response);
});

Then('if results exist they should exactly match {string}', function(searchTerm) {
    assertExactMatch(this.response, searchTerm);
});

Then('the response should contain coordinates', function() {
    assertHasCoordinates(this.response);
});

Then('the number of results should not exceed {int}', function(maxCount) {
    assertMaxResults(this.response, maxCount);
});

Then('the response should contain city name {string}', function(expectedCity) {
    assertContainsCityName(this.response, expectedCity);
});

Then('the response time should be less than {float} milliseconds', function(maxTime) {
    assertResponseTime(this.response, maxTime);
});