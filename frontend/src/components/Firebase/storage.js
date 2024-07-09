import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCJXAyiEsd0AyahfXqsadoTeQ92Q9TXQ4",
  authDomain: "connectrip-10205.firebaseapp.com",
  projectId: "connectrip-10205",
  storageBucket: "connectrip-10205.appspot.com",
  messagingSenderId: "1016703489561",
  appId: "1:1016703489561:web:a9cd9edb68aadeefcbfc88",
  measurementId: "G-RNXPEDMTGF"
};

// Inicialize o Firebase com sua configuração
export const app = initializeApp(firebaseConfig);

// Obtenha a referência para o armazenamento
export const storage = getStorage(app);

