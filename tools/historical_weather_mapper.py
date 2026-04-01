#!/usr/bin/env python3
"""
historical_weather_mapper.py

Fetches historical weather data from the Open-Meteo API and maps each weather
variable to the appropriate LwM2M/IPSO object, producing a JSON structure that
mirrors the LwM2M data model.

LwM2M object mapping:
  temperature_2m      -> 3303  Temperature       (Cel)
  relative_humidity_2m -> 3304 Humidity          (%RH)
  surface_pressure    -> 3315  Barometer         (hPa)
  wind_speed_10m      -> 3300  Generic Sensor    (km/h)
  wind_direction_10m  -> 3346  Direction         (deg)
  precipitation       -> 3300  Generic Sensor    (mm)
  cloud_cover         -> 3300  Generic Sensor    (%)

Usage:
  python historical_weather_mapper.py \\
      --latitude 48.8566 --longitude 2.3522 \\
      --start-date 2024-01-01 --end-date 2024-01-03 --pretty
"""

import argparse
import json
import sys
from datetime import datetime, timezone

try:
    import requests
except ImportError:
    print(
        "ERROR: 'requests' library is required. "
        "Install it with: pip install -r tools/requirements.txt",
        file=sys.stderr,
    )
    sys.exit(1)

# ---------------------------------------------------------------------------
# Mapping configuration
# Each entry defines how one Open-Meteo variable maps to a LwM2M object.
# ---------------------------------------------------------------------------
VARIABLE_MAP = [
    {
        "variable": "temperature_2m",
        "objectID": 3303,
        "objectName": "Temperature",
        "objectURN": "urn:oma:lwm2m:ext:3303:1.1",
        "unit": "Cel",
    },
    {
        "variable": "relative_humidity_2m",
        "objectID": 3304,
        "objectName": "Humidity",
        "objectURN": "urn:oma:lwm2m:ext:3304:1.1",
        "unit": "%RH",
    },
    {
        "variable": "surface_pressure",
        "objectID": 3315,
        "objectName": "Barometer",
        "objectURN": "urn:oma:lwm2m:ext:3315:1.1",
        "unit": "hPa",
    },
    {
        "variable": "wind_speed_10m",
        "objectID": 3300,
        "objectName": "Generic Sensor",
        "objectURN": "urn:oma:lwm2m:ext:3300:1.1",
        "unit": "km/h",
    },
    {
        "variable": "wind_direction_10m",
        "objectID": 3346,
        "objectName": "Direction",
        "objectURN": "urn:oma:lwm2m:ext:3346:1.1",
        "unit": "deg",
    },
    {
        "variable": "precipitation",
        "objectID": 3300,
        "objectName": "Generic Sensor",
        "objectURN": "urn:oma:lwm2m:ext:3300:1.1",
        "unit": "mm",
    },
    {
        "variable": "cloud_cover",
        "objectID": 3300,
        "objectName": "Generic Sensor",
        "objectURN": "urn:oma:lwm2m:ext:3300:1.1",
        "unit": "%",
    },
]

OPEN_METEO_URL = "https://archive-api.open-meteo.com/v1/archive"


def parse_args():
    parser = argparse.ArgumentParser(
        description=(
            "Fetch historical weather data from Open-Meteo and map it to "
            "LwM2M/IPSO object instances."
        )
    )
    parser.add_argument(
        "--latitude",
        type=float,
        required=True,
        help="Latitude of the location (e.g. 48.8566 for Paris).",
    )
    parser.add_argument(
        "--longitude",
        type=float,
        required=True,
        help="Longitude of the location (e.g. 2.3522 for Paris).",
    )
    parser.add_argument(
        "--start-date",
        required=True,
        metavar="YYYY-MM-DD",
        help="Start date of the historical period (inclusive).",
    )
    parser.add_argument(
        "--end-date",
        required=True,
        metavar="YYYY-MM-DD",
        help="End date of the historical period (inclusive).",
    )
    parser.add_argument(
        "--output",
        default=None,
        metavar="FILE",
        help="Path to output JSON file. Defaults to stdout.",
    )
    parser.add_argument(
        "--pretty",
        action="store_true",
        help="Pretty-print the JSON output.",
    )
    return parser.parse_args()


def fetch_weather(latitude, longitude, start_date, end_date):
    """Fetch hourly weather data from the Open-Meteo historical archive API."""
    variables = [m["variable"] for m in VARIABLE_MAP]
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": ",".join(variables),
        "timezone": "UTC",
        "wind_speed_unit": "kmh",
    }
    try:
        response = requests.get(OPEN_METEO_URL, params=params, timeout=30)
        response.raise_for_status()
    except requests.exceptions.HTTPError as exc:
        print(
            f"ERROR: HTTP error while fetching weather data: {exc}",
            file=sys.stderr,
        )
        sys.exit(1)
    except requests.exceptions.ConnectionError as exc:
        print(
            f"ERROR: Connection error while fetching weather data: {exc}",
            file=sys.stderr,
        )
        sys.exit(1)
    except requests.exceptions.Timeout:
        print(
            "ERROR: Request to Open-Meteo API timed out.",
            file=sys.stderr,
        )
        sys.exit(1)
    except requests.exceptions.RequestException as exc:
        print(
            f"ERROR: Unexpected error while fetching weather data: {exc}",
            file=sys.stderr,
        )
        sys.exit(1)

    return response.json()


def iso_to_unix(iso_str):
    """Convert an ISO 8601 datetime string (UTC) to a Unix timestamp (int)."""
    dt = datetime.strptime(iso_str, "%Y-%m-%dT%H:%M").replace(tzinfo=timezone.utc)
    return int(dt.timestamp())


def build_lwm2m_output(api_response):
    """
    Transform the Open-Meteo API response into a list of LwM2M object
    instance descriptors, one per mapped weather variable.
    """
    hourly = api_response.get("hourly", {})
    timestamps = hourly.get("time", [])

    result = []

    for mapping in VARIABLE_MAP:
        variable = mapping["variable"]
        values = hourly.get(variable, [])

        if not values:
            continue

        instances = []
        min_val = None
        max_val = None

        for iso_time, value in zip(timestamps, values):
            if value is None:
                continue

            unix_ts = iso_to_unix(iso_time)
            instances.append(
                {
                    "timestamp": iso_time,
                    "resources": {
                        "5700": value,
                        "5701": mapping["unit"],
                        "5518": unix_ts,
                        "5750": variable,
                    },
                }
            )
            if min_val is None or value < min_val:
                min_val = value
            if max_val is None or value > max_val:
                max_val = value

        obj_entry = {
            "objectID": mapping["objectID"],
            "objectName": mapping["objectName"],
            "objectURN": mapping["objectURN"],
            "variable": variable,
            "5601": min_val,
            "5602": max_val,
            "instances": instances,
        }

        result.append(obj_entry)

    return result


def main():
    args = parse_args()

    api_response = fetch_weather(
        args.latitude, args.longitude, args.start_date, args.end_date
    )

    output = build_lwm2m_output(api_response)

    indent = 2 if args.pretty else None
    json_str = json.dumps(output, indent=indent)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write(json_str)
            fh.write("\n")
    else:
        print(json_str)


if __name__ == "__main__":
    main()
