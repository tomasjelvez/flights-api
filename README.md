# flights-api

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Flights

- `GET /api/flights` - Get all flights
- `GET /api/flights/:flightCode` - Get flight by code
- `POST /api/flights` - Create new flight
- `PUT /api/flights/:flightCode` - Update entire flight
- `PATCH /api/flights/:flightCode` - Update flight partially
- `DELETE /api/flights/:flightCode` - Delete flight

### Passengers

- `GET /api/passengers` - Get all passengers
- `GET /api/passengers/:id` - Get passenger by ID
- `GET /api/passengers/:id/flights` - Get flights for a passenger
- `PATCH /api/passengers/:id` - Update passenger
- `GET /api/passengers/flight/:flightCode` - Get passengers for a flight

## Environment Variables

Create a `.env` file with:

## Project Structure

├── docker-init/ # MongoDB initialization
├── src/
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ └── index.ts # Application entry
├── docker-compose.yml # Docker configuration
└── package.json # Dependencies
