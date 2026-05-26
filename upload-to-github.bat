@echo off
REM Create a ZIP file of the project for uploading to GitHub

cd /d "c:\Users\gopit\OneDrive\Pictures\Desktop\user"

REM Remove node_modules to reduce size
if exist frontend\node_modules rmdir /s /q frontend\node_modules

REM Create zip using PowerShell
powershell -Command "Compress-Archive -Path @('backend', 'frontend', 'scripts', 'deploy.py', 'package.json', '.gitignore', 'DEPLOYMENT.md', 'GITHUB_SETUP.md', 'QUICK_START.md') -DestinationPath ai-chatbot.zip -Force"

echo.
echo Created: ai-chatbot.zip
echo.
echo Next steps:
echo 1. Go to: https://github.com/vu241fa04063-sketch/ai-chatbot/upload/main
echo 2. Drag and drop ai-chatbot.zip
echo 3. Commit the files
echo 4. Your code is now on GitHub!
echo.
pause
