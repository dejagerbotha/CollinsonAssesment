const axios = require('axios');

class ApiClient {
    constructor() {
        this.openMeteoGeocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
    }

    /**
     * Search for cities using Open-Meteo Geocoding API
     * @param {string} cityName - The city name to search for
     * @returns {Promise} API response
     */
    async searchCity(cityName) {
        try {
            const response = await axios.get(this.openMeteoGeocodingUrl, {
                params: {
                    name: cityName
                }
            });

            return {
                status: response.status,
                data: response.data
            };

        } catch (error) {
            return {
                status: error.response?.status || 500,
                data: error.response?.data || null,
                error: error.message
            };
        }
    }
}

module.exports = ApiClient;