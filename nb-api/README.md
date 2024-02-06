# Northbound API for LwM2M

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

Changes to the official API should be submitted against [`api.yml`](https://github.com/OpenMobileAlliance/dmso-wg/blob/main/nb-api/api/api.yml), feel free to add more details to the design document at [api.md](https://github.com/OpenMobileAlliance/dmso-wg/blob/c7296330c4240d8b48a8f9d963abfe0070707afb/nb-api/api/api.md).

- `/arch`: This directory contains archived items, including presentations and proposals.

- `/docs`: This where documentation and work in progress items are stored.

- `/impl`: This directory stands for "implementations" and contains code related to the client or server implementations of the Northbound API. Please upload yours on a subfolder in the path. Below you have links to the existing ones:

  - [go-server](https://github.com/OpenMobileAlliance/dmso-wg/tree/main/nb-api/impl/go-server) Simple implementation in Go.

  - [python-server](https://github.com/OpenMobileAlliance/dmso-wg/tree/main/nb-api/impl/py-server) Implementation in Python. A more complete one.

- `/minutes`: This directory contains markdown files with the minutes from each project meeting.

## Project Management

The project is tracked with [Github Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)

You can find the project website here:
<https://github.com/orgs/OpenMobileAlliance/projects/5>
