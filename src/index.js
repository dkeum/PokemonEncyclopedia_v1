import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHVuasjItyIwVi31bmw8TssJLRHTMOk1Y",
  authDomain: "pokemonencyclopedia-7e025.firebaseapp.com",
  projectId: "pokemonencyclopedia-7e025",
  storageBucket: "pokemonencyclopedia-7e025.appspot.com",
  messagingSenderId: "1042650101445",
  appId: "1:1042650101445:web:0209c2bb4abe995b36e2ac",
  measurementId: "G-5E731KRSRW"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
