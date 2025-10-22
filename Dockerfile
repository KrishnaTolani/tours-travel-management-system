FROM openjdk:17-jdk-slim

RUN apt-get update && apt-get install -y python3 && apt-get clean

WORKDIR /app

COPY backend/target/*.jar app.jar
COPY frontend/dist ./frontend-dist
COPY data ./data

EXPOSE 8081 5174

CMD python3 -m http.server 5174 --directory frontend-dist & java -jar app.jar