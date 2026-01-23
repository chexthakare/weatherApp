<?php
declare(strict_types=1);

/**
 * Weather API Handler
 * PHP 8.1+ Weather Application Backend
 * 
 * This file demonstrates PHP 8.1 features and best practices:
 * - Strict types
 * - Named arguments
 * - Match expressions
 * - Readonly properties
 * - Enums
 * - Union types
 */

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Set JSON header for API responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

/**
 * Weather Code Enum
 * Represents WMO Weather interpretation codes
 */
enum WeatherCode: int
{
    case CLEAR_SKY = 0;
    case MAINLY_CLEAR = 1;
    case PARTLY_CLOUDY = 2;
    case OVERCAST = 3;
    case FOGGY = 45;
    case RIME_FOG = 48;
    case LIGHT_DRIZZLE = 51;
    case MODERATE_DRIZZLE = 53;
    case DENSE_DRIZZLE = 55;
    case SLIGHT_RAIN = 61;
    case MODERATE_RAIN = 63;
    case HEAVY_RAIN = 65;
    case SLIGHT_SNOW = 71;
    case MODERATE_SNOW = 73;
    case HEAVY_SNOW = 75;
    case SNOW_GRAINS = 77;
    case SLIGHT_RAIN_SHOWERS = 80;
    case MODERATE_RAIN_SHOWERS = 81;
    case VIOLENT_RAIN_SHOWERS = 82;
    case SLIGHT_SNOW_SHOWERS = 85;
    case HEAVY_SNOW_SHOWERS = 86;
    case THUNDERSTORM = 95;
    case THUNDERSTORM_SLIGHT_HAIL = 96;
    case THUNDERSTORM_HEAVY_HAIL = 99;

    /**
     * Get human-readable description
     */
    public function getDescription(): string
    {
        return match($this) {
            self::CLEAR_SKY => 'Clear sky',
            self::MAINLY_CLEAR => 'Mainly clear',
            self::PARTLY_CLOUDY => 'Partly cloudy',
            self::OVERCAST => 'Overcast',
            self::FOGGY => 'Foggy',
            self::RIME_FOG => 'Depositing rime fog',
            self::LIGHT_DRIZZLE => 'Light drizzle',
            self::MODERATE_DRIZZLE => 'Moderate drizzle',
            self::DENSE_DRIZZLE => 'Dense drizzle',
            self::SLIGHT_RAIN => 'Slight rain',
            self::MODERATE_RAIN => 'Moderate rain',
            self::HEAVY_RAIN => 'Heavy rain',
            self::SLIGHT_SNOW => 'Slight snow',
            self::MODERATE_SNOW => 'Moderate snow',
            self::HEAVY_SNOW => 'Heavy snow',
            self::SNOW_GRAINS => 'Snow grains',
            self::SLIGHT_RAIN_SHOWERS => 'Slight rain showers',
            self::MODERATE_RAIN_SHOWERS => 'Moderate rain showers',
            self::VIOLENT_RAIN_SHOWERS => 'Violent rain showers',
            self::SLIGHT_SNOW_SHOWERS => 'Slight snow showers',
            self::HEAVY_SNOW_SHOWERS => 'Heavy snow showers',
            self::THUNDERSTORM => 'Thunderstorm',
            self::THUNDERSTORM_SLIGHT_HAIL => 'Thunderstorm with slight hail',
            self::THUNDERSTORM_HEAVY_HAIL => 'Thunderstorm with heavy hail',
        };
    }

    /**
     * Get weather icon emoji
     */
    public function getIcon(): string
    {
        return match($this) {
            self::CLEAR_SKY => '☀️',
            self::MAINLY_CLEAR => '🌤️',
            self::PARTLY_CLOUDY => '⛅',
            self::OVERCAST => '☁️',
            self::FOGGY, self::RIME_FOG => '🌫️',
            self::LIGHT_DRIZZLE, self::MODERATE_DRIZZLE => '🌦️',
            self::DENSE_DRIZZLE, self::SLIGHT_RAIN, self::MODERATE_RAIN => '🌧️',
            self::HEAVY_RAIN => '⛈️',
            self::SLIGHT_SNOW, self::MODERATE_SNOW, self::SNOW_GRAINS => '🌨️',
            self::HEAVY_SNOW, self::HEAVY_SNOW_SHOWERS => '❄️',
            self::SLIGHT_RAIN_SHOWERS => '🌦️',
            self::MODERATE_RAIN_SHOWERS => '🌧️',
            self::VIOLENT_RAIN_SHOWERS => '⛈️',
            self::SLIGHT_SNOW_SHOWERS => '🌨️',
            self::THUNDERSTORM, self::THUNDERSTORM_SLIGHT_HAIL, self::THUNDERSTORM_HEAVY_HAIL => '⛈️',
        };
    }
}

/**
 * Weather Data Transfer Object
 */
readonly class WeatherData
{
    public function __construct(
        public float $temperature,
        public float $feelsLike,
        public int $humidity,
        public float $windSpeed,
        public int $windDirection,
        public float $precipitation,
        public int $weatherCode,
        public string $description,
        public string $icon,
    ) {}

    /**
     * Create from API response
     */
    public static function fromApiResponse(array $data): self
    {
        $weatherCode = WeatherCode::tryFrom($data['weather_code']) ?? WeatherCode::CLEAR_SKY;
        
        return new self(
            temperature: (float) $data['temperature_2m'],
            feelsLike: (float) $data['apparent_temperature'],
            humidity: (int) $data['relative_humidity_2m'],
            windSpeed: (float) $data['wind_speed_10m'],
            windDirection: (int) $data['wind_direction_10m'],
            precipitation: (float) $data['precipitation'],
            weatherCode: $data['weather_code'],
            description: $weatherCode->getDescription(),
            icon: $weatherCode->getIcon(),
        );
    }

    /**
     * Convert to array for JSON response
     */
    public function toArray(): array
    {
        return [
            'temperature' => round($this->temperature, 1),
            'feels_like' => round($this->feelsLike, 1),
            'humidity' => $this->humidity,
            'wind_speed' => round($this->windSpeed, 1),
            'wind_direction' => $this->windDirection,
            'precipitation' => round($this->precipitation, 2),
            'weather_code' => $this->weatherCode,
            'description' => $this->description,
            'icon' => $this->icon,
        ];
    }
}

/**
 * Location Data Transfer Object
 */
readonly class Location
{
    public function __construct(
        public float $latitude,
        public float $longitude,
        public string $name,
        public ?string $country = null,
        public ?string $admin = null,
    ) {}

    public function getDisplayName(): string
    {
        $parts = [$this->name];
        if ($this->admin) $parts[] = $this->admin;
        if ($this->country) $parts[] = $this->country;
        return implode(', ', $parts);
    }
}

/**
 * Weather Service Class
 * Handles all weather-related API calls
 */
class WeatherService
{
    private const WEATHER_API_BASE = 'https://api.open-meteo.com/v1';
    private const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1';

    /**
     * Fetch weather data by coordinates
     */
    public function getWeatherByCoordinates(
        float $latitude,
        float $longitude,
        bool $includeForecast = true
    ): array|false {
        $params = [
            'latitude' => $latitude,
            'longitude' => $longitude,
            'current' => 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
            'timezone' => 'auto',
        ];

        if ($includeForecast) {
            $params['daily'] = 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max';
        }

        $url = self::WEATHER_API_BASE . '/forecast?' . http_build_query($params);
        return $this->makeRequest($url);
    }

    /**
     * Search for locations by name
     */
    public function searchLocations(string $query, int $count = 5): array|false
    {
        $params = [
            'name' => $query,
            'count' => $count,
            'language' => 'en',
            'format' => 'json',
        ];

        $url = self::GEOCODING_API_BASE . '/search?' . http_build_query($params);
        return $this->makeRequest($url);
    }

    /**
     * Make HTTP request with error handling
     */
    private function makeRequest(string $url): array|false
    {
        $context = stream_context_create([
            'http' => [
                'timeout' => 10,
                'user_agent' => 'WeatherApp/1.0',
            ],
        ]);

        $response = @file_get_contents($url, false, $context);
        
        if ($response === false) {
            error_log("Failed to fetch data from: $url");
            return false;
        }

        $data = json_decode($response, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("JSON decode error: " . json_last_error_msg());
            return false;
        }

        return $data;
    }
}

/**
 * API Response Helper
 */
class ApiResponse
{
    public static function success(mixed $data, string $message = 'Success'): never
    {
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], JSON_PRETTY_PRINT);
        exit;
    }

    public static function error(string $message, int $code = 400): never
    {
        http_response_code($code);
        echo json_encode([
            'success' => false,
            'message' => $message,
            'data' => null,
        ], JSON_PRETTY_PRINT);
        exit;
    }
}

/**
 * Main API Handler
 */
class WeatherApiHandler
{
    public function __construct(
        private readonly WeatherService $weatherService
    ) {}

    public function handleRequest(): void
    {
        $action = $_GET['action'] ?? 'weather';

        match($action) {
            'weather' => $this->handleWeatherRequest(),
            'search' => $this->handleSearchRequest(),
            'forecast' => $this->handleForecastRequest(),
            default => ApiResponse::error('Invalid action', 404),
        };
    }

    private function handleWeatherRequest(): void
    {
        $lat = $_GET['lat'] ?? null;
        $lon = $_GET['lon'] ?? null;

        if (!$lat || !$lon) {
            ApiResponse::error('Latitude and longitude are required');
        }

        if (!is_numeric($lat) || !is_numeric($lon)) {
            ApiResponse::error('Invalid coordinates');
        }

        $data = $this->weatherService->getWeatherByCoordinates(
            latitude: (float) $lat,
            longitude: (float) $lon,
            includeForecast: true
        );

        if ($data === false) {
            ApiResponse::error('Failed to fetch weather data', 500);
        }

        // Process current weather
        $currentWeather = WeatherData::fromApiResponse($data['current']);

        ApiResponse::success([
            'current' => $currentWeather->toArray(),
            'daily' => $data['daily'] ?? [],
            'timezone' => $data['timezone'] ?? 'UTC',
        ]);
    }

    private function handleSearchRequest(): void
    {
        $query = $_GET['q'] ?? '';

        if (strlen($query) < 2) {
            ApiResponse::error('Search query must be at least 2 characters');
        }

        $data = $this->weatherService->searchLocations($query);

        if ($data === false) {
            ApiResponse::error('Failed to search locations', 500);
        }

        $locations = [];
        if (isset($data['results'])) {
            foreach ($data['results'] as $result) {
                $location = new Location(
                    latitude: $result['latitude'],
                    longitude: $result['longitude'],
                    name: $result['name'],
                    country: $result['country'] ?? null,
                    admin: $result['admin1'] ?? null,
                );
                $locations[] = [
                    'latitude' => $location->latitude,
                    'longitude' => $location->longitude,
                    'name' => $location->name,
                    'display_name' => $location->getDisplayName(),
                ];
            }
        }

        ApiResponse::success($locations);
    }

    private function handleForecastRequest(): void
    {
        $lat = $_GET['lat'] ?? null;
        $lon = $_GET['lon'] ?? null;
        $days = min((int) ($_GET['days'] ?? 7), 16); // Max 16 days

        if (!$lat || !$lon) {
            ApiResponse::error('Latitude and longitude are required');
        }

        $data = $this->weatherService->getWeatherByCoordinates(
            latitude: (float) $lat,
            longitude: (float) $lon,
            includeForecast: true
        );

        if ($data === false) {
            ApiResponse::error('Failed to fetch forecast data', 500);
        }

        ApiResponse::success([
            'daily' => $data['daily'] ?? [],
            'timezone' => $data['timezone'] ?? 'UTC',
        ]);
    }
}

// Run the API handler only if accessed directly (not included)
if (basename($_SERVER['PHP_SELF']) === 'api.php') {
    $weatherService = new WeatherService();
    $apiHandler = new WeatherApiHandler($weatherService);
    $apiHandler->handleRequest();
}
