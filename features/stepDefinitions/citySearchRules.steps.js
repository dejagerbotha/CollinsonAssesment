const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');
const assert = require('assert');
const {
    assertHasGenerationTime,
    assertNoResults,
    assertHasResults,
    assertExactMatch,
    assertMaxResults,
    assertSearchBehavior
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
    assert.strictEqual(this.response.status, 200);
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
    assertHasResults(this.response);

    const firstResult = this.response.data.results[0];
    assert.ok(firstResult.hasOwnProperty('latitude'), 'Should have latitude');
    assert.ok(firstResult.hasOwnProperty('longitude'), 'Should have longitude');
    assert.strictEqual(typeof firstResult.latitude, 'number', 'Latitude should be a number');
    assert.strictEqual(typeof firstResult.longitude, 'number', 'Longitude should be a number');
});

// Step: Verify result count does not exceed maximum
Then('the number of results should not exceed {int}', function(maxCount) {
    assertMaxResults(this.response, maxCount);
});

// Step: Verify city name in results (case-insensitive)
Then('the response should contain city name {string}', function(expectedCity) {
    assertHasResults(this.response);

    const cityNames = this.response.data.results.map(city => city.name.toLowerCase());
    const foundCity = cityNames.some(name => name === expectedCity.toLowerCase());

    assert.ok(
        foundCity,
        `City names should include '${expectedCity}'. Found: ${this.response.data.results.map(c => c.name).join(', ')}`
    );
});