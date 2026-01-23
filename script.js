// ============================================
// WEATHER APP - MAIN JAVASCRIPT
// ============================================

class WeatherApp {
    constructor() {
        this.currentLocation = JSON.parse(localStorage.getItem('weather_location')) || null;
        this.weatherData = null;
        this.lang = localStorage.getItem('weather_lang') || 'en';
        this.units = localStorage.getItem('weather_units') || 'metric'; // 'metric' or 'imperial'
        this.favorites = JSON.parse(localStorage.getItem('weather_favorites')) || [];
        
        this.translations = {
            en: {
                tagline: 'Your Personal Weather Companion',
                searchPlaceholder: 'Enter city name...',
                searchBtn: 'Search',
                loading: 'Loading weather data...',
                forecastTitle: '7-Day Forecast',
                hourlyTitle: '24-Hour Forecast',
                recTitle: 'Weather Recommendations',
                clothing: 'Clothing',
                accessories: 'Accessories',
                precautions: 'Safety Precautions',
                weeklySummary: 'Weekly Summary',
                tempRange: 'Temperature Range',
                tempRangeSub: "This week's range",
                totalPrecip: 'Total Precipitation',
                totalPrecipSub: 'Expected this week',
                avgWind: 'Average Wind',
                avgWindSub: 'Average wind speed',
                feelsLike: 'Feels like',
                humidity: 'Humidity',
                windSpeed: 'Wind Speed',
                windDirection: 'Wind Direction',
                precipitation: 'Precipitation',
                highTemp: 'High Temperature',
                lowTemp: 'Low Temperature',
                maxWind: 'Max Wind Speed',
                uvIndex: 'UV Index',
                visibility: 'Visibility',
                pressure: 'Pressure',
                backToCurrent: 'Back to Current Weather',
                today: 'Today',
                tomorrow: 'Tomorrow',
                errorLocation: 'Location not found.',
                errorFetch: 'Error fetching weather data.',
                errorGeo: 'Geolocation not supported.',
                errorGeoRetrieve: 'Unable to retrieve location.',
                placeholderSearch: 'Please enter a location'
            },
            hi: {
                tagline: 'आपका व्यक्तिगत मौसम साथी',
                searchPlaceholder: 'शहर का नाम दर्ज करें...',
                searchBtn: 'खोजें',
                loading: 'मौसम डेटा लोड हो रहा है...',
                forecastTitle: '7-दिवसीय पूर्वानुमान',
                hourlyTitle: '24-घंटे का पूर्वानुमान',
                recTitle: 'मौसम की सिफारिशें',
                clothing: 'कपड़े',
                accessories: 'सामान',
                precautions: 'सुरक्षा सावधानियां',
                weeklySummary: 'साप्ताहिक सारांश',
                tempRange: 'तापमान सीमा',
                tempRangeSub: "इस सप्ताह की सीमा",
                totalPrecip: 'कुल वर्षा',
                totalPrecipSub: 'इस सप्ताह अपेक्षित',
                avgWind: 'औसत हवा',
                avgWindSub: 'औसत हवा की गति',
                feelsLike: 'ऐसा महसूस होता है',
                humidity: 'नमी',
                windSpeed: 'हवा की गति',
                windDirection: 'हवा की दिशा',
                precipitation: 'वर्षा',
                highTemp: 'उच्च तापमान',
                lowTemp: 'न्यूनतम तापमान',
                maxWind: 'अधिकतम हवा की गति',
                uvIndex: 'यूवी इंडेक्स',
                visibility: 'दृश्यता',
                pressure: 'दबाव',
                backToCurrent: 'वर्तमान मौसम पर वापस जाएं',
                today: 'आज',
                tomorrow: 'कल',
                errorLocation: 'स्थान नहीं मिला।',
                errorFetch: 'डेटा प्राप्त करने में त्रुटि।',
                errorGeo: 'जियोलोकेशन समर्थित नहीं है।',
                errorGeoRetrieve: 'स्थान प्राप्त करने में असमर्थ।',
                placeholderSearch: 'कृपया स्थान दर्ज करें'
            },
            mr: {
                tagline: 'तुमचा वैयक्तिक हवामान सोबती',
                searchPlaceholder: 'शहराचे नाव प्रविष्ट करा...',
                searchBtn: 'शोधा',
                loading: 'हवामान डेटा लोड होत आहे...',
                forecastTitle: '7-दिवसांचा अंदाज',
                hourlyTitle: '24-तासांचा अंदाज',
                recTitle: 'हवामान शिफारसी',
                clothing: 'कपडे',
                accessories: 'अॅक्सेसरीज',
                precautions: 'सुरक्षा खबरदारी',
                weeklySummary: 'साप्ताहिक सारांश',
                tempRange: 'तापमान मर्यादा',
                tempRangeSub: "या आठवड्यातील मर्यादा",
                totalPrecip: 'एकूण पाऊस',
                totalPrecipSub: 'या आठवड्यात अपेक्षित',
                avgWind: 'सरासरी वारा',
                avgWindSub: 'सरासरी वाऱ्याचा वेग',
                feelsLike: 'असे वाटते',
                humidity: 'आद्रता',
                windSpeed: 'वाऱ्याचा वेग',
                windDirection: 'वाऱ्याची दिशा',
                precipitation: 'पाऊस',
                highTemp: 'जास्तीत जास्त तापमान',
                lowTemp: 'किमान तापमान',
                maxWind: 'वाऱ्याचा कमाल वेग',
                uvIndex: 'यूव्ही इंडेक्स',
                visibility: 'दृश्यता',
                pressure: 'दाब',
                backToCurrent: 'सध्याच्या हवामानावर परत जा',
                today: 'आज',
                tomorrow: 'उद्या',
                errorLocation: 'स्थान सापडले नाही.',
                errorFetch: 'त्रुटी आली आहे.',
                errorGeo: 'सपोर्ट नाही.',
                errorGeoRetrieve: 'मिळवता आले नाही.',
                placeholderSearch: 'कृपया स्थान प्रविष्ट करा'
            }
        };
        this.init();
    }

    init() {
        this.cacheElements();
        this.updateStaticTranslations();
        this.attachEventListeners();
        this.renderFavorites();
        this.loadInitialLocation();
    }

    cacheElements() {
        this.elements = {
            locationInput: document.getElementById('locationInput'),
            searchBtn: document.getElementById('searchBtn'),
            locationBtn: document.getElementById('locationBtn'),
            suggestions: document.getElementById('suggestions'),
            favorites: document.getElementById('favorites'),
            currentWeather: document.getElementById('currentWeather'),
            hourlySection: document.getElementById('hourlySection'),
            hourlyScroll: document.getElementById('hourlyScroll'),
            forecastSection: document.getElementById('forecastSection'),
            forecastGrid: document.getElementById('forecastGrid'),
            additionalInfo: document.getElementById('additionalInfo'),
            weatherBg: document.getElementById('weatherBg'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            tagline: document.querySelector('.tagline'),
            dateTime: document.getElementById('dateTime'),
            refreshBtn: document.getElementById('refreshBtn'),
            langBtns: document.querySelectorAll('.lang-btn'),
            unitC: document.getElementById('unitC'),
            unitF: document.getElementById('unitF')
        };
    }

    attachEventListeners() {
        this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
        this.elements.locationBtn.addEventListener('click', () => this.getUserLocation());
        this.elements.locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.elements.locationInput.addEventListener('input', (e) => this.handleInputChange(e));
        
        this.elements.langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const newLang = btn.dataset.lang;
                if (this.lang !== newLang) {
                    this.setLanguage(newLang);
                }
            });
        });

        this.elements.unitC.addEventListener('click', () => this.setUnits('metric'));
        this.elements.unitF.addEventListener('click', () => this.setUnits('imperial'));
        
        if (this.elements.refreshBtn) {
            this.elements.refreshBtn.addEventListener('click', () => this.refreshWeather());
        }

        // Auto update time
        setInterval(() => this.updateTime(), 1000);
        this.updateTime();
    }

    updateTime() {
        if (!this.elements.dateTime) return;
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        this.elements.dateTime.textContent = now.toLocaleDateString(this.lang === 'en' ? 'en-US' : (this.lang === 'hi' ? 'hi-IN' : 'mr-IN'), options);
    }

    refreshWeather() {
        if (this.currentLocation) {
            this.fetchWeatherByCoords(this.currentLocation.lat, this.currentLocation.lon, this.currentLocation.name);
        }
    }

    setUnits(unit) {
        if (this.units === unit) return;
        this.units = unit;
        localStorage.setItem('weather_units', unit);
        this.updateUnitsUI();
        if (this.weatherData && this.currentLocation) {
            this.displayWeather(this.weatherData, this.currentLocation.name);
        }
    }

    updateUnitsUI() {
        this.elements.unitC.classList.toggle('active', this.units === 'metric');
        this.elements.unitF.classList.toggle('active', this.units === 'imperial');
    }

    async loadInitialLocation() {
        if (this.currentLocation) {
            this.fetchWeatherByCoords(this.currentLocation.lat, this.currentLocation.lon, this.currentLocation.name);
        } else {
            this.getUserLocation();
        }
    }

    setLanguage(lang) {
        this.lang = lang;
        localStorage.setItem('weather_lang', lang);
        
        // Update active class on buttons
        this.elements.langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        this.updateStaticTranslations();
        
        // Refresh weather display if data exists
        if (this.weatherData && this.currentLocation) {
            this.displayWeather(this.weatherData, this.currentLocation.name);
        }
    }

    updateStaticTranslations() {
        const t = this.translations[this.lang];
        this.elements.tagline.textContent = t.tagline;
        this.elements.locationInput.placeholder = t.searchPlaceholder;
        this.elements.searchBtn.innerHTML = `<span class="search-icon search-icon-animated">🔍</span> ${t.searchBtn}`;
        const forecastTitle = document.querySelector('.forecast-section .section-title');
        const hourlyTitle = document.querySelector('.hourly-section .section-title');
        if (forecastTitle) forecastTitle.textContent = t.forecastTitle;
        if (hourlyTitle) hourlyTitle.textContent = t.hourlyTitle;
        this.elements.loadingSpinner.querySelector('p').textContent = t.loading;
        this.updateUnitsUI();
    }

    async loadDefaultLocation() {
        // Try to get user's location, fallback to a default city
        if (navigator.geolocation) {
            this.getUserLocation();
        } else {
            // Default to New York if geolocation is not available
            this.fetchWeatherByCity('New York');
        }
    }

    getUserLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        this.showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                this.hideLoading();
                this.showError('Unable to retrieve your location. Please search manually.');
                console.error('Geolocation error:', error);
                // Fallback to default city
                this.fetchWeatherByCity('London');
            }
        );
    }

    async handleSearch() {
        const query = this.elements.locationInput.value.trim();
        if (!query) {
            this.showError('Please enter a location');
            return;
        }
        await this.fetchWeatherByCity(query);
    }

    async handleInputChange(e) {
        const query = e.target.value.trim();
        if (query.length < 2) {
            this.elements.suggestions.classList.remove('active');
            return;
        }

        // Debounce the geocoding API calls
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(async () => {
            await this.fetchLocationSuggestions(query);
        }, 300);
    }

    async fetchLocationSuggestions(query) {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                this.displaySuggestions(data.results);
            } else {
                this.elements.suggestions.classList.remove('active');
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    displaySuggestions(results) {
        const suggestionsHTML = results.map(location => {
            const country = location.country || '';
            const admin = location.admin1 || '';
            const displayName = `${location.name}${admin ? ', ' + admin : ''}${country ? ', ' + country : ''}`;
            
            return `
                <div class="suggestion-item" data-lat="${location.latitude}" data-lon="${location.longitude}" data-name="${displayName}">
                    ${displayName}
                </div>
            `;
        }).join('');

        this.elements.suggestions.innerHTML = suggestionsHTML;
        this.elements.suggestions.classList.add('active');

        // Add click listeners to suggestions
        this.elements.suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const lat = parseFloat(item.dataset.lat);
                const lon = parseFloat(item.dataset.lon);
                const name = item.dataset.name;
                this.elements.locationInput.value = name;
                this.elements.suggestions.classList.remove('active');
                this.fetchWeatherByCoords(lat, lon, name);
            });
        });
    }

    async fetchWeatherByCity(city) {
        try {
            this.showLoading();
            
            // First, geocode the city name
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
            );
            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                this.showError('Location not found. Please try another search.');
                this.hideLoading();
                return;
            }

            const location = geoData.results[0];
            const displayName = `${location.name}${location.admin1 ? ', ' + location.admin1 : ''}${location.country ? ', ' + location.country : ''}`;
            
            await this.fetchWeatherByCoords(location.latitude, location.longitude, displayName);
        } catch (error) {
            this.hideLoading();
            this.showError('Error fetching weather data. Please try again.');
            console.error('Error:', error);
        }
    }

    async fetchWeatherByCoords(lat, lon, locationName = null) {
        try {
            this.showLoading();
            
            // If no location name provided, use Nominatim reverse geocoding (more reliable)
            if (!locationName) {
                try {
                    // Try Nominatim reverse geocoding first (more accurate for location names)
                    const nominatimResponse = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
                        {
                            headers: {
                                'User-Agent': 'WeatherApp/1.0'
                            }
                        }
                    );
                    
                    if (nominatimResponse.ok) {
                        const nominatimData = await nominatimResponse.json();
                        const address = nominatimData.address || {};
                        
                        // Build location name from address components
                        const city = address.city || address.town || address.village || address.municipality;
                        const state = address.state || address.region;
                        const country = address.country;
                        
                        if (city) {
                            locationName = `${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`;
                        } else if (state) {
                            locationName = `${state}${country ? ', ' + country : ''}`;
                        } else if (country) {
                            locationName = country;
                        }
                    }
                } catch (nominatimError) {
                    console.warn('Nominatim reverse geocoding failed:', nominatimError);
                }
                
                // Fallback to coordinates if all else fails
                if (!locationName) {
                    locationName = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
                }
            }

            // Fetch weather data from Open-Meteo API
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max&hourly=temperature_2m,weather_code&timezone=auto`
            );
            const weatherData = await weatherResponse.json();

            this.currentLocation = { lat, lon, name: locationName };
            localStorage.setItem('weather_location', JSON.stringify(this.currentLocation));
            
            this.weatherData = weatherData; 
            this.displayWeather(weatherData, locationName);
            this.updateBackground(weatherData.current.weather_code);
            this.addToFavorites(locationName, lat, lon);
            this.hideLoading();
        } catch (error) {
            this.hideLoading();
            this.showError('Error fetching weather data. Please try again.');
            console.error('Error:', error);
        }
    }

    addToFavorites(name, lat, lon) {
        // Only keep the most recent 5
        const exists = this.favorites.find(f => f.name === name);
        if (!exists) {
            this.favorites.unshift({ name, lat, lon });
            if (this.favorites.length > 5) this.favorites.pop();
            localStorage.setItem('weather_favorites', JSON.stringify(this.favorites));
            this.renderFavorites();
        }
    }

    renderFavorites() {
        if (this.favorites.length === 0) {
            this.elements.favorites.innerHTML = '';
            return;
        }

        this.elements.favorites.innerHTML = this.favorites.map(fav => `
            <div class="favorite-chip" data-lat="${fav.lat}" data-lon="${fav.lon}" data-name="${fav.name}">
                <span>📍 ${fav.name.split(',')[0]}</span>
                <span class="remove-fav" data-name="${fav.name}">×</span>
            </div>
        `).join('');

        this.elements.favorites.querySelectorAll('.favorite-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-fav')) {
                    e.stopPropagation();
                    this.removeFavorite(e.target.dataset.name);
                    return;
                }
                const { lat, lon, name } = chip.dataset;
                this.fetchWeatherByCoords(parseFloat(lat), parseFloat(lon), name);
            });
        });
    }

    removeFavorite(name) {
        this.favorites = this.favorites.filter(f => f.name !== name);
        localStorage.setItem('weather_favorites', JSON.stringify(this.favorites));
        this.renderFavorites();
    }

    displayWeather(data, locationName) {
        const current = data.current;
        const daily = data.daily;
        const hourly = data.hourly;

        const t = this.translations[this.lang];
        const weatherInfo = this.getWeatherInfo(current.weather_code);
        const temp = this.convertTemp(current.temperature_2m);
        const feelsLike = this.convertTemp(current.apparent_temperature);
        const unitLabel = this.units === 'metric' ? '°C' : '°F';
        const windUnit = this.units === 'metric' ? 'km/h' : 'mph';
        const windSpeed = this.convertWind(current.wind_speed_10m);

        const currentHTML = `
            <div class="weather-main">
                <div class="weather-info">
                    <h2>${temp}${unitLabel}</h2>
                    <div class="location"><span class="pin-animated">📍</span> ${locationName}</div>
                    <div class="description">${weatherInfo.description}</div>
                    <div class="feels-like">${t.feelsLike} ${feelsLike}${unitLabel}</div>
                </div>
                <div class="weather-icon-main">${this.getWeatherIconHTML(weatherInfo.icon, 'large')}</div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="icon"><span class="humidity-animated">💧</span></div>
                    <div class="label">${t.humidity}</div>
                    <div class="value">${current.relative_humidity_2m}%</div>
                </div>
                <div class="detail-item">
                    <div class="icon"><span class="wind-animated">💨</span></div>
                    <div class="label">${t.windSpeed}</div>
                    <div class="value">${windSpeed} ${windUnit}</div>
                </div>
                <div class="detail-item">
                    <div class="icon"><span class="humidity-animated">🌧️</span></div>
                    <div class="label">${t.precipitation}</div>
                    <div class="value">${current.precipitation} mm</div>
                </div>
                <div class="detail-item">
                    <div class="icon"><span class="thermometer-animated">☀️</span></div>
                    <div class="label">${t.uvIndex}</div>
                    <div class="value">${daily.uv_index_max[0]}</div>
                </div>
            </div>
        `;

        this.elements.currentWeather.innerHTML = currentHTML;

        // Display Hourly Forecast
        const now = new Date();
        const currentHour = now.getHours();
        const hourlyHTML = hourly.time.slice(currentHour, currentHour + 24).map((time, index) => {
            const idx = currentHour + index;
            const hourWeather = this.getWeatherInfo(hourly.weather_code[idx]);
            const hourTemp = this.convertTemp(hourly.temperature_2m[idx]);
            const hourLabel = new Date(time).toLocaleTimeString(this.lang === 'en' ? 'en-US' : (this.lang === 'hi' ? 'hi-IN' : 'mr-IN'), { hour: 'numeric', hour12: true });
            
            return `
                <div class="hourly-card">
                    <div class="time">${hourLabel}</div>
                    <div class="icon">${this.getWeatherIconHTML(hourWeather.icon, 'small')}</div>
                    <div class="temp">${hourTemp}${unitLabel}</div>
                </div>
            `;
        }).join('');

        this.elements.hourlyScroll.innerHTML = hourlyHTML;

        // Display 7-day forecast
        const forecastHTML = daily.time.slice(0, 7).map((date, index) => {
            const weatherInfo = this.getWeatherInfo(daily.weather_code[index]);
            const dayName = this.getDayName(date);
            const formattedDate = this.formatDate(date);
            const highTemp = this.convertTemp(daily.temperature_2m_max[index]);
            const lowTemp = this.convertTemp(daily.temperature_2m_min[index]);
            
            return `
                <div class="forecast-card" data-day-index="${index}">
                    <div class="day">${dayName}</div>
                    <div class="date">${formattedDate}</div>
                    <div class="icon">${this.getWeatherIconHTML(weatherInfo.icon, 'medium')}</div>
                    <div class="temp">${highTemp}${unitLabel}</div>
                    <div class="temp-range">
                        ${lowTemp}° / ${highTemp}°
                    </div>
                    <div class="description">${weatherInfo.description}</div>
                </div>
            `;
        }).join('');

        this.elements.forecastGrid.innerHTML = forecastHTML;

        // Add click event listeners to forecast cards
        this.elements.forecastGrid.querySelectorAll('.forecast-card').forEach(card => {
            card.addEventListener('click', () => {
                const dayIndex = parseInt(card.dataset.dayIndex);
                this.displayDayWeather(dayIndex);
            });

            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Get weather recommendations
        const recommendations = this.getWeatherRecommendations(current, current.weather_code);

        // Build recommendations HTML
        let recommendationsHTML = '';
        
        if (recommendations.clothing.length > 0 || recommendations.accessories.length > 0 || recommendations.precautions.length > 0) {
            recommendationsHTML = `
                <h2 class="section-title"><span class="icon-wiggle">📋</span> ${t.recTitle}</h2>
                <div class="recommendations-container">
            `;

            if (recommendations.clothing.length > 0) {
                recommendationsHTML += `
                    <div class="recommendation-category">
                        <h3 class="recommendation-title"><span class="icon-wiggle">👔</span> ${t.clothing}</h3>
                        <div class="recommendation-list">
                            ${recommendations.clothing.map(item => `
                                <div class="recommendation-item">
                                    <span class="recommendation-icon icon-wiggle">${item.icon}</span>
                                    <span class="recommendation-text">${item.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            if (recommendations.accessories.length > 0) {
                recommendationsHTML += `
                    <div class="recommendation-category">
                        <h3 class="recommendation-title"><span class="icon-wiggle">🎒</span> ${t.accessories}</h3>
                        <div class="recommendation-list">
                            ${recommendations.accessories.map(item => `
                                <div class="recommendation-item">
                                    <span class="recommendation-icon icon-wiggle">${item.icon}</span>
                                    <span class="recommendation-text">${item.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            if (recommendations.precautions.length > 0) {
                recommendationsHTML += `
                    <div class="recommendation-category">
                        <h3 class="recommendation-title"><span class="icon-wiggle">⚠️</span> ${t.precautions}</h3>
                        <div class="recommendation-list">
                            ${recommendations.precautions.map(item => `
                                <div class="recommendation-item precaution">
                                    <span class="recommendation-icon icon-wiggle">${item.icon}</span>
                                    <span class="recommendation-text">${item.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            recommendationsHTML += `</div>`;
        }

        // Calculate summary statistics
        const minTemp = this.convertTemp(Math.min(...daily.temperature_2m_min));
        const maxTemp = this.convertTemp(Math.max(...daily.temperature_2m_max));
        const totalPrecipitation = daily.precipitation_sum.reduce((a, b) => a + b, 0);
        const avgWindSpeed = this.convertWind(daily.wind_speed_10m_max.reduce((a, b) => a + b, 0) / daily.wind_speed_10m_max.length);

        const additionalHTML = `
            ${recommendationsHTML}
            <h2 class="section-title">${t.weeklySummary}</h2>
            <div class="info-grid">
                <div class="info-card">
                    <h3><span class="thermometer-animated">🌡️</span> ${t.tempRange}</h3>
                    <div class="info-value">${minTemp}° - ${maxTemp}°${unitLabel}</div>
                    <div class="info-label">${t.tempRangeSub}</div>
                </div>
                <div class="info-card">
                    <h3><span class="humidity-animated">🌧️</span> ${t.totalPrecip}</h3>
                    <div class="info-value">${totalPrecipitation.toFixed(1)} mm</div>
                    <div class="info-label">${t.totalPrecipSub}</div>
                </div>
                <div class="info-card">
                    <h3><span class="wind-animated">💨</span> ${t.avgWind}</h3>
                    <div class="info-value">${avgWindSpeed} ${windUnit}</div>
                    <div class="info-label">${t.avgWindSub}</div>
                </div>
            </div>
        `;

        this.elements.additionalInfo.innerHTML = additionalHTML;
    }

    convertTemp(c) {
        if (this.units === 'imperial') {
            return Math.round((c * 9/5) + 32);
        }
        return Math.round(c);
    }

    convertWind(kmh) {
        if (this.units === 'imperial') {
            return Math.round(kmh * 0.621371);
        }
        return Math.round(kmh);
    }

    displayDayWeather(dayIndex) {
        if (!this.weatherData) return;

        const daily = this.weatherData.daily;
        const date = daily.time[dayIndex];
        const weatherInfo = this.getWeatherInfo(daily.weather_code[dayIndex]);
        const dayName = this.getDayName(date);
        const formattedDate = this.formatDate(date);
        
        const t = this.translations[this.lang];
        const highTemp = this.convertTemp(daily.temperature_2m_max[dayIndex]);
        const lowTemp = this.convertTemp(daily.temperature_2m_min[dayIndex]);
        const maxWind = this.convertWind(daily.wind_speed_10m_max[dayIndex]);
        const unitLabel = this.units === 'metric' ? '°C' : '°F';
        const windUnit = this.units === 'metric' ? 'km/h' : 'mph';

        // Create a detailed view for the selected day
        const dayWeatherHTML = `
            <div class="weather-main">
                <div class="weather-info">
                    <h2>${highTemp}${unitLabel}</h2>
                    <div class="location">📍 ${this.currentLocation.name}</div>
                    <div class="description">${dayName}, ${formattedDate}</div>
                    <div class="feels-like">${weatherInfo.description}</div>
                </div>
                <div class="weather-icon-main">${this.getWeatherIconHTML(weatherInfo.icon, 'large')}</div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="icon"><span class="thermometer-animated">🌡️</span></div>
                    <div class="label">${t.highTemp}</div>
                    <div class="value">${highTemp}${unitLabel}</div>
                </div>
                <div class="detail-item">
                    <div class="icon"><span class="thermometer-animated">❄️</span></div>
                    <div class="label">${t.lowTemp}</div>
                    <div class="value">${lowTemp}${unitLabel}</div>
                </div>
                <div class="detail-item">
                    <div class="icon"><span class="wind-animated">💨</span></div>
                    <div class="label">${t.maxWind}</div>
                    <div class="value">${maxWind} ${windUnit}</div>
                </div>
                <div class="detail-item">
                    <div class="icon"><span class="humidity-animated">🌧️</span></div>
                    <div class="label">${t.precipitation}</div>
                    <div class="value">${daily.precipitation_sum[dayIndex].toFixed(1)} mm</div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <button id="backToCurrentBtn" class="search-btn" style="padding: 0.75rem 2rem;">
                    ← ${t.backToCurrent}
                </button>
            </div>
        `;

        this.elements.currentWeather.innerHTML = dayWeatherHTML;

        // Add click handler to back button
        const backBtn = document.getElementById('backToCurrentBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.displayWeather(this.weatherData, this.currentLocation.name);
            });
        }

        // Update background based on the selected day's weather
        this.updateBackground(daily.weather_code[dayIndex]);

        // Scroll to top to show the selected day's weather
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Highlight the selected forecast card
        this.elements.forecastGrid.querySelectorAll('.forecast-card').forEach((card, index) => {
            if (index === dayIndex) {
                card.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.3)';
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.boxShadow = '';
                card.style.transform = '';
            }
        });
    }

    getWeatherInfo(code) {
        const t = this.translations[this.lang];
        
        // WMO Weather interpretation codes translated
        const weatherCodes = {
            0: { en: 'Clear sky', hi: 'साफ आकाश', mr: 'स्वच्छ आकाश', icon: 'sun' },
            1: { en: 'Mainly clear', hi: 'मुख्य रूप से साफ', mr: 'मुख्यतः स्वच्छ', icon: 'sun-cloud' },
            2: { en: 'Partly cloudy', hi: 'आंशिक रूप से बादल', mr: 'अंशतः ढगाळ', icon: 'cloud-sun' },
            3: { en: 'Overcast', hi: 'बादल छाए रहेंगे', mr: 'ढगाळ वातावरण', icon: 'cloud' },
            45: { en: 'Foggy', hi: 'धुंधला', mr: 'धुके', icon: 'fog' },
            48: { en: 'Depositing rime fog', hi: 'जमा देने वाला कोहरा', mr: 'गोठवणारे धुके', icon: 'fog' },
            51: { en: 'Light drizzle', hi: 'हल्की बूंदाबांदी', mr: 'हलकी रिमझिम', icon: 'drizzle' },
            53: { en: 'Moderate drizzle', hi: 'मध्यम बूंदाबांदी', mr: 'मध्यम रिमझिम', icon: 'drizzle' },
            55: { en: 'Dense drizzle', hi: 'घनी बूंदाबांदी', mr: 'दाट रिमझिम', icon: 'rain' },
            61: { en: 'Slight rain', hi: 'हल्की बारिश', mr: 'हलका पाऊस', icon: 'rain' },
            63: { en: 'Moderate rain', hi: 'मध्यम बारिश', mr: 'मध्यम पाऊस', icon: 'rain' },
            65: { en: 'Heavy rain', hi: 'भारी बारिश', mr: 'मुसळधार पाऊस', icon: 'heavy-rain' },
            71: { en: 'Slight snow', hi: 'हल्की बर्फबारी', mr: 'हलका बर्फवृष्टी', icon: 'snow' },
            73: { en: 'Moderate snow', hi: 'मध्यम बर्फबारी', mr: 'मध्यम बर्फवृष्टी', icon: 'snow' },
            75: { en: 'Heavy snow', hi: 'भारी बर्फबारी', mr: 'मुसळधार बर्फवृष्टी', icon: 'heavy-snow' },
            77: { en: 'Snow grains', hi: 'बर्फ़ के दाने', mr: 'बर्फाचे दाणे', icon: 'snow' },
            80: { en: 'Slight rain showers', hi: 'हल्की बारिश की बौछारें', mr: 'हलक्या पावसाच्या सरी', icon: 'rain-sun' },
            81: { en: 'Moderate rain showers', hi: 'मध्यम बारिश की बौछारें', mr: 'मध्यम पावसाच्या सरी', icon: 'rain' },
            82: { en: 'Violent rain showers', hi: 'भीषण बारिश की बौछारें', mr: 'मुसळधार पावसाच्या सरी', icon: 'heavy-rain' },
            85: { en: 'Slight snow showers', hi: 'बर्फबारी की हल्की बौछारें', mr: 'बर्फवृष्टीच्या हलक्या सरी', icon: 'snow' },
            86: { en: 'Heavy snow showers', hi: 'बर्फबारी की भारी बौछारें', mr: 'बर्फवृष्टीच्या मुसळधार सरी', icon: 'heavy-snow' },
            95: { en: 'Thunderstorm', hi: 'गरज के साथ आंधी', mr: 'वादळी वारा आणि पाऊस', icon: 'thunder' },
            96: { en: 'Thunderstorm with slight hail', hi: 'हल्की ओलावृष्टि के साथ आंधी', mr: 'हलक्या गारांसह पाऊस', icon: 'thunder' },
            99: { en: 'Thunderstorm with heavy hail', hi: 'भारी ओलावृष्टि के साथ आंधी', mr: 'मुसळधार गारांसह पाऊस', icon: 'thunder' }
        };

        const info = weatherCodes[code] || { en: 'Unknown', hi: 'अज्ञात', mr: 'अज्ञात', icon: 'sun' };
        return {
            description: info[this.lang],
            icon: info.icon
        };
    }

    // Generate HTML for animated weather icon
    getWeatherIconHTML(iconType, size = 'large') {
        const iconMap = {
            'sun': `<div class="weather-icon-animated ${size}">
                        <div class="sun">
                            <div class="sun-core"></div>
                            <div class="sun-rays"></div>
                        </div>
                    </div>`,
            'sun-cloud': `<div class="weather-icon-animated ${size}">
                            <div class="sun small">
                                <div class="sun-core"></div>
                                <div class="sun-rays"></div>
                            </div>
                            <div class="cloud"></div>
                        </div>`,
            'cloud-sun': `<div class="weather-icon-animated ${size}">
                            <div class="cloud"></div>
                            <div class="sun small behind">
                                <div class="sun-core"></div>
                                <div class="sun-rays"></div>
                            </div>
                        </div>`,
            'cloud': `<div class="weather-icon-animated ${size}">
                        <div class="cloud"></div>
                        <div class="cloud cloud-2"></div>
                    </div>`,
            'fog': `<div class="weather-icon-animated ${size}">
                        <div class="fog-layers">
                            <div class="fog-layer"></div>
                            <div class="fog-layer"></div>
                            <div class="fog-layer"></div>
                        </div>
                    </div>`,
            'drizzle': `<div class="weather-icon-animated ${size}">
                            <div class="cloud"></div>
                            <div class="rain-drops light">
                                <div class="drop"></div>
                                <div class="drop"></div>
                                <div class="drop"></div>
                            </div>
                        </div>`,
            'rain': `<div class="weather-icon-animated ${size}">
                        <div class="cloud dark"></div>
                        <div class="rain-drops">
                            <div class="drop"></div>
                            <div class="drop"></div>
                            <div class="drop"></div>
                            <div class="drop"></div>
                        </div>
                    </div>`,
            'heavy-rain': `<div class="weather-icon-animated ${size}">
                            <div class="cloud dark"></div>
                            <div class="rain-drops heavy">
                                <div class="drop"></div>
                                <div class="drop"></div>
                                <div class="drop"></div>
                                <div class="drop"></div>
                                <div class="drop"></div>
                            </div>
                        </div>`,
            'rain-sun': `<div class="weather-icon-animated ${size}">
                            <div class="sun small">
                                <div class="sun-core"></div>
                                <div class="sun-rays"></div>
                            </div>
                            <div class="cloud"></div>
                            <div class="rain-drops light">
                                <div class="drop"></div>
                                <div class="drop"></div>
                            </div>
                        </div>`,
            'snow': `<div class="weather-icon-animated ${size}">
                        <div class="cloud"></div>
                        <div class="snowflakes">
                            <div class="snowflake">❄</div>
                            <div class="snowflake">❄</div>
                            <div class="snowflake">❄</div>
                        </div>
                    </div>`,
            'heavy-snow': `<div class="weather-icon-animated ${size}">
                            <div class="cloud dark"></div>
                            <div class="snowflakes heavy">
                                <div class="snowflake">❄</div>
                                <div class="snowflake">❄</div>
                                <div class="snowflake">❄</div>
                                <div class="snowflake">❄</div>
                            </div>
                        </div>`,
            'thunder': `<div class="weather-icon-animated ${size}">
                            <div class="cloud dark thunder"></div>
                            <div class="lightning">⚡</div>
                            <div class="rain-drops">
                                <div class="drop"></div>
                                <div class="drop"></div>
                            </div>
                        </div>`
        };

        return iconMap[iconType] || iconMap['sun'];
    }

    getWeatherRecommendations(current, weatherCode) {
        const temp = current.temperature_2m;
        const precipitation = current.precipitation;
        const windSpeed = current.wind_speed_10m;
        const humidity = current.relative_humidity_2m;
        
        const recommendations = {
            clothing: [],
            accessories: [],
            precautions: []
        };

        // Temperature-based recommendations
        if (temp < 0) {
            // Freezing conditions
            recommendations.clothing.push({
                icon: '🧥',
                text: 'Wear heavy insulated winter coat with thermal lining'
            });
            recommendations.clothing.push({
                icon: '🧣',
                text: 'Layer up with thermal underwear, sweater, and warm pants'
            });
            recommendations.accessories.push({
                icon: '🧤',
                text: 'Thermal gloves, wool hat, and thick scarf are essential'
            });
            recommendations.accessories.push({
                icon: '🥾',
                text: 'Insulated waterproof boots with good traction'
            });
            recommendations.precautions.push({
                icon: '⚠️',
                text: 'Risk of frostbite - limit outdoor exposure'
            });
        } else if (temp < 10) {
            // Cold weather
            recommendations.clothing.push({
                icon: '🧥',
                text: 'Wear a warm jacket or coat'
            });
            recommendations.clothing.push({
                icon: '👕',
                text: 'Layer clothing - long sleeves with a sweater'
            });
            recommendations.accessories.push({
                icon: '🧤',
                text: 'Gloves and a warm hat recommended'
            });
            recommendations.accessories.push({
                icon: '🧣',
                text: 'Consider wearing a scarf for neck warmth'
            });
        } else if (temp < 20) {
            // Mild weather
            recommendations.clothing.push({
                icon: '👔',
                text: 'Light jacket or cardigan should be sufficient'
            });
            recommendations.clothing.push({
                icon: '👖',
                text: 'Long pants or jeans are comfortable'
            });
            recommendations.accessories.push({
                icon: '🎒',
                text: 'Carry a light jacket in case temperature drops'
            });
        } else if (temp < 30) {
            // Warm weather
            recommendations.clothing.push({
                icon: '👕',
                text: 'Light, breathable fabrics like cotton or linen'
            });
            recommendations.clothing.push({
                icon: '🩳',
                text: 'Shorts, t-shirts, or light summer clothing'
            });
            recommendations.accessories.push({
                icon: '🧢',
                text: 'Wide-brimmed hat or cap for sun protection'
            });
            recommendations.accessories.push({
                icon: '🕶️',
                text: 'Sunglasses to protect from UV rays'
            });
            recommendations.accessories.push({
                icon: '💧',
                text: 'Carry water bottle to stay hydrated'
            });
            recommendations.precautions.push({
                icon: '☀️',
                text: 'Apply sunscreen (SPF 30+) before going outside'
            });
        } else {
            // Hot weather
            recommendations.clothing.push({
                icon: '👕',
                text: 'Very light, loose-fitting, breathable clothing'
            });
            recommendations.clothing.push({
                icon: '🩳',
                text: 'Minimal clothing - shorts and sleeveless tops'
            });
            recommendations.accessories.push({
                icon: '🧢',
                text: 'Essential: Wide-brimmed hat for sun protection'
            });
            recommendations.accessories.push({
                icon: '💧',
                text: 'Carry plenty of water - stay well hydrated'
            });
            recommendations.precautions.push({
                icon: '🌡️',
                text: 'Avoid prolonged sun exposure during peak hours (10am-4pm)'
            });
            recommendations.precautions.push({
                icon: '⚠️',
                text: 'Watch for signs of heat exhaustion - seek shade regularly'
            });
        }

        // Precipitation-based recommendations
        if (precipitation > 0 || (weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
            recommendations.accessories.push({
                icon: '☔',
                text: 'Carry an umbrella or wear a hooded raincoat'
            });
            recommendations.clothing.push({
                icon: '🧥',
                text: 'Waterproof or water-resistant jacket'
            });
            recommendations.accessories.push({
                icon: '👢',
                text: 'Waterproof footwear to keep feet dry'
            });
            recommendations.precautions.push({
                icon: '💧',
                text: 'Watch for slippery surfaces and puddles'
            });
            
            if (precipitation > 5) {
                recommendations.precautions.push({
                    icon: '🚗',
                    text: 'Heavy rain expected - drive carefully, reduce speed'
                });
            }
        }

        // Snow-based recommendations
        if (weatherCode >= 71 && weatherCode <= 77 || weatherCode >= 85 && weatherCode <= 86) {
            recommendations.clothing.push({
                icon: '🧥',
                text: 'Insulated waterproof winter coat'
            });
            recommendations.accessories.push({
                icon: '🥾',
                text: 'Insulated waterproof boots with excellent traction'
            });
            recommendations.accessories.push({
                icon: '🧤',
                text: 'Waterproof thermal gloves and warm hat'
            });
            recommendations.precautions.push({
                icon: '❄️',
                text: 'Roads may be icy - allow extra travel time'
            });
            recommendations.precautions.push({
                icon: '🚗',
                text: 'Use snow chains or winter tires if driving'
            });
            recommendations.precautions.push({
                icon: '⚠️',
                text: 'Clear snow from walkways to prevent slipping'
            });
        }

        // Wind-based recommendations
        if (windSpeed > 30) {
            recommendations.clothing.push({
                icon: '🧥',
                text: 'Windbreaker or wind-resistant outer layer'
            });
            recommendations.accessories.push({
                icon: '🧢',
                text: 'Secure hat with strap or skip it to avoid losing it'
            });
            recommendations.precautions.push({
                icon: '💨',
                text: 'Strong winds - secure loose items and outdoor furniture'
            });
            recommendations.precautions.push({
                icon: '⚠️',
                text: 'Avoid walking near tall structures or trees'
            });
            
            if (windSpeed > 50) {
                recommendations.precautions.push({
                    icon: '🚨',
                    text: 'Very strong winds - avoid unnecessary outdoor activities'
                });
            }
        } else if (windSpeed > 15) {
            recommendations.clothing.push({
                icon: '🧥',
                text: 'Light windbreaker recommended'
            });
        }

        // Thunderstorm recommendations
        if (weatherCode >= 95) {
            recommendations.precautions.push({
                icon: '⛈️',
                text: 'Thunderstorm warning - stay indoors if possible'
            });
            recommendations.precautions.push({
                icon: '⚡',
                text: 'Avoid open areas, tall objects, and water bodies'
            });
            recommendations.precautions.push({
                icon: '🏠',
                text: 'Unplug sensitive electronics during storm'
            });
        }

        // Fog recommendations
        if (weatherCode === 45 || weatherCode === 48) {
            recommendations.precautions.push({
                icon: '🌫️',
                text: 'Foggy conditions - use headlights when driving'
            });
            recommendations.precautions.push({
                icon: '🚗',
                text: 'Reduce speed and increase following distance'
            });
        }

        // High humidity recommendations
        if (humidity > 80 && temp > 20) {
            recommendations.clothing.push({
                icon: '👕',
                text: 'Moisture-wicking fabrics to stay comfortable'
            });
            recommendations.precautions.push({
                icon: '💧',
                text: 'High humidity - may feel warmer than actual temperature'
            });
        }

        return recommendations;
    }

    getWindDirection(degrees) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }

    getDayName(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return this.translations[this.lang].today;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return this.translations[this.lang].tomorrow;
        } else {
            return date.toLocaleDateString(this.lang === 'en' ? 'en-US' : (this.lang === 'hi' ? 'hi-IN' : 'mr-IN'), { weekday: 'short' });
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(this.lang === 'en' ? 'en-US' : (this.lang === 'hi' ? 'hi-IN' : 'mr-IN'), { month: 'short', day: 'numeric' });
    }

    updateBackground(weatherCode) {
        let gradient;
        
        if (weatherCode === 0 || weatherCode === 1) {
            gradient = 'linear-gradient(135deg, #ffa751 0%, #ffe259 100%)'; // Sunny
        } else if (weatherCode >= 61 && weatherCode <= 82) {
            gradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'; // Rainy
        } else if (weatherCode >= 2 && weatherCode <= 3) {
            gradient = 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)'; // Cloudy
        } else if (weatherCode >= 71 && weatherCode <= 86) {
            gradient = 'linear-gradient(135deg, #e0e0e0 0%, #667eea 100%)'; // Snowy
        } else if (weatherCode >= 95) {
            gradient = 'linear-gradient(135deg, #434343 0%, #000000 100%)'; // Thunderstorm
        } else {
            gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // Default
        }

        this.elements.weatherBg.style.background = gradient;
    }

    showLoading() {
        this.elements.loadingSpinner.style.display = 'block';
        this.elements.currentWeather.querySelectorAll('.weather-main, .weather-details').forEach(el => {
            if (el) el.style.display = 'none';
        });
    }

    hideLoading() {
        this.elements.loadingSpinner.style.display = 'none';
    }

    showError(message) {
        this.elements.currentWeather.innerHTML = `
            <div class="text-center" style="padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <h3 style="margin-bottom: 0.5rem;">Oops!</h3>
                <p style="color: var(--text-secondary);">${message}</p>
            </div>
        `;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
