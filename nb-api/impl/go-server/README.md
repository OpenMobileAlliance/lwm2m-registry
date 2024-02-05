# LwM2M Northbound API

## Server in Go

### API

This server implements a subset of the [`/api/api.yml`](https://github.com/OpenMobileAlliance/dmso-wg/blob/main/nb-api/api/api.yml) API.

The objective would be to keep adding functionality based on the features described in the [Northbound API Project](https://github.com/orgs/OpenMobileAlliance/projects/5/views/1).

Feel free to suggest PRs or functionality proposals.

### Running the server

To run the server, follow these simple steps:

```
go run main.go
```

You should get this output:

```
2023/12/11 17:10:19 Server started
2023/12/11 17:10:35 GET /lwm2m/v1/devices/device1 GetDevice 1.571945ms
2023/12/11 17:11:21 GET /lwm2m/v1/devices/device2 GetDevice 81.839µs
```

You can test the server and retrieve some device information with:

Request
```
curl -X GET "http://localhost:8080/lwm2m/v1/devices/device2" -H "Content-Type: application/json"| jq
```

Response:
```
{
  "endpointName": "device2",
  "binding": "UQ",
  "lwM2MVersion": "1.1",
  "registration": "2023-12-11T17:11:21.070832+01:00",
  "lifetime": 600,
  "objects": [
    {
      "objectId": 2,
      "objectVersion": "1.0"
    }
  ]
}
```


### Docker

To run the server in a docker container
```
docker build --network=host -t openapi .
```

Once image is built use
```
docker run --rm -it openapi
```

