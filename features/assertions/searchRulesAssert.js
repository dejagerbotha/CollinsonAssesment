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
 * Assert that response contains no city results
 */
function assertNoResults(response) {
  assert.ok(response.data, 'Response data should exist');
  
  const hasNoResults = 
    !response.data.results || 
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
 * Validate search behavior based on query rules
 * - Empty or 1 char: only response time
 * - 2 chars: exact match only
 * - 3+ chars: list of cities (max 10)
 * - Numbers only: only response time
 * - Special chars only: only response time
 */
function assertSearchBehavior(query, response) {
  const queryLength = query.length;
  const isOnlyNumbers = /^\d+$/.test(query);
  const isOnlySpecialChars = /^[^a-zA-Z0-9]+$/.test(query);
  
  // Always check for generation time
  assertHasGenerationTime(response);
  
  if (queryLength === 0 || queryLength === 1) {
    // Rule 1: Empty or 1 character - only response time
    assertNoResults(response);
  } else if (isOnlyNumbers) {
    // Rule 4: Numbers only - only response time
    assertNoResults(response);
  } else if (isOnlySpecialChars) {
    // Rule 5: Special characters only - only response time
    assertNoResults(response);
  } else if (queryLength === 2) {
    // Rule 2: 2 characters - exact match only (or no results)
    if (response.data.results && response.data.results.length > 0) {
      assertExactMatch(response, query);
    }
  } else if (queryLength >= 3) {
    // Rule 3: 3+ characters - return list (max 10)
    if (response.data.results && response.data.results.length > 0) {
      assertMaxResults(response, 10);
    }
  }
}

module.exports = {
  assertHasGenerationTime,
  assertNoResults,
  assertHasResults,
  assertExactMatch,
  assertMaxResults,
  assertOnlyNumbers,
  assertOnlySpecialCharacters,
  assertQueryLength,
  assertQueryLengthInRange,
  assertSearchBehavior
};