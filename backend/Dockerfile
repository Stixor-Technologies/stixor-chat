###############################################
# Base Image
###############################################
FROM python:3.12.4 as requirements-stage

# Define build arguments (these are for the build-time context)
ARG APP_HOST
ARG APP_PORT

# Set environment variables for the build stage
ENV APP_HOST=${APP_HOST}
ENV APP_PORT=${APP_PORT}

# Set the working directory
WORKDIR /tmp

# Install Poetry
RUN pip install poetry

# Copy dependency files
COPY ./pyproject.toml ./poetry.lock* /tmp/

# Export requirements to a requirements.txt file
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

###############################################
# Application Image
###############################################
FROM python:3.12.4

# Set the working directory
WORKDIR /code

# Set PYTHONPATH to include the /code directory
ENV PYTHONPATH=/code

# Copy the requirements file and install dependencies
COPY --from=requirements-stage /tmp/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the application code
COPY ./app /code/app

# Set environment variables for runtime (These will be overridden by docker-compose)
ENV APP_HOST=${APP_HOST}
ENV APP_PORT=${APP_PORT}

# Use uvicorn to run the FastAPI application
CMD ["sh", "-c", "uvicorn app.main:app --host $APP_HOST --port $APP_PORT "]
