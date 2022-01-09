# Dollop Music

Dollop Music is a website made for sharing music and connecting with other artists.
Signing up with Dollop comes with many benefits like:
- Sharing music with all users on the platform
- Customise your profile and express yourself to connect with other artists.
- Listening to works by other artist for more inspiration
- Following other artists to keep up with their work
- Gain followers and build your own fanbase of listeners

## Installation and Usage

The repository contains two separate node projects, one for frontend and the other for backend. Both these projects must be installed separately.

The frontend and backend must be run parallely to achieve suitable results.

### Prerequisites
- Node.js: version 14+

### For Frontend:
- Open Command Prompt/Terminal
- Navigate to the repository folder using `cd` command
- Enter command
```
cd frontend
```
- Enter command 
```
yarn
```
- Run the frontend using command
```
yarn dev
```

### For Backend:
#### Configuration file
For privacy reasons, the config file is not included in the repo. You can make your own at `backend/functions/config.js` and give it the following structure:
```js
exports.MONGO_DB_URI = "";

exports.firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  storageBucket: "",
};
```
You will get the Firebase config from the Firebase settings => Web app. You will need to enable Storage in Firebase.

You will get the MongoDB URI string from MongoDB Atlas. 
#### Running
- Open Command Prompt/Terminal in another window
- Enter command
```
npm install -g firebase-tools
```
- Navigate to the repository folder using `cd` command
- Enter command
```
cd backend
```
- Enter command 
```
yarn
```
- Run the backend using command
```
firebase emulators:start --only functions
```

## Requirements
User Requirements: Works on any computer that support a modern browser.  
Firebase Account   
MongoDB Atlas Account  

## Screenshots
Dashboard
![image](https://user-images.githubusercontent.com/60062557/147338771-43f0feed-0a92-4702-bfa3-72eb4eebc997.png)

Login or Register
![image](https://user-images.githubusercontent.com/60062557/147338583-e0699c20-5fac-48a5-9c3d-a587633bdf89.png)

Profile
![image](https://user-images.githubusercontent.com/60062557/147339005-8ceafde8-eb34-49f9-8295-754e297913c3.png)

Edit Profile
![image](https://user-images.githubusercontent.com/60062557/147338695-d3fe2eb1-4154-41d1-a2bc-d60b62acb056.png)
![image](https://user-images.githubusercontent.com/60062557/147338705-e74bccac-47a2-480f-a677-f256fb20ccb4.png)

Search
![image](https://user-images.githubusercontent.com/60062557/147338796-ae8bec23-6483-422b-81e4-646e19697748.png)
![image](https://user-images.githubusercontent.com/60062557/147338826-15e4c52f-0803-411f-9bbd-206d112c797d.png)

## Contributors Info
- [Mugdha Kurkure](https://github.com/diamondgelato)
- [Neelansh Mathur](https://github.com/neelansh15)
- [Vedant Mahadik](https://github.com/VedantMahadik)
