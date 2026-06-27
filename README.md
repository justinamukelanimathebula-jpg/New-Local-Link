# LocalLink Platform

> **Mi Casa Su Casa** - My Home Is Your Home

A real-time community platform connecting residents, businesses, professionals, and local organizations.

## Quick Start

1. Copy `config/firebase.config.template.js` to `config/firebase.config.js`
2. Add your Firebase project credentials to `config/firebase.config.js`
3. Open `index.html` in a browser or deploy via Firebase Hosting

## Project Structure

```
├── config/
│   └── firebase.config.template.js  # Template for Firebase config
├── css/
│   └── styles.css                   # Main stylesheet
├── js/
│   ├── firebase-init.js             # Firebase initialization
│   ├── auth.js                      # Authentication module
│   └── app.js                       # Main app logic
├── pages/
│   ├── login.html                   # Login page
│   ├── signup.html                  # Signup page
│   ├── customer-dashboard.html      # Customer dashboard
│   ├── vendor-dashboard.html        # Business owner dashboard
│   └── driver-dashboard.html        # Driver dashboard
├── index.html                       # Home page
└── .gitignore                       # Git ignore rules
```

## User Types

- **Resident/Customer** - Discover businesses, book services, shop local
- **Business Owner** - List services, manage bookings, grow your business
- **Driver** - Offer rides and delivery services

## Security

- Never commit `config/firebase.config.js` - it contains sensitive credentials
- Firebase credentials are loaded from environment variables in production
- All API keys must be kept private

## License

MIT License
