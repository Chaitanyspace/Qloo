// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://qloo-rt0c.onrender.com',
  
  // API Endpoints
  ENDPOINTS: {
    LOGIN: '/login',
    REGISTER: '/register',
    ME: '/me',
    ANALYZE: '/analyze',
    COUNTRIES: '/countries',
    STATES: '/states',
    HISTORY: '/history',
    HISTORY_SELECT: '/history/select'
  }
};

// Helper function to build full URL
export const buildApiUrl = (endpoint, params = '') => {
  return `${API_CONFIG.BASE_URL}${endpoint}${params}`;
};

// Export individual endpoints for convenience
export const API_URLS = {
  LOGIN: buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN),
  REGISTER: buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER),
  ME: buildApiUrl(API_CONFIG.ENDPOINTS.ME),
  ANALYZE: buildApiUrl(API_CONFIG.ENDPOINTS.ANALYZE),
  COUNTRIES: buildApiUrl(API_CONFIG.ENDPOINTS.COUNTRIES),
  STATES: (countryCode) => buildApiUrl(API_CONFIG.ENDPOINTS.STATES, `/${countryCode}`),
  HISTORY: buildApiUrl(API_CONFIG.ENDPOINTS.HISTORY),
  HISTORY_SELECT: (historyId) => buildApiUrl(API_CONFIG.ENDPOINTS.HISTORY_SELECT, `/${historyId}`)
};

export default API_CONFIG;