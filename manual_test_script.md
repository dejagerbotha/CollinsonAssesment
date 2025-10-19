# Manual Test Script: Activity Ranking API with City Search

## Test Information

- **Feature:** Activity Ranking API – City-Based Weather Forecast Integration with Search Suggestions  
- **Test Description:**  
  As a user, I want to enter a city or town name and receive a ranked list of activities — *Skiing*, *Surfing*, *Outdoor Sightseeing*, and *Indoor Sightseeing* — for the next **7 days**, based on weather conditions.  
  Additionally, as I type in the search box, I should see **autocomplete suggestions** for matching cities or towns to help me complete my query faster.

## Preconditions
1. The Activity Ranking system is deployed and accessible
2. The Activity Ranking business rules are documented and available for reference:
   - Skiing ranking criteria (e.g., temperature ranges, snowfall requirements)
   - Surfing ranking criteria (e.g., wave conditions, wind speed)
   - Outdoor Sightseeing ranking criteria (e.g., temperature, precipitation, cloud cover)
   - Indoor Sightseeing ranking criteria (e.g., adverse weather conditions)
   - Ranking scale definition (1-10 and what each value represents)
3. Open-Meteo Geocoding API is accessible (https://geocoding-api.open-meteo.com)
4. Open-Meteo Weather Forecast API is accessible (https://api.open-meteo.com)
5. Test environment has internet connectivity
6. Valid API authentication credentials are available (if required)
7. A list of predefined cities for autocomplete is available

---

## Test Case 1: Happy Path - Valid City with Full Activity Rankings

### Objective
Verify that entering a valid city name returns a 7-day forecast with ranked activities and reasoning.

### Test Steps
1. Open the search interface
2. Enter a well-known city name (e.g., "London")
3. Observe autocomplete suggestions appear
4. Select "London" from the suggestions
5. Submit the search request
6. Wait for API response

### Expected Results
- Autocomplete suggestions appear within 1 seconds of typing
- "London" appears in the suggestion list
- API response returns successfully (HTTP 200)
- Response contains 7 days of data
- Each day contains all activities (or limited to the top 10 depending on activity count)
- Each activity has:
  - Date (in proper format)
  - Activity name
  - Rank (1-10)
  - Reasoning string explaining the rank
- Reasoning is relevant to the activity and weather conditions
- Response time is under 5 seconds

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations, issues, or deviations]_

---

## Test Case 2: Autocomplete Functionality

### Objective
Verify that autocomplete suggestions work correctly as the user types.

### Test Steps
1. Open the search interface with an empty search box
2. Type the first letter "L"
3. Observe suggestions
4. Continue typing "Lo"
5. Observe updated suggestions
6. Continue typing "Lon"
7. Observe suggestions become more specific
8. Clear the search box
9. Type "New Y"
10. Verify suggestions include "New York"

### Expected Results
- Suggestions should only appear after the two characters enter (if that is an exact match)
- Suggestions update dynamically as more characters are typed
- Suggestions become more specific/filtered with each character
- Multiple matching cities are shown (if available)
- Suggestions are displayed in a readable format
- No suggestions shown for empty search box
- Suggestions disappear when search box is cleared

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 3: Activity Ranking Validation

### Objective
Verify that activity rankings are appropriate for the weather conditions.

### Test Steps
1. Search for a city known for winter conditions (e.g., "Oslo" in winter months)
2. Review the 7-day forecast response
3. Examine the Skiing activity rankings
4. Examine the Surfing activity rankings
5. Check the reasoning for each activity
6. Search for a coastal city (e.g., "San Diego")
7. Review Surfing and Outdoor Sightseeing rankings

### Expected Results
- Skiing ranks higher (7-10) for cold weather with snowfall
- Skiing ranks lower (1-3) for warm weather with no snow
- Surfing ranks appropriately for coastal cities
- Outdoor Sightseeing ranks higher on clear, pleasant days
- Indoor Sightseeing ranks higher on rainy/very hot/very cold days
- Reasoning text matches the rankings given
- Reasoning references specific weather conditions (temperature, precipitation, etc.)

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 4: Edge Case - City Name with Special Characters

### Objective
Verify system handles city names with special characters correctly.

### Test Steps
1. Search for "São Paulo"
2. Observe autocomplete suggestions
3. Select the city and submit
4. Search for "Zürich"
5. Observe autocomplete suggestions
6. Select the city and submit

### Expected Results
- Autocomplete correctly displays cities with special characters
- API successfully processes city names with accents and special characters
- 7-day forecast is returned with proper activity rankings
- No encoding issues in the response

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 5: Edge Case - Invalid City Name

### Objective
Verify system handles invalid or non-existent city names gracefully.

### Test Steps
1. Enter a non-existent city name (e.g., "XyzzyCity123")
2. Observe autocomplete suggestions
3. Attempt to submit the search
4. Observe the response

### Expected Results
- No autocomplete suggestions appear (or empty suggestion list)
- API returns only response with breaking
- Error message is clear and user-friendly (e.g., "City not found. Please try another city.")
- Application does not crash or hang
- User can try another search without refreshing

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 6: Edge Case - Ambiguous City Names

### Objective
Verify system handles cities with identical names in different countries.

### Test Steps
1. Search for "Paris"
2. Observe autocomplete suggestions
3. Verify multiple Paris options appear (e.g., Paris, France and Paris, Texas)
4. Select "Paris, France"
5. Submit and verify correct location is used
6. Repeat search and select "Paris, Texas"
7. Verify different weather data is returned

### Expected Results
- Autocomplete distinguishes between cities with the same name
- Suggestions include country or region information
- Each selection returns weather data for the correct geographic location
- Coordinates in the response match the selected city

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 7: Edge Case - No Autocomplete Suggestions

### Objective
Verify behavior when no autocomplete suggestions are available.

### Test Steps
1. Type a partial city name that has no matches (e.g., "Zzzzz")
2. Observe the autocomplete behavior
3. Continue typing the invalid name
4. Attempt to submit the search

### Expected Results
- Empty suggestion list or "No suggestions found" message
- UI clearly indicates no matches available
- User can still attempt to submit the search
- Appropriate error handling occurs (see Test Case 5)

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 8: Edge Case - Slow API Response

### Objective
Verify system behavior when API response is delayed.

### Test Steps
1. If possible, simulate network throttling or slow API response
2. Enter a valid city name
3. Select from autocomplete
4. Submit the search
5. Observe the UI during the wait period

### Expected Results
- Loading indicator appears while waiting for response
- UI remains responsive (not frozen)
- Request times out after reasonable period (e.g., 30 seconds)
- Timeout error message is displayed if applicable
- User can cancel the request or try again

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 9: Edge Case - Geocoding API Failure

### Objective
Verify system handles failures in the geocoding API (coordinate retrieval).

### Test Steps
1. If possible, simulate geocoding API unavailability
2. Enter a valid city name
3. Select from autocomplete
4. Submit the search
5. Observe error handling

### Expected Results
- Appropriate error message displayed (e.g., "Unable to retrieve location data. Please try again later.")
- Error is logged for debugging
- Application remains stable
- User can attempt another search

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 10: Edge Case - Weather Forecast API Failure

### Objective
Verify system handles failures in the weather forecast API.

### Test Steps
1. If possible, simulate weather forecast API unavailability
2. Enter a valid city name
3. Select from autocomplete
4. Submit the search (coordinates retrieved successfully)
5. Observe error handling when weather API fails

### Expected Results
- Appropriate error message displayed (e.g., "Unable to retrieve weather data. Please try again later.")
- Error is logged for debugging
- Application remains stable
- User can attempt another search

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 11: Response Data Validation

### Objective
Verify the structure and data types in the API response.

### Test Steps
1. Search for a valid city
2. Capture the complete API response
3. Validate the response structure against the API specification

### Expected Results
- Response is valid JSON
- All required fields are present:
- Data types are correct
- No null or undefined values where not expected
- Array contains exactly 7 days of data
- Each day contains activities

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 12: Performance - Multiple Consecutive Searches

### Objective
Verify system performance with multiple rapid searches.

### Test Steps
1. Perform 5 consecutive searches for different cities
2. Observe response times
3. Check for any degradation in performance
4. Verify all responses are accurate

### Expected Results
- All searches complete successfully
- Response times remain consistent

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 13: Empty/Whitespace Input

### Objective
Verify handling of empty or whitespace-only input.

### Test Steps
1. Submit search with empty string
2. Submit search with only spaces "   "
3. Submit search with tabs or newlines

### Expected Results
- Appropriate validation error (e.g., "Please enter a city name")
- No API call made for invalid input
- Autocomplete does not activate for whitespace

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Case 14: Very Long City Name

### Objective
Verify handling of extremely long input strings.

### Test Steps
1. Enter a very long string (200+ characters) in the search box
2. Observe autocomplete behavior
3. Attempt to submit

### Expected Results
- Input field has reasonable character limit OR
- System handles long input gracefully
- Appropriate error or no suggestions returned

### Pass/Fail
- [ ] Pass
- [ ] Fail

### Notes
_[Record any observations]_

---

## Test Summary

| Test Case | Result | Notes |
|-----------|--------|-------|
| TC1: Happy Path | | |
| TC2: Autocomplete | | |
| TC3: Ranking Validation | | |
| TC4: Special Characters | | |
| TC5: Invalid City | | |
| TC6: Ambiguous Names | | |
| TC7: No Suggestions | | |
| TC8: Slow Response | | |
| TC9: Geocoding Failure | | |
| TC10: Weather API Failure | | |
| TC11: Data Validation | | |
| TC12: Performance | | |
| TC13: Empty Input | | |
| TC14: Long Input | | |

**Overall Result**: [ ] Pass [ ] Fail

**Tester Signature**: _____________________ **Date**: _____________________