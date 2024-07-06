export class API {
  public static uploadImage = async () => {
    await new Promise(r => setTimeout(r, 500));
    return '/placeholder-image.jpg';
  };
}

export default API;
// Import the functions you need from the SDKs you need
// import { v4 as uuid } from 'uuid';
// import { initializeApp } from 'firebase/app';
// import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyAo1-0wSf_nAYO4G8nubOtySzXm1chH0hw',
//   authDomain: 'sfaclog-img-storage.firebaseapp.com',
//   projectId: 'sfaclog-img-storage',
//   storageBucket: 'sfaclog-img-storage.appspot.com',
//   messagingSenderId: '355444136296',
//   appId: '1:355444136296:web:af5a88ba54aafde6dddedd',
// };

// Initialize Firebase

// Get a reference to the storage service, which is used to create references in your storage bucket

// Create a storage reference from our storage service

// const app = initializeApp(firebaseConfig);
