# LwM2M Registry Tools

## historical_weather_mapper.py

A standalone Python 3.8+ utility that fetches historical weather data from the
[Open-Meteo historical weather API](https://open-meteo.com/en/docs/historical-weather-api)
(free, no API key required) and maps each weather variable to the appropriate
[LwM2M/IPSO object](https://github.com/OpenMobileAlliance/lwm2m-registry),
producing a JSON structure that mirrors the LwM2M data model.

### LwM2M Object Mapping

| Weather Variable (Open-Meteo) | LwM2M Object ID | Object Name | Unit | Resource 5701 |
|---|---|---|---|---|
| `temperature_2m` | 3303 | Temperature | °C | `Cel` |
| `relative_humidity_2m` | 3304 | Humidity | % | `%RH` |
| `surface_pressure` | 3315 | Barometer | hPa | `hPa` |
| `wind_speed_10m` | 3300 | Generic Sensor | km/h | `km/h` |
| `wind_direction_10m` | 3346 | Direction | ° | `deg` |
| `precipitation` | 3300 | Generic Sensor | mm | `mm` |
| `cloud_cover` | 3300 | Generic Sensor | % | `%` |

Each object instance uses the following LwM2M resource IDs:

| Resource ID | Name | Description |
|---|---|---|
| `5700` | Sensor Value | Measured value for the time step |
| `5701` | Sensor Units | Unit string (e.g. `Cel`, `%RH`, `hPa`) |
| `5518` | Timestamp | Unix epoch timestamp of the measurement |
| `5750` | Application Type | Open-Meteo variable name (e.g. `temperature_2m`) |
| `5601` | Min Measured Value | Minimum value across the full time series |
| `5602` | Max Measured Value | Maximum value across the full time series |

### Installation

```bash
pip install -r tools/requirements.txt
```

### Usage

```
python tools/historical_weather_mapper.py \
    --latitude LATITUDE \
    --longitude LONGITUDE \
    --start-date YYYY-MM-DD \
    --end-date YYYY-MM-DD \
    [--output FILE] \
    [--pretty]
```

#### Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `--latitude` | float | yes | Latitude of the location |
| `--longitude` | float | yes | Longitude of the location |
| `--start-date` | YYYY-MM-DD | yes | Start date of the historical period (inclusive) |
| `--end-date` | YYYY-MM-DD | yes | End date of the historical period (inclusive) |
| `--output` | path | no | Output JSON file path (default: stdout) |
| `--pretty` | flag | no | Pretty-print the JSON output |

### Example

Fetch weather data for Paris from 1–3 January 2024:

```bash
python tools/historical_weather_mapper.py \
    --latitude 48.8566 \
    --longitude 2.3522 \
    --start-date 2024-01-01 \
    --end-date 2024-01-03 \
    --pretty
```

Sample output (truncated):

```json
[
  {
    "objectID": 3303,
    "objectName": "Temperature",
    "objectURN": "urn:oma:lwm2m:ext:3303:1.1",
    "variable": "temperature_2m",
    "5601": -2.3,
    "5602": 8.1,
    "instances": [
      {
        "timestamp": "2024-01-01T00:00",
        "resources": {
          "5700": 4.2,
          "5701": "Cel",
          "5518": 1704067200,
          "5750": "temperature_2m"
        }
      },
      {
        "timestamp": "2024-01-01T01:00",
        "resources": {
          "5700": 3.9,
          "5701": "Cel",
          "5518": 1704070800,
          "5750": "temperature_2m"
        }
      }
    ]
  },
  {
    "objectID": 3304,
    "objectName": "Humidity",
    "objectURN": "urn:oma:lwm2m:ext:3304:1.1",
    "variable": "relative_humidity_2m",
    "5601": 62,
    "5602": 95,
    "instances": [
      {
        "timestamp": "2024-01-01T00:00",
        "resources": {
          "5700": 88,
          "5701": "%RH",
          "5518": 1704067200,
          "5750": "relative_humidity_2m"
        }
      }
    ]
  }
]
```

To save the output to a file:

```bash
python tools/historical_weather_mapper.py \
    --latitude 48.8566 \
    --longitude 2.3522 \
    --start-date 2024-01-01 \
    --end-date 2024-01-03 \
    --output paris_weather.json \
    --pretty
```
