package openapi

import "time"

type Device struct {
	EndpointName string                 `json:"endpointName,omitempty"`
	Binding      string                 `json:"binding,omitempty"`
	LwM2MVersion string                 `json:"lwM2MVersion,omitempty"`
	Registration time.Time              `json:"registration,omitempty"`
	Lifetime     float32                `json:"lifetime,omitempty"`
	Objects      []Device_objects_inner `json:"objects,omitempty"`
}

type Device_objects_inner struct {
	ObjectId         int    `json:"objectId,omitempty"`
	ObjectInstanceId int    `json:"objectInstanceId,omitempty"`
	ObjectVersion    string `json:"objectVersion,omitempty"`
}

// AssertDevice_objects_innerRequired checks if the required fields are not zero-ed
func AssertDevice_objects_innerRequired(obj Device_objects_inner) error {
	// Add your validation logic here
	return nil
}
