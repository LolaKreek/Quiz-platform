import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

createUserWithEmailAndPassword(auth, 'ex@gmail.com', '123')
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("user register: ", user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });