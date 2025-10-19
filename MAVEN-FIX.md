# Maven Fix - Quick Solutions

## Option 1: Install Maven (Recommended)
1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to `C:\Program Files\Apache\maven`
3. Add `C:\Program Files\Apache\maven\bin` to PATH
4. Restart command prompt
5. Run: `mvn --version`

## Option 2: Use IDE (Easiest)
1. Open `backend` folder in IntelliJ IDEA or Eclipse
2. Import as Maven project
3. Right-click on `ToursBackendApplication.java`
4. Select "Run" or "Debug"

## Option 3: Manual Java Run
```bash
cd backend
javac -cp "lib/*" src/main/java/com/tours/*.java
java -cp "src/main/resources;target/classes" com.tours.ToursBackendApplication
```

## Quick Test
Run this in PowerShell from backend directory:
```powershell
cd backend
java -version
```

If Java works, the backend will run. The application will auto-download dependencies on first run.