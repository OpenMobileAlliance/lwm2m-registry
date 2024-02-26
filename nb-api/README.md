# Northbound API for LwM2M

The Northbound API for LwM2M (Lightweight Machine to Machine) is designed to facilitate communication and management of IoT (Internet of Things) devices.

It provides a set of standardized methods that can be used by external systems to perform tasks such as reading device data, writing configuration settings to devices, executing functions on devices, or subscribing to notifications from devices.

It abstracts the lower-level details of the LwM2M protocol, making it easier for developers to integrate IoT device management capabilities into their applications without needing deep knowledge of the underlying protocol.

This repository contains materials and resources for the development of a Northbound API (NB API). The resources include workshop materials, meeting minutes, and API examples to aid in the development process.

```
.
├── README.md
├── api
├── arch
├── docs
├── impl
└── minutes
```

## Repository Structure

- `/api`: This directory contains the API definitions and specifications for the Northbound API. It includes both `.md` and `.yml` files for definition.

Feel free to add more details to the design document at [api.md](https://github.com/OpenMobileAlliance/dmso-wg/blob/c7296330c4240d8b48a8f9d963abfe0070707afb/nb-api/api/api.md). Changes to the official API should be submitted against [`api.yml`](https://github.com/OpenMobileAlliance/dmso-wg/blob/main/nb-api/api/api.yml). Please check for errors with `yamllint` before submitting.

- `/arch`: This directory contains archived items, including presentations and proposals.

- `/docs`: This where documentation and work in progress items are stored.

- `/impl`: This directory stands for "implementations" and contains code related to the client or server implementations of the Northbound API. Please upload yours on a subfolder in the path. Below you have links to the existing ones:

  - [go-server](https://github.com/OpenMobileAlliance/dmso-wg/tree/main/nb-api/impl/go-server) Basic implementation in Go.

  - [python-server](https://github.com/OpenMobileAlliance/dmso-wg/tree/main/nb-api/impl/py-server) Implementation in Python.

- `/minutes`: This directory contains markdown files with the minutes from each project meeting.

## Project Management

The project is tracked with [Github Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)

You can find the project website here:
<https://github.com/orgs/OpenMobileAlliance/projects/5>
