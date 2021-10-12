
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initialzAuthentication = () =>{
    initializeApp(firebaseConfig);
}

export default initialzAuthentication;