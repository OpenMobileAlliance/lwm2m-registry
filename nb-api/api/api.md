# Northbound API for LwM2M

There are three categories of APIs:

- "Device" to retrieve information on the LwM2M Clients.
- "Device Operation" to perform the DMSE interface operations (Read, Write, Execute, Create, Delete)
- "Device Observation" to perform the Information Reporting interface operations (Observe, Cancel-Observe)

For the sake of clarity, the webhooks or callbacks invoked for operation results or notifications are not documented in the openapi file.

## Notes

There are no distinction between single and composite operations. Their differ only by the number of targeted URIs.

To handle the LwM2M operations asynchronicity, the APIs follow the same pattern:

1. Start a LwM2M operation by sending a POST on the device operation API. This  returns an operation handle.
2. Retrieve the operation result by sending a GET on the operation handle

The operation result and the notifications are also sent to the user-provided webhooks.

## Examples

### READ on /3/0/2

#### Request

```http
POST https://example.com/lwm2m/v1/devices/example-client/operations HTTP/1.1
content-type: application/json

{
  "operation": "READ",
  "targets": [
    {
      "path": "/3/0/2"
    }
  ]
}
```

#### Response

```http
HTTP/1.1 202 Accepted
content-type: application/json

{
  "operationId": "01CD"
}
```

#### Operation Result

```http
GET https://example.com/lwm2m/v1/devices/example-client/operations/01CD HTTP/1.1
```

```http
HTTP/1.1 200 OK
content-type: application/json

{
  "operation": "READ",
  "status": "COMPLETED",
  "completenessDate": "2023-09-17T16:30:01.000Z",
  "targets": [
    {
      "path": "/3/0/2",
      "value": "1233456789"
    }
  ],
  "successTargets": 1,
  "errorTargets": 0,
  "creationDate": "2023-09-17T16:30:00.000Z"
}
```

### Composite-Observe on Location Object and Battery Level Resource

#### Request

```http
POST https://example.com/lwm2m/v1/devices/example-client/observations HTTP/1.1
content-type: application/json

{
  "targets": [
    {
      "path": "/3/0/9"
    },
    {
      "path": "/6"
    }
  ]
}
```

#### Response

```http
HTTP/1.1 200 OK
content-type: application/json

{
  "observationId": "50B5"
}
```

#### Notifications

Request sent by the LwM2M Server to the user-provided webhook.

```http
POST https://user-server.com/callback/notification HTTP/1.1
content-type: application/json

{
  "deviceId": "example-client",
  "observationId": "50B5",
  "notificationId": "14",
  "results": [
    {
      "path": "/3/0/9",
      "value": 95,
      "valueType": "NUMBER",
      "deviceTimestamp": "2023-09-25T16:30:00.000Z",
      "serverTimestamp": "2023-09-25T16:30:00.000Z"
    },
    {
      "path": "/6/0/0",
      "value": 43.60702765648389,
      "valueType": "NUMBER",
      "deviceTimestamp": "2023-09-25T16:30:00.000Z",
      "serverTimestamp": "2023-09-25T16:30:00.000Z"
    },
    {
      "path": "/6/0/1",
      "value": 3.9228139105998716,
      "valueType": "NUMBER",
      "deviceTimestamp": "2023-09-25T16:30:00.000Z",
      "serverTimestamp": "2023-09-25T16:30:00.000Z"
    }
  ]
}
```



