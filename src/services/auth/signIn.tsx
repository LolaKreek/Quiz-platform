import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useEffect} from 'react';

const signIn = () => {
    const auth = getAuth();

    useEffect(() => {
        signInWithEmailAndPassword(auth, 'lalitaklimchuk@gmail.com', 'Qwertyuiop1!')
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user sign in: ", user);
                // ...
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }, [])
    
}

export default signIn;