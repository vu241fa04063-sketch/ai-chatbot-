"""
Deployment script for AI Chatbot
Creates ngrok tunnels for both frontend and backend
"""
import subprocess
import time
from pyngrok import ngrok
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

def create_tunnels():
    """Create ngrok tunnels for frontend and backend"""
    try:
        # Backend tunnel (port 8000)
        logger.info("Creating backend tunnel...")
        backend_public_url = ngrok.connect(8000, "http")
        logger.info(f"✅ Backend deployed at: {backend_public_url}")
        
        # Frontend tunnel (port 5178)
        logger.info("Creating frontend tunnel...")
        frontend_public_url = ngrok.connect(5178, "http")
        logger.info(f"✅ Frontend deployed at: {frontend_public_url}")
        
        # Display deployment info
        print("\n" + "="*60)
        print("🚀 DEPLOYMENT SUCCESSFUL!")
        print("="*60)
        print(f"Frontend URL: {frontend_public_url}")
        print(f"Backend URL: {backend_public_url}")
        print(f"Backend API Docs: {backend_public_url}/docs")
        print("="*60)
        print("Tunnels are live! Press Ctrl+C to stop.\n")
        
        # Keep tunnels active
        ngrok_process = ngrok.get_ngrok_process()
        ngrok_process.proc.wait()
        
    except Exception as e:
        logger.error(f"Error creating tunnels: {e}")
        raise

if __name__ == "__main__":
    try:
        create_tunnels()
    except KeyboardInterrupt:
        logger.info("Shutting down...")
        ngrok.kill()
