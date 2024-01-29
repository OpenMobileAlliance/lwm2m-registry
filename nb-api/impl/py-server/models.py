from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field, root_validator, ValidationError

# Define your Enums
class Operation(Enum):
    READ = 'READ'
    EXECUTE = 'EXECUTE'
    DISCOVER = 'DISCOVER'
    DELETE = 'DELETE'

class Operation1(Enum):
    WRITE = 'WRITE'
    CREATE = 'CREATE'

class Operation2(Enum):
    READ = 'READ'
    WRITE = 'WRITE'
    EXECUTE = 'EXECUTE'
    DISCOVER = 'DISCOVER'
    CREATE = 'CREATE'
    DELETE = 'DELETE'

class Status(Enum):
    ONGOING = 'ONGOING'
    COMPLETED = 'COMPLETED'

class ValueType(Enum):
    NUMBER = 'NUMBER'
    STRING = 'STRING'
    BOOLEAN = 'BOOLEAN'

class ValueType1(Enum):
    NUMBER = 'NUMBER'
    STRING = 'STRING'
    BOOLEAN = 'BOOLEAN'

class Type(Enum):
    DATA = 'DATA'

class Type1(Enum):
    ERROR = 'ERROR'

# Define your models
class GenericError(BaseModel):
    code: Optional[str] = Field(None, example='error_0')
    message: Optional[str] = Field(None, example='An error occurred')

class Pagination(BaseModel):
    totalElements: Optional[int] = Field(None, example=1)
    totalPages: Optional[int] = Field(None, example=1)
    pageSize: Optional[int] = Field(None, example=10)
    count: Optional[int] = Field(None, example=1)
    page: Optional[int] = Field(None, example=1)
    nextPage: Optional[str] = Field(None, example='/api/uri?page=2&size=10')

class Target(BaseModel):
    path: str = Field(..., example='/3/0/2')

class Target1(BaseModel):
    path: str = Field(..., example='/3/0/2')
    value: Dict[str, Any] = Field(..., example='1233456789')

class Target2(BaseModel):
    path: Optional[str] = Field(None, example='/3/0/2')
    value: Optional[Dict[str, Any]] = Field(None, example='1233456789')

class Target3(BaseModel):
    path: Optional[str] = Field(None, example='/3/0/2')

class Target4(BaseModel):
    path: Optional[str] = Field(None, example='/3/0/2')

class CreateOperationWithoutValue(BaseModel):
    operation: Operation
    targets: List[Target]

class CreateOperationWithValue(BaseModel):
    operation: Operation1
    targets: List[Target1]

class CreatedOperationResult(BaseModel):
    operationId: Optional[str] = Field(None, example='01CD')

class MinimalDeviceOperation(BaseModel):
    operation: Optional[Operation2] = Field(None, description='The type of the operation')
    status: Optional[Status] = Field(None, description='The status of the operation', example='COMPLETED')
    completenessDate: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')

class PaginatedDeviceOperation(MinimalDeviceOperation):
    operationId: Optional[str] = Field(None, example='01CD')

class DeviceOperation(MinimalDeviceOperation):
    targets: Optional[List[Target2]] = None
    successTargets: Optional[int] = Field(None, example=1)
    errorTargets: Optional[int] = Field(None, example=0)
    creationDate: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')

class SingleOperationDataReport(BaseModel):
    path: str = Field(..., example='/3/0/2')
    value: Dict[str, Any] = Field(..., example=1233456789)
    valueType: Optional[ValueType] = None
    deviceTimestamp: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')
    serverTimestamp: datetime = Field(..., example='2023-09-25T16:30:00.000Z')

class SingleOperationErrorReport(BaseModel):
    path: str = Field(..., example='/3/0/2')
    failureReason: str = Field(..., example='An error occurred')
    serverTimestamp: datetime = Field(..., example='2023-09-25T16:30:00.000Z')

class CreateObservation(BaseModel):
    targets: Optional[List[Target3]] = None

class CreatedObservationResult(BaseModel):
    observationId: Optional[str] = Field(None, example='50B5')

class PaginatedObservation(BaseModel):
    observationId: Optional[str] = Field(None, example='50B5')

class Observation(BaseModel):
    creationDate: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')
    targets: Optional[List[Target4]] = None

class CommonNotification(BaseModel):
    deviceId: Optional[str] = Field(None, example='example-client')

class PaginatedObservationNotificationData(BaseModel):
    type: Type
    notificationId: str = Field(..., example='A1B2')
    deviceTimestamp: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')
    serverTimestamp: datetime = Field(..., example='2023-09-25T16:30:00.000Z')

class PaginatedObservationNotificationError(BaseModel):
    type: Type1
    notificationId: str = Field(..., example='A1B2')
    serverTimestamp: datetime = Field(..., example='2023-09-25T16:30:00.000Z')

class Value(BaseModel):
    value: Optional[Dict[str, Any]] = Field(None, example='1233456789')
    valueType: Optional[ValueType1] = None
    deviceTimestamp: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')
    serverTimestamp: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')

class ResultDataNotification(Value):
    path: Optional[str] = Field(None, example='/3/0/2')

class ResultErrorNotification(BaseModel):
    failureReason: Optional[str] = Field(None, example='Reason for failure')
    serverTimestamp: Optional[datetime] = Field(None, example='2023-09-25T16:30:00.000Z')

class ObservationDataNotification(CommonNotification):
    observationId: Optional[str] = Field(None, example='50B5')
    notificationId: Optional[str] = Field(None, example='14')
    results: Optional[List[ResultDataNotification]] = None

class Object(BaseModel):
    objectId: Optional[int] = Field(None, example=1)
    objectInstanceId: Optional[int] = Field(None, example=0)
    objectVersion: Optional[str] = Field(None, example='1.0')

class Device(BaseModel):
    endpointName: Optional[str] = Field(None, example='example-client')
    binding: Optional[str] = Field(None, example='U')
    lwM2MVersion: Optional[str] = Field(None, example='1.0')
    registration: Optional[datetime] = Field(None, example='2022-04-01T08:25:31.422+00:00')
    lifetime: Optional[float] = Field(None, example=300)
    objects: Optional[List[Object]] = None
    observations: Optional[List[Observation]] = None
    operations: Optional[List[DeviceOperation]] = None

class Lwm2mV1DevicesDeviceIdOperationsGetResponse(Pagination):
    data: Optional[List[PaginatedDeviceOperation]] = None

class Lwm2mV1DevicesDeviceIdOperationsOperationIdSuccessTargetsGetResponse(Pagination):
    data: Optional[List[SingleOperationDataReport]] = None

class Lwm2mV1DevicesDeviceIdOperationsOperationIdErrorTargetsGetResponse(Pagination):
    data: Optional[List[SingleOperationErrorReport]] = None

class Lwm2mV1DevicesDeviceIdObservationsGetResponse(Pagination):
    data: Optional[List[PaginatedObservation]] = None

# Define Union models using Pydantic's `conint` for discriminating field types
class CreateOperation(BaseModel):
    operation_type: Union[Operation, Operation1]
    targets: Union[List[Target], List[Target1]]

    @root_validator(pre=True)
    def validate_operation(cls, values):
        operation_type, targets = values.get('operation_type'), values.get('targets')
        if operation_type in Operation1.__members__.values():
            assert all(isinstance(t, Target1) for t in targets), 'All targets must be of type Target1'
        elif operation_type in Operation.__members__.values():
            assert all(isinstance(t, Target) for t in targets), 'All targets must be of type Target'
        return values

class PaginatedObservationNotification(BaseModel):
    type: Union[Type, Type1]
    notificationId: str
    serverTimestamp: datetime
    deviceTimestamp: Optional[datetime] = None

    @root_validator(pre=True)
    def validate_notification(cls, values):
        type_ = values.get('type')
        if type_ == Type.DATA:
            assert 'notificationId' in values, 'notificationId is required for DATA type'
            assert 'serverTimestamp' in values, 'serverTimestamp is required for DATA type'
        elif type_ == Type1.ERROR:
            assert 'notificationId' in values, 'notificationId is required for ERROR type'
            assert 'serverTimestamp' in values, 'serverTimestamp is required for ERROR type'
        return values

class Lwm2mV1DevicesDeviceIdObservationsObservationIdNotificationsGetResponse(Pagination):
    data: Optional[List[PaginatedObservationNotification]] = None