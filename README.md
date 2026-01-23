# Weather Application

A modern, beautiful weather application built with PHP 8.1, HTML5, CSS3, and vanilla JavaScript. Features real-time weather data, 7-day forecasts, and a stunning glassmorphism UI.

## Features

- 🌤️ **Real-time Weather Data** - Current conditions with detailed metrics
- 📅 **7-Day Forecast** - Extended weather predictions
- 📍 **Location Search** - Search any city worldwide with autocomplete
- 🎯 **Geolocation** - Automatic location detection
- 🎨 **Dynamic Backgrounds** - Changes based on weather conditions
- 📱 **Responsive Design** - Works on all devices
- ⚡ **No API Key Required** - Uses free Open-Meteo API
- 🔧 **PHP 8.1 Backend** - Modern PHP with enums, readonly classes, and more

## Technology Stack

### Frontend

- **HTML5** - Semantic markup with SEO optimization
- **CSS3** - Custom properties, glassmorphism, animations
- **JavaScript (ES6+)** - Modern async/await, classes, modules
- **Google Fonts** - Inter & Outfit for premium typography

### Backend

- **PHP 8.1+** - Latest features including:
  - Enums for weather codes
  - Readonly classes for DTOs
  - Named arguments
  - Match expressions
  - Strict typing
  - Union types

### API

- **Open-Meteo API** - Free weather data (no API key needed)
- **Geocoding API** - Location search and reverse geocoding

## Installation

### Prerequisites

- PHP 8.1 or higher
- Web server (Apache/Nginx) or PHP built-in server
- Modern web browser

### Setup

1. **Clone or download** the project to your web server directory:

   ```bash
   cd /path/to/xampp/htdocs
   ```

2. **Ensure PHP 8.1+** is installed:

   ```bash
   php -v
   ```

3. **Start your web server** or use PHP's built-in server:

   ```bash
   php -S localhost:8000
   ```

4. **Open in browser**:
   ```
   http://localhost:8000/weather
   ```

## File Structure

```
weather/
├── index.php          # Main HTML page
├── style.css          # Comprehensive styling with design system
├── script.js          # Frontend JavaScript application
├── api.php            # PHP 8.1 backend API (optional)
└── README.md          # This file
```

## Usage

### Basic Usage

1. Open the application in your browser
2. Allow location access for automatic weather detection, or
3. Search for any city using the search bar
4. View current weather and 7-day forecast

### API Endpoints (api.php)

The backend provides optional API endpoints:

#### Get Weather Data

```
GET /api.php?action=weather&lat=51.5074&lon=-0.1278
```

#### Search Locations

```
GET /api.php?action=search&q=London
```

#### Get Forecast

```
GET /api.php?action=forecast&lat=51.5074&lon=-0.1278&days=7
```

## PHP 8.1 Features Demonstrated

### Enums

```php
enum WeatherCode: int {
    case CLEAR_SKY = 0;
    case PARTLY_CLOUDY = 2;
    // ...
}
```

### Readonly Classes

```php
readonly class WeatherData {
    public function __construct(
        public float $temperature,
        public float $feelsLike,
        // ...
    ) {}
}
```

### Match Expressions

```php
return match($this) {
    self::CLEAR_SKY => 'Clear sky',
    self::PARTLY_CLOUDY => 'Partly cloudy',
    // ...
};
```

### Named Arguments

```php
$data = $this->weatherService->getWeatherByCoordinates(
    latitude: 51.5074,
    longitude: -0.1278,
    includeForecast: true
);
```

## Design Features

### Glassmorphism UI

- Frosted glass effects with backdrop-filter
- Semi-transparent backgrounds
- Subtle borders and shadows

### Smooth Animations

- Fade-in effects on load
- Hover transitions
- Floating background elements
- Rotating logo animation

### Responsive Grid Layouts

- CSS Grid for forecast cards
- Flexbox for navigation
- Mobile-first approach

### Dynamic Theming

- Background changes based on weather
- Sunny, rainy, cloudy, snowy themes
- Smooth color transitions

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Performance

- Lightweight (< 50KB total)
- No external dependencies
- Optimized API calls
- Efficient DOM manipulation
- Smooth 60fps animations

## Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --text-primary: #ffffff;
  /* ... */
}
```

### Weather Icons

Modify the `getWeatherInfo()` function in `script.js` to use custom icons.

### API Configuration

The Open-Meteo API is free and requires no configuration. To use a different API, modify the `WeatherService` class in `api.php`.

## Credits

- **Weather Data**: [Open-Meteo API](https://open-meteo.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)
- **Icons**: Unicode Emoji

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions:

1. Check the browser console for errors
2. Ensure PHP 8.1+ is installed
3. Verify internet connection for API calls
4. Check browser compatibility

## Future Enhancements

- [ ] Weather alerts and warnings
- [ ] Historical weather data
- [ ] Weather maps and radar
- [ ] Multiple location favorites
- [ ] Unit conversion (Celsius/Fahrenheit)
- [ ] Dark/light mode toggle
- [ ] PWA support for offline access
- [ ] Weather widgets

---

Built with ❤️ using PHP 8.1 and modern web technologies
