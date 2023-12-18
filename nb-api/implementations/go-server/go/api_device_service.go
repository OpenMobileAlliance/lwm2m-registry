package openapi

import (
	"context"
	"net/http"
	"time"
)

type DeviceAPIService struct{}

func NewDeviceAPIService() DeviceAPIServicer {
	return &DeviceAPIService{}
}

func (s *DeviceAPIService) GetDevice(ctx context.Context, deviceId string) (ImplResponse, error) {
	devices := []Device{
		{
			EndpointName: "device1",
			Binding:      "U",
			LwM2MVersion: "1.0",
			Registration: time.Now(),
			Lifetime:     300,
			Objects: []Device_objects_inner{
				{
					ObjectId:         1,
					ObjectInstanceId: 0,
					ObjectVersion:    "1.0",
				},
			},
		},
		{
			EndpointName: "device2",
			Binding:      "UQ",
			LwM2MVersion: "1.1",
			Registration: time.Now(),
			Lifetime:     600,
			Objects: []Device_objects_inner{
				{
					ObjectId:         2,
					ObjectInstanceId: 0,
					ObjectVersion:    "1.0",
				},
			},
		},
	}

	for _, device := range devices {
		if device.EndpointName == deviceId {
			return Response(http.StatusOK, device), nil
		}
	}

	return Response(http.StatusNotFound, GenericError{Code: "error_404", Message: "deviceId not found"}), nil
}
