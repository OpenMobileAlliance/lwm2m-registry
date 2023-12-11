package openapi

// MockDevice represents a mock device structure
type MockDevice struct {
	EndpointName string        `json:"endpointName"`
	Binding      string        `json:"binding"`
	Registration string        `json:"registration"`
	LwM2MVersion string        `json:"lwM2MVersion"`
	Lifetime     int           `json:"lifetime"`
	Operations   []interface{} `json:"operations"`
	Observations []interface{} `json:"observations"`
	Objects      []Object      `json:"objects"`
}

// Object represents an object structure within a device
type Object struct {
	ObjectVersion    string `json:"objectVersion"`
	ObjectInstanceId int    `json:"objectInstanceId"`
	ObjectId         int    `json:"objectId"`
}

var mockDevices = map[string]MockDevice{
	// Initialize with some devices
	"123": {
		EndpointName: "example-client-123",
		Binding:      "U",
		Registration: "2022-04-01T08:25:31.422Z",
		LwM2MVersion: "1.0",
		Lifetime:     300,
		Operations:   []interface{}{nil, nil},
		Observations: []interface{}{nil, nil},
		Objects: []Object{
			{ObjectVersion: "1.0", ObjectInstanceId: 0, ObjectId: 1},
			{ObjectVersion: "1.0", ObjectInstanceId: 0, ObjectId: 1},
		},
	},
	// Add more devices as needed
}
