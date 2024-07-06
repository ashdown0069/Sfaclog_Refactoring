// Import the functions you need from the SDKs you need
import { v4 as uuid } from 'uuid';
import { initializeApp } from 'firebase/app';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAo1-0wSf_nAYO4G8nubOtySzXm1chH0hw',
  authDomain: 'sfaclog-img-storage.firebaseapp.com',
  projectId: 'sfaclog-img-storage',
  storageBucket: 'sfaclog-img-storage.appspot.com',
  messagingSenderId: '355444136296',
  appId: '1:355444136296:web:af5a88ba54aafde6dddedd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const AvatarUploadToFirebase = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `avatars/${uuid()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const DeleteAvatarFromFireBase = (url: string) => {
  const storage = getStorage();
  const httpsReference = ref(storage, url);
  deleteObject(httpsReference)
    .then(() => {
      // File deleted successfully
      return;
    })
    .catch(() => {
      // Uh-oh, an error occurred!
      return;
    });
};

export const ImageUploadToFirebase = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${uuid()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const ThumbnailUploadToFirebase = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `thumbnails/${uuid()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
