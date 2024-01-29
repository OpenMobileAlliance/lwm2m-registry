from fastapi import FastAPI, Path, HTTPException, Query, Body
from typing import List

from models import (
    CreatedObservationResult,
    CreatedOperationResult,
    CreateObservation,
    CreateOperation,
    Device,
    DeviceOperation,
    GenericError,
    Lwm2mV1DevicesDeviceIdObservationsGetResponse,
    Lwm2mV1DevicesDeviceIdObservationsObservationIdNotificationsGetResponse,
    Lwm2mV1DevicesDeviceIdOperationsGetResponse,
    Lwm2mV1DevicesDeviceIdOperationsOperationIdErrorTargetsGetResponse,
    Lwm2mV1DevicesDeviceIdOperationsOperationIdSuccessTargetsGetResponse,
    Observation,
    ObservationDataNotification,
    Pagination,
    SingleOperationDataReport,
    SingleOperationErrorReport,
)
import database

app = FastAPI(
    title='LwM2M NB APIs',
    version='1.1.0',
    servers=[{'url': 'http://127.0.0.1:8000'}],
)

# Device Endpoints
@app.get(
    '/lwm2m/v1/devices/{deviceId}',
    response_model=Device,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device'],
)
async def get_device(
    device_id: str = Path(..., alias='deviceId')
) -> Device:
    """
    Get device information
    """
    device = database.get_device(device_id)
    if device:
        return device
    else:
        raise HTTPException(status_code=404, detail="Device not found")


# Device Observation Endpoints
@app.post(
    '/lwm2m/v1/devices/{deviceId}/observations',
    response_model=CreatedObservationResult,
    responses={'400': {'model': GenericError}, '401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Observation'],
)
async def create_device_observation(
    device_id: str = Path(..., alias='deviceId'),
    observation: CreateObservation = Body(...)
) -> CreatedObservationResult:
    """
    Create a new device observation
    """
    return database.create_observation(device_id)

@app.get(
    '/lwm2m/v1/devices/{deviceId}/observations',
    response_model=Lwm2mV1DevicesDeviceIdObservationsGetResponse,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Observation'],
)
async def get_device_observations(
    device_id: str = Path(..., alias='deviceId'),
    page: int = Query(1, alias='page'),
    size: int = Query(10, alias='size')
) -> Lwm2mV1DevicesDeviceIdObservationsGetResponse:
    """
    Get all the device observations
    """
    observations = database.get_observations(device_id)
    if not observations:
        raise HTTPException(status_code=404, detail="Device not found or no observations exist")
    
    # Implement pagination logic if necessary
    start = (page - 1) * size
    end = start + size
    paginated_observations = list(observations.values())[start:end]

    # Construct the response
    response = Lwm2mV1DevicesDeviceIdObservationsGetResponse(
        totalElements=len(observations),
        totalPages=(len(observations) - 1) // size + 1,
        pageSize=size,
        count=len(paginated_observations),
        page=page,
        nextPage=f"/lwm2m/v1/devices/{device_id}/observations?page={page + 1}&size={size}" if end < len(observations) else None,
        data=paginated_observations
    )
    return response

@app.get(
    '/lwm2m/v1/devices/{deviceId}/observations/{observationId}',
    response_model=Observation,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Observation'],
)
async def get_device_observation(
    device_id: str = Path(..., alias='deviceId'),
    observation_id: str = Path(..., alias='observationId')
) -> Observation:
    """
    Get the state of a device observation
    """
    observation = database.get_observation(device_id, observation_id)
    if observation:
        return observation
    else:
        raise HTTPException(status_code=404, detail="Observation not found")

@app.delete(
    '/lwm2m/v1/devices/{deviceId}/observations/{observationId}',
    status_code=204,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Observation'],
)
async def delete_device_observation(
    device_id: str = Path(..., alias='deviceId'),
    observation_id: str = Path(..., alias='observationId'),
):
    """
    Delete a device observation
    """
    success = database.delete_observation(device_id, observation_id)
    if not success:
        raise HTTPException(status_code=404, detail="Observation not found")

# Device Operation Endpoints
@app.post(
    '/lwm2m/v1/devices/{deviceId}/operations',
    response_model=CreatedOperationResult,
    status_code=202,
    responses={'400': {'model': GenericError}, '401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Operation'],
)
async def create_device_operation(
    device_id: str = Path(..., alias='deviceId'),
    operation: CreateOperation = Body(...)
) -> CreatedOperationResult:
    """
    Create a new device operation
    """
    return database.create_operation(device_id)

@app.get(
    '/lwm2m/v1/devices/{deviceId}/operations',
    response_model=Lwm2mV1DevicesDeviceIdOperationsGetResponse,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Operation'],
)
async def get_device_operations(
    device_id: str = Path(..., alias='deviceId'),
    page: int = Query(1, alias='page'),
    size: int = Query(10, alias='size')
) -> Lwm2mV1DevicesDeviceIdOperationsGetResponse:
    """
    Get all the device operations
    """
    operations = database.get_operations(device_id)
    # Pagination logic would go here
    return Lwm2mV1DevicesDeviceIdOperationsGetResponse(data=list(operations.values()))

@app.get(
    '/lwm2m/v1/devices/{deviceId}/operations/{operationId}',
    response_model=DeviceOperation,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Operation'],
)
async def get_device_operation(
    device_id: str = Path(..., alias='deviceId'),
    operation_id: str = Path(..., alias='operationId')
) -> DeviceOperation:
    """
    Get the state of a device operation
    """
    operation = database.get_operation(device_id, operation_id)
    if operation:
        return operation
    else:
        raise HTTPException(status_code=404, detail="Operation not found")

@app.delete(
    '/lwm2m/v1/devices/{deviceId}/operations/{operationId}',
    status_code=204,
    responses={'401': {'model': GenericError}, '403': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Operation'],
)
async def delete_device_operation(
    device_id: str = Path(..., alias='deviceId'),
    operation_id: str = Path(..., alias='operationId'),
):
    """
    Delete a completed device operation
    """
    success = database.delete_operation(device_id, operation_id)
    if not success:
        raise HTTPException(status_code=404, detail="Operation not found")

@app.get(
    '/lwm2m/v1/devices/{deviceId}/operations/{operationId}/errorTargets',
    response_model=Lwm2mV1DevicesDeviceIdOperationsOperationIdErrorTargetsGetResponse,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Operation'],
)
async def get_device_operation_error_targets(
    device_id: str = Path(..., alias='deviceId'),
    operation_id: str = Path(..., alias='operationId'),
    page: int = Query(1, alias='page'),
    size: int = Query(10, alias='size')
) -> Lwm2mV1DevicesDeviceIdOperationsOperationIdErrorTargetsGetResponse:
    """
    Get device operation error targets
    """
    # This would retrieve error targets for a specific operation
    # For now, we return an empty list as a placeholder
    return Lwm2mV1DevicesDeviceIdOperationsOperationIdErrorTargetsGetResponse(data=[])

@app.get(
    '/lwm2m/v1/devices/{deviceId}/operations/{operationId}/successTargets',
    response_model=Lwm2mV1DevicesDeviceIdOperationsOperationIdSuccessTargetsGetResponse,
    responses={'401': {'model': GenericError}, '404': {'model': GenericError}},
    tags=['Device Operation'],
)
async def get_device_operation_success_targets(
    device_id: str = Path(..., alias='deviceId'),
    operation_id: str = Path(..., alias='operationId'),
    page: int = Query(1, alias='page'),
    size: int = Query(10, alias='size')
) -> Lwm2mV1DevicesDeviceIdOperationsOperationIdSuccessTargetsGetResponse:
    """
    Get device operation success targets
    """
    # This would retrieve success targets for a specific operation
    # For now, we return an empty list as a placeholder
    return Lwm2mV1DevicesDeviceIdOperationsOperationIdSuccessTargetsGetResponse(data=[])

# ... add any additional endpoints as needed ...