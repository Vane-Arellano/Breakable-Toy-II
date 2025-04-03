# Flight Search App 

> This application help you find flight itineraries based on origin, departure, departure date and optionally return date, number of adults and currenct (USD, MXN or EUR). You can also sort the results by duration and price 

## How to run the project? 
> This project can be run through Docker but may throw SSL issues if working with a Zero Trust Network Access as Zscaler 

### Prerequisites
Make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

### 1. Navigate to the project directory
Open a terminal and go to the directory where the `docker-compose.yml` file is located:

```sh
cd /path/to/your/Breakable-Toy-II-clone
```

### 2. Start the services
Run the following command to start the containers:

```sh
docker-compose up
```

To run in detached mode (in the background), use:

```sh
docker-compose up -d
```

### 3. Stop the services
To stop and remove the containers, networks, and volumes:

```sh
docker-compose down
```

### 4. Restart the services
If you need to restart all services:

```sh
docker-compose restart
```

### 5. Check running containers
To see a list of running containers:

```sh
docker ps
```

### 6. View logs
To check logs from your services in real time:

```sh
docker-compose logs -f
```

### 7. Rebuild the images (if needed)
If you have made changes to your `Dockerfile` or dependencies, you can rebuild the images with:

```sh
docker-compose up --build
```

## If you do have a Zscaler 
> You can run the projects separately and for that, do the following
### 1. Navigate to the project frontend
Open a terminal and go to the root of flight-search-frontend directory 

```sh
cd /path/to/your/Breakable-Toy-II-clone/flight-search-frontend directory 
```

### 2. Run development mode

```sh
bun run dev 
```
### 3. Or build with 

```sh
bun run build 
```

### 4. Navigate to the project backend 
Open a terminal and go to the root of flight-search-backend directory 

```sh
cd /path/to/your/Breakable-Toy-II-clone/flight-search-backend directory 
```
### 6. Build the backend application with 
```sh
./gradlew build
```


### 6. Run the backend application with 
```sh
java -jar build/libs/flight-search-backend-0.0.1-SNAPSHOT.jar
```


---
