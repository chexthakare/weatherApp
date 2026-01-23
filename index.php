<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Forecast - Your Personal Weather Companion</title>
    <meta name="description" content="Get accurate weather forecasts and current conditions for any location worldwide">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="weather-background" id="weatherBg">
        <div class="animated-particles"></div>
    </div>

    <div class="container">
        <header class="header">
            <div class="top-bar">
                <div class="unit-toggle">
                    <button class="unit-btn active" id="unitC">°C</button>
                    <button class="unit-btn" id="unitF">°F</button>
                </div>
                <div class="language-selector">
                    <button class="lang-btn active" data-lang="en">EN</button>
                    <button class="lang-btn" data-lang="hi">HI</button>
                    <button class="lang-btn" data-lang="mr">MR</button>
                </div>
            </div>
            <h1 class="logo">
                <div class="weather-icon-animated small">
                    <div class="sun">
                        <div class="sun-core"></div>
                        <div class="sun-rays"></div>
                    </div>
                </div>
                WeatherNow
                <button id="refreshBtn" class="refresh-btn" title="Refresh weather data">🔄</button>
            </h1>
            <p class="tagline">Your Personal Weather Companion</p>
            <div id="dateTime" class="date-time"></div>
        </header>

        <main class="main-content">
            <!-- Location Search -->
            <section class="search-section">
                <div class="search-container">
                    <input 
                        type="text" 
                        id="locationInput" 
                        class="search-input" 
                        placeholder="Enter city name..."
                        autocomplete="off"
                    >
                    <button id="searchBtn" class="search-btn">
                        <span class="search-icon search-icon-animated">🔍</span>
                        Search
                    </button>
                    <button id="locationBtn" class="location-btn" title="Use my location">
                        <span class="location-icon pin-animated">📍</span>
                    </button>
                </div>
                <div id="suggestions" class="suggestions"></div>
                <div id="favorites" class="favorites-container"></div>
            </section>

            <!-- Current Weather -->
            <section class="current-weather" id="currentWeather">
                <div class="loading-spinner" id="loadingSpinner">
                    <div class="spinner"></div>
                    <p>Loading weather data...</p>
                </div>
            </section>

            <!-- Hourly Forecast -->
            <section class="hourly-section" id="hourlySection">
                <h2 class="section-title">24-Hour Forecast</h2>
                <div class="hourly-scroll" id="hourlyScroll"></div>
            </section>

            <!-- Forecast -->
            <section class="forecast-section" id="forecastSection">
                <h2 class="section-title">7-Day Forecast</h2>
                <div class="forecast-grid" id="forecastGrid"></div>
            </section>

            <!-- Additional Info -->
            <section class="additional-info" id="additionalInfo"></section>
        </main>

        <footer class="footer">
            <p>Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo API</a></p>
            <p class="footer-note">Free weather data for everyone • Designed with ❤️</p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>
