const assert = require('assert');

/**
 * Assert that response contains generation time
 */
function assertHasGenerationTime(response) {
    assert.ok(response.data, 'Response data should exist');
    assert.ok(
        response.data.hasOwnProperty('generationtime_ms'),
        'Response should contain generationtime_ms'
    );
    assert.ok(
        typeof response.data.generationtime_ms === 'number',
        'Generation time should be a number'
    );
    assert.ok(
        response.data.generationtime_ms >= 0,
        'Generation time should be non-negative'
    );
}

/**
 * Assert that response time is under specified threshold
 */
function assertResponseTime(response, maxTimeMs) {
    assert.ok(response.data, 'Response data should exist');
    assert.ok(
        response.data.hasOwnProperty('generationtime_ms'),
        'Response should contain generationtime_ms'
    );

    const responseTime = response.data.generationtime_ms;
    assert.ok(
        responseTime < maxTimeMs,
        `Response time should be less than ${maxTimeMs}ms, but was ${responseTime}ms`
    );
}

/**
 * Assert that response contains no city results
 */
function assertNoResults(response) {
    assert.ok(response.data, 'Response data should exist');

    const hasNoResults = !response.data.results ||
        response.data.results.length === 0;

    assert.ok(
        hasNoResults,
        'Response should contain no city results'
    );
}

/**
 * Assert that response contains city results
 */
function assertHasResults(response, minCount = 1) {
    assert.ok(response.data, 'Response data should exist');
    assert.ok(response.data.results, 'Results should exist');
    assert.ok(
        Array.isArray(response.data.results),
        'Results should be an array'
    );
    assert.ok(
        response.data.results.length >= minCount,
        `Should have at least ${minCount} result(s), got ${response.data.results.length}`
    );
}

/**
 * Assert that results contain exact match (for 2-character searches)
 */
function assertExactMatch(response, searchTerm) {
    if (!response.data.results || response.data.results.length === 0) {
        // No results is valid for 2-char search
        return;
    }

    const hasExactMatch = response.data.results.some(city =>
        city.name.toUpperCase() === searchTerm.toUpperCase()
    );

    assert.ok(
        hasExactMatch,
        `Results should contain exact match for '${searchTerm}'`
    );
}

/**
 * Assert that number of results does not exceed maximum
 */
function assertMaxResults(response, maxCount = 10) {
    assert.ok(response.data.results, 'Results should exist');

    const actualCount = response.data.results.length;
    assert.ok(
        actualCount <= maxCount,
        `Number of results should not exceed ${maxCount}, but got ${actualCount}`
    );
}

/**
 * Assert that all results contain required coordinate fields
 */
function assertHasCoordinates(response) {
    assertHasResults(response);

    response.data.results.forEach((city, index) => {
        assert.ok(
            city.hasOwnProperty('latitude'),
            `Result ${index} should have latitude`
        );
        assert.ok(
            city.hasOwnProperty('longitude'),
            `Result ${index} should have longitude`
        );
        assert.strictEqual(
            typeof city.latitude,
            'number',
            `Result ${index} latitude should be a number`
        );
        assert.strictEqual(
            typeof city.longitude,
            'number',
            `Result ${index} longitude should be a number`
        );
    });
}

/**
 * Assert that results contain a specific city name (case-insensitive)
 */
function assertContainsCityName(response, expectedCity) {
    assertHasResults(response);

    const cityNames = response.data.results.map(city => city.name.toLowerCase());
    const foundCity = cityNames.some(name => name === expectedCity.toLowerCase());

    assert.ok(
        foundCity,
        `Results should contain '${expectedCity}'. Found: ${response.data.results.map(c => c.name).join(', ')}`
    );
}

/**
 * Assert that search query contains only numbers
 */
function assertOnlyNumbers(query) {
    const isOnlyNumbers = /^\d+$/.test(query);
    assert.ok(
        isOnlyNumbers,
        `Query '${query}' should contain only numbers`
    );
}

/**
 * Assert that search query contains only special characters
 */
function assertOnlySpecialCharacters(query) {
    const isOnlySpecialChars = /^[^a-zA-Z0-9]+$/.test(query);
    assert.ok(
        isOnlySpecialChars,
        `Query '${query}' should contain only special characters`
    );
}

/**
 * Assert query length
 */
function assertQueryLength(query, expectedLength) {
    assert.strictEqual(
        query.length,
        expectedLength,
        `Query length should be ${expectedLength}, got ${query.length}`
    );
}

/**
 * Assert query length is within range
 */
function assertQueryLengthInRange(query, min, max) {
    assert.ok(
        query.length >= min && query.length <= max,
        `Query length should be between ${min} and ${max}, got ${query.length}`
    );
}

/**
 * Assert that response status code matches expected
 */
function assertStatusCode(response, expectedStatus = 200) {
    assert.strictEqual(
        response.status,
        expectedStatus,
        `Expected status ${expectedStatus}, but got ${response.status}`
    );
}

module.exports = {
    assertHasGenerationTime,
    assertResponseTime,
    assertNoResults,
    assertHasResults,
    assertExactMatch,
    assertMaxResults,
    assertHasCoordinates,
    assertContainsCityName,
    assertOnlyNumbers,
    assertOnlySpecialCharacters,
    assertQueryLength,
    assertQueryLengthInRange,
    assertStatusCode
};