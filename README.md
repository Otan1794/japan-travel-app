# Japan Travel App

A FastAPI web application for managing and organizing travel destinations in Japan with location tracking and photo storage.

## Features

- Create and manage travel places with coordinates and notes
- Store latitude/longitude for each location
- Upload and associate photos with places
- Prefecture organization
- RESTful API for CRUD operations
- Interactive web interface

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. **Clone or download the project**
   ```bash
   cd japan-travel-app
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Start the Development Server

```bash
uvicorn app.main:app --reload
```

**Options:**
- `--reload` - Auto-reloads when code changes (development only)
- `--host 0.0.0.0` - Make accessible from other machines
- `--port 8000` - Change the port (default is 8000)

**Example with custom host/port:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Access the Application

Once the server is running, open your browser and navigate to:

- **Web Interface**: [http://localhost:8000](http://localhost:8000)
- **API Endpoints**: [http://localhost:8000/places](http://localhost:8000/places)
- **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)
- **Alternative Docs**: [http://localhost:8000/redoc](http://localhost:8000/redoc) (ReDoc)

## Project Structure

```
japan-travel-app/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database setup and connection
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── crud.py              # Database CRUD operations
│   └── routers/
│       └── places.py        # API routes for places
├── templates/               # HTML templates
│   ├── index.html
│   └── home.html
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## API Endpoints

### Create a Place
```
POST /places/
```

### Get All Places
```
GET /places/
```

### Delete a Place
```
DELETE /places/{place_id}
```

For detailed API documentation with interactive testing, visit [http://localhost:8000/docs](http://localhost:8000/docs)

## Database

The application uses SQLite with the database file `travel.db` created automatically on first run.

### Database File Location
```
./travel.db
```

To reset the database, delete the `travel.db` file and restart the application.

## File Uploads

Photos are stored in the `uploads/` directory, which is created automatically.

```
uploads/
└── [photo files for places]
```

## Troubleshooting

### Port Already in Use
If port 8000 is already in use, specify a different port:
```bash
uvicorn app.main:app --reload --port 8001
```

### Module Not Found Error
Make sure you've installed all dependencies:
```bash
pip install -r requirements.txt
```

### Database Issues
To reset the database and start fresh:
```bash
rm travel.db
```

## Development

### Install in Development Mode (Optional)
```bash
pip install -e .
```

### Run Tests (if available)
```bash
pytest
```

## Dependencies

See [requirements.txt](requirements.txt) for a complete list of dependencies with pinned versions.

- **fastapi** - Web framework
- **sqlalchemy** - ORM for database
- **uvicorn** - ASGI server
- **python-multipart** - File upload support
- **pydantic** - Data validation

## License

[Add your license here]

## Support

For issues or questions, please create an issue in the repository.
