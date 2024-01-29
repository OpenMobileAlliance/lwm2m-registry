from fastapi.testclient import TestClient
from main import app
import database

client = TestClient(app)

# Test getting a device that exists
def test_get_device_success():
    device_id = list(database.devices.keys())[0]  # Get the first device ID from the mock database
    response = client.get(f"/lwm2m/v1/devices/{device_id}")
    assert response.status_code == 200
    assert response.json()["endpointName"] == device_id

# Test getting a device that does not exist
def test_get_device_not_found():
    response = client.get("/lwm2m/v1/devices/nonexistent-device")
    assert response.status_code == 404
    assert response.json() == {"detail": "Device not found"}

# Test creating a device observation
def test_create_device_observation():
    device_id = list(database.devices.keys())[0]  # Use an existing device ID
    response = client.post(f"/lwm2m/v1/devices/{device_id}/observations", json={})
    assert response.status_code == 200  # Assuming the endpoint returns 200 OK for a successful creation
    # Check if the response contains an observationId (you'll need to adjust the key based on your actual model)
    assert "observationId" in response.json()

# Test getting all observations for a device
def test_get_device_observations():
    device_id = list(database.devices.keys())[0]  # Use an existing device ID
    response = client.get(f"/lwm2m/v1/devices/{device_id}/observations")
    assert response.status_code == 200
    # The response should be a list of observations
    assert isinstance(response.json()["data"], list)

# Test getting a specific device observation
def test_get_specific_device_observation():
    device_id = list(database.devices.keys())[0]  # Use an existing device ID
    observation_id = list(database.observations[device_id].keys())[0]  # Use an existing observation ID
    response = client.get(f"/lwm2m/v1/devices/{device_id}/observations/{observation_id}")
    print(response.json())  # Temporarily print the response data

    assert response.status_code == 200
    # Update the following line to match the actual keys and structure of the response
    response_data = response.json()
    # The response should be an observation object, adjust the keys as per your actual response
    assert response_data["observationId"] == observation_id
    assert "creationDate" in response_data
    assert "targets" in response_data

# Test deleting a device observation
def test_delete_device_observation():
    device_id = list(database.devices.keys())[0]  # Use an existing device ID
    observation_id = list(database.observations[device_id].keys())[0]  # Use an existing observation ID
    response = client.delete(f"/lwm2m/v1/devices/{device_id}/observations/{observation_id}")
    assert response.status_code == 204  # No content should be returned for a successful delete

# Add more tests for other endpoints like creating operations, getting operations, deleting operations, etc.

# Remember to import any additional models or functions you need for the tests