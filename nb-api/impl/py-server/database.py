from typing import Dict, Optional
from models import (
    Device,
    CreatedOperationResult,
    CreatedObservationResult,
    Observation,
)
from datetime import datetime, timedelta
import random
import uuid

# Helper function to generate random registration dates
def generate_registration_date(days_offset: int) -> str:
    return (datetime(2024, 1, 29) - timedelta(days=days_offset)).isoformat() + "Z"

# Helper function to generate random lifetime values
def generate_lifetime() -> int:
    return random.choice([300, 600, 1800, 3600, 86400])

# Helper function to generate a unique ID
def generate_unique_id() -> str:
    return str(uuid.uuid4())

# Mock database
devices: Dict[str, Device] = {
    f"urn:dev:os:123-456{i}": Device(
        endpointName=f"urn:dev:os:123-456{i}",
        binding=random.choice(["U", "UQ", "S", "SQ", "T"]),
        lwM2MVersion="1.0",
        registration=generate_registration_date(i),
        lifetime=generate_lifetime(),
        objects=[
            {"objectId": random.randint(1, 10), "objectInstanceId": random.randint(0, 5), "objectVersion": f"{random.randint(1, 3)}.0"},
            # Add more objects with random values
        ],
        observations=[
            # Add observation instances with realistic data
        ],
        operations=[
            # Add operation instances with realistic data
        ],
    )
    for i in range(1, 21)
}

operations: Dict[str, Dict[str, CreatedOperationResult]] = {
    device_id: {
        generate_unique_id(): CreatedOperationResult(operationId=generate_unique_id())
        for _ in range(random.randint(1, 5))
    }
    for device_id in devices
}

observations: Dict[str, Dict[str, CreatedObservationResult]] = {
    device_id: {
        generate_unique_id(): CreatedObservationResult(observationId=generate_unique_id())
        for _ in range(random.randint(1, 5))
    }
    for device_id in devices
}

# Functions to simulate database operations
def get_device(device_id: str) -> Optional[Device]:
    return devices.get(device_id)

def create_operation(device_id: str) -> CreatedOperationResult:
    operation_id = generate_unique_id()
    operation_result = CreatedOperationResult(operationId=operation_id)
    operations[device_id][operation_id] = operation_result
    return operation_result

def get_operations(device_id: str) -> Dict[str, CreatedOperationResult]:
    return operations.get(device_id, {})

def get_operation(device_id: str, operation_id: str) -> Optional[CreatedOperationResult]:
    return operations.get(device_id, {}).get(operation_id)

def delete_operation(device_id: str, operation_id: str) -> bool:
    device_operations = operations.get(device_id, {})
    if operation_id in device_operations:
        del device_operations[operation_id]
        return True
    return False

def create_observation(device_id: str) -> CreatedObservationResult:
    observation_id = generate_unique_id()
    observation_result = CreatedObservationResult(observationId=observation_id)
    observations[device_id][observation_id] = observation_result
    return observation_result

def get_observations(device_id: str) -> Dict[str, CreatedObservationResult]:
    return observations.get(device_id, {})

def get_observation(device_id: str, observation_id: str) -> Optional[CreatedObservationResult]:
    return observations.get(device_id, {}).get(observation_id)

def delete_observation(device_id: str, observation_id: str) -> bool:
    device_observations = observations.get(device_id, {})
    if observation_id in device_observations:
        del device_observations[observation_id]
        return True
    return False

# Add more functions as needed for other operations