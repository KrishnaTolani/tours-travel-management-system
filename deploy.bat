@echo off
echo ========================================
echo Tours & Travel - Docker Deployment
echo ========================================
echo.

echo Building backend...
cd backend
call mvnw.cmd clean package -DskipTests
cd ..

echo Building frontend...
cd frontend
call npm run build
cd ..

echo Stopping existing container...
docker stop tours-app 2>nul
docker rm tours-app 2>nul

echo Starting new container...
docker run -d --name tours-app -p 8081:8081 -p 5174:5174 -v "%cd%\data:/app/data" -v "%cd%\backend\target:/app/backend" -v "%cd%\frontend\dist:/app/frontend" openjdk:17-jdk-slim bash -c "apt-get update && apt-get install -y python3 && cd /app/frontend && python3 -m http.server 5174 & cd /app/backend && java -jar *.jar"

echo.
echo ========================================
echo Deployment Complete!
echo Frontend: http://localhost:5174
echo Backend: http://localhost:8081
echo H2 Console: http://localhost:8081/h2-console
echo ========================================
echo.

echo To view logs: docker logs -f tours-app
echo To stop: docker stop tours-app && docker rm tours-app
pause