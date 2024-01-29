# LwM2M Northbound API

## Server in Python

This project is an implementation of the LwM2M NB APIs using FastAPI. It provides a set of RESTful endpoints to manage devices, device observations, and device operations.

The server implements the [nbapi-v00-j.yml](https://github.com/OpenMobileAlliance/dmso-wg/blob/main/nb-api/impl/nbapi-v00-j.yml.yml).

The objective would be to keep adding functionality based on the features described in the [Northbound API Project](https://github.com/orgs/OpenMobileAlliance/projects/5/views/1).

## Running the server

- Create a virtual environment and activate it:

``` sh
python3 -m venv venv source venv/bin/activate
```

- Install the required packages:

``` sh
pip install -r requirements.txt
```

- Run the FastAPI app using uvicorn:

``` sh
uvicorn main:app --reload
```

The app will be running on `http://127.0.0.1:8000`. You can access the interactive API documentation at `http://127.0.0.1:8000/docs`.

``` sh
venv ❯ uvicorn main:app --reload
INFO:     Will watch for changes in these directories: ['/Users/ejajimn/code/OMA/dmso-wg/nb-api/impl/py-server']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [68656] using StatReload
INFO:     Started server process [68658]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:65210 - "GET /docs HTTP/1.1" 200 OK
INFO:     127.0.0.1:65210 - "GET /openapi.json HTTP/1.1" 200 OK
```