# DocMgmtSystem

## Overview
DocMgmtSystem is a document management system built with TypeScript, CSS, and JavaScript. It provides a robust solution for managing and organizing documents efficiently.

## Features
- View Document and Folder
- Document and Folder upload 
- Navigate to diifferent folders (https://localhost:3000/folder/:folder_id)
- Search functionality (only frontend)

## Getting Started

### Prerequisites
- Node.js (v20.14.0)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/crashingstar/DocMgmtSystem.git
   ```

2. Navigate to project directory:
   ```sh
   cd DocMgmtSystem
   ```

### Setting up server 
1. Navigate to server folder
   ```sh
   cd server
   ```
2. Install dependencies
    ```sh
   npm install
   ```
3. Build the project
    ```sh
   npm run build
   ```
4. Serve the project
    ```sh
   npm run start
   ```
5. The client should now be running on http://localhost:3001

### Setting up frontend (use another terminal for this) 
1. Navigate to frontend folder
   ```sh
   cd frontend
   ```
2. Install dependencies
    ```sh
   npm install
   ```
3. Build the project
    ```sh
   npm run build
   ```
4. Serve the project
    ```sh
   npm run start
   ```
5. The client should now be running on http://localhost:3001


### Running the application
1. Access the frontend via http://localhost:3000
2. Access all documents http://localhost:3000/documents
3. Access document in specific folder http://localhost:3000/folder/:folder_id