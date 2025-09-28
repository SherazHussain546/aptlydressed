import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  projectId: "studio-8361455451-62132",
  appId: "1:753869429043:web:f81ce62682e7132321c646",
  apiKey: "AIzaSyB-qUbwywflCghp_Rnx2vZEI1YQzzzT6zo",
  authDomain: "studio-8361455451-62132.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "753869429043",
};

// Initialize Firebase
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
