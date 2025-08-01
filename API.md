# 📡 LaunchLens API Documentation

Complete reference for the LaunchLens REST API endpoints.

<details>
<summary><strong>🔐 Authentication</strong></summary>

All API endpoints except registration and login require JWT authentication.

### Headers
```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

### Token Expiration
- **Access tokens expire in 4000 seconds** (configurable)
- The frontend automatically handles token validation every 3 seconds

</details>

<details>
<summary><strong>📋 Endpoints Overview</strong></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new user account | ❌ |
| POST | `/login` | Authenticate user | ❌ |
| GET | `/me` | Get current user info | ✅ |
| POST | `/analyze` | Analyze business location | ✅ |
| GET | `/countries` | Get available countries | ❌ |
| GET | `/states/{country_id}` | Get states for country | ❌ |
| GET | `/history` | Get user's report history | ✅ |
| GET | `/history/select/{history_id}` | Get specific report data | ✅ |

</details>

<details>
<summary><strong>🔑 Authentication Endpoints</strong></summary>

### POST `/register`

Create a new user account.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "msg": "User registered successfully"
}
```

**Error Response (400):**
```json
{
  "detail": "Username already registered"
}
```

### POST `/login`

Authenticate user and receive JWT token.

**Request Body (Form Data):**
```
username=your_username
password=your_password
```

**Success Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error Response (401):**
```json
{
  "detail": "Incorrect username or password"
}
```

### GET `/me`

Get current authenticated user information.

**Success Response (200):**
```json
{
  "username": "john_doe"
}
```

</details>

<details>
<summary><strong>🏢 Business Analysis Endpoints</strong></summary>

### POST `/analyze`

Analyze a business idea for the best locations.

**Request Body:**
```json
{
  "idea": "Yoga Studio",
  "report_type": "state",
  "country": "United States", 
  "state": "California"
}
```

**Parameters:**
- `idea` (string, required): Business type to analyze
- `report_type` (string): "country" or "state" (default: "country")
- `country` (string, required): Country name
- `state` (string, optional): State name (required if report_type is "state")

**Success Response (200):**
```json
{
  "idea": "Yoga Studio",
  "country": "United States",
  "state": "California",
  "report_type": "state",
  "location_analyzed": "California",
  "tag_id": "12345",
  "cities": [
    {
      "city": "Los Angeles",
      "subheading": "LA offers strong potential for wellness businesses with its health-conscious population.",
      "gpt_insights": "Los Angeles presents an excellent opportunity for yoga studios...",
      "score": 85.5,
      "audience_match": 82.3,
      "general_demand": 88.7,
      "influencers": [
        {
          "name": "Sarah Johnson",
          "niche": "Wellness & Yoga",
          "bio": "Popular yoga instructor with 50K+ followers",
          "contact": "sarah@example.com",
          "platform": "Instagram"
        }
      ],
      "inventory": [
        {
          "name": "Yoga Equipment Co",
          "inventory_type": "Yoga supplies",
          "location": "Downtown LA",
          "contact": "contact@yogaequip.com",
          "website": "https://yogaequip.com"
        }
      ],
      "agents": [
        {
          "name": "Mike Chen",
          "specialization": "Commercial Real Estate",
          "agency": "LA Commercial Properties",
          "contact": "mike@lacommercial.com",
          "website": "https://lacommercial.com"
        }
      ],
      "popular_places": [
        {
          "name": "Venice Beach Boardwalk",
          "address": "Venice Beach, CA 90291",
          "phone": "+1-310-555-0123",
          "website": "https://venicebeach.com",
          "map_url": "https://maps.google.com/?q=34.0522,-118.2437"
        }
      ]
    }
  ]
}
```

**Error Response (400):**
```json
{
  "error": "Could not find a tag for 'Invalid Business Type'"
}
```

</details>

<details>
<summary><strong>🌍 Location Data Endpoints</strong></summary>

### GET `/countries`

Get list of available countries for analysis.

**Success Response (200):**
```json
{
  "countries": [
    {
      "id": "1",
      "name": "United States"
    },
    {
      "id": "2", 
      "name": "Canada"
    }
  ]
}
```

### GET `/states/{country_id}`

Get states/provinces for a specific country.

**Path Parameters:**
- `country_id` (integer): Country ID from `/countries` endpoint

**Success Response (200):**
```json
{
  "states": [
    {
      "id": "1",
      "name": "California"
    },
    {
      "id": "2",
      "name": "Texas"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "error": "Country not found"
}
```

</details>

<details>
<summary><strong>📊 Report History Endpoints</strong></summary>

### GET `/history`

Get user's report history.

**Success Response (200):**
```json
{
  "history": [
    {
      "id": 123,
      "idea": "Yoga Studio",
      "report_type": "state",
      "country": "United States",
      "state": "California",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### GET `/history/select/{history_id}`

Get specific report data formatted for form population.

**Path Parameters:**
- `history_id` (integer): Report ID from history

**Success Response (200):**
```json
{
  "idea": "Yoga Studio",
  "report_type": "state",
  "country": "United States", 
  "state": "California",
  "country_code": "1",
  "state_code": "5",
  "available_states": [
    {
      "id": "5",
      "name": "California"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "detail": "History item not found"
}
```

</details>

<details>
<summary><strong>📈 Response Data Models</strong></summary>

### Business Analysis Result
```typescript
interface AnalysisResult {
  idea: string;
  country: string;
  state?: string;
  report_type: "country" | "state";
  location_analyzed: string;
  tag_id: string;
  cities: City[];
}

interface City {
  city: string;
  subheading: string;
  gpt_insights: string;
  score: number;
  audience_match: number;
  general_demand: number;
  influencers: Influencer[];
  inventory: Supplier[];
  agents: RealEstateAgent[];
  popular_places: PopularPlace[];
}
```

### Influencer
```typescript
interface Influencer {
  name: string;
  niche: string;
  bio: string;
  contact: string;
  platform: string;
}
```

### Supplier
```typescript
interface Supplier {
  name: string;
  inventory_type: string;
  location: string;
  contact: string;
  website: string;
}
```

</details>

<details>
<summary><strong>⚠️ Error Handling</strong></summary>

### Common Error Responses

**401 Unauthorized:**
```json
{
  "detail": "Could not validate credentials"
}
```

**422 Validation Error:**
```json
{
  "detail": [
    {
      "loc": ["body", "idea"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

</details>

<details>
<summary><strong>🚀 Rate Limits</strong></summary>

- **Analysis requests**: Maximum 10 requests per minute per user
- **History requests**: Maximum 60 requests per minute per user
- **Authentication**: Maximum 5 login attempts per minute per IP

</details>

<details>
<summary><strong>🛠️ Integration Examples</strong></summary>

### JavaScript/Fetch
```javascript
// Login and get token
const loginResponse = await fetch('http://localhost:8000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'username=john&password=secret123'
});
const { access_token } = await loginResponse.json();

// Analyze business
const analysisResponse = await fetch('http://localhost:8000/analyze', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    idea: 'Coffee Shop',
    report_type: 'country',
    country: 'Canada'
  })
});
const results = await analysisResponse.json();
```

### cURL
```bash
# Login
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john&password=secret123"

# Analyze (replace TOKEN with actual token)
curl -X POST "http://localhost:8000/analyze" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Coffee Shop",
    "report_type": "country", 
    "country": "Canada"
  }'
```

</details>

<details>
<summary><strong>🔧 Configuration</strong></summary>

### Environment Variables
- `MYSQL_HOST` - Database host
- `MYSQL_DB` - Database name  
- `MYSQL_USER` - Database username
- `MYSQL_PASSWORD` - Database password
- `SECRET_KEY` - JWT signing key
- `QLOO_API_KEY` - Qloo API key
- `OPENAI_API_KEY` - OpenAI API key

### Database Schema
The API automatically creates required tables:
- `users` - User accounts
- `report_history` - Analysis history
- `countries` - Available countries
- `states` - Available states/provinces

</details>

**Need help?** Check our [GitHub Issues](https://github.com/yourusername/launchlens/issues) or contact support.