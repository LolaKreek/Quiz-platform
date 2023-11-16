import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/auth/firebase";
import Button from '@mui/material/Button';

const Login = () => {

    const handleClick = () => {
        signInWithEmailAndPassword(auth, 'bonstik5@mail.ru', 'Qwertyuiop1!')
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user sign in: ", user);
                // ...
            })
            .catch((error) => {
                console.log("Error", error.code);
                console.log("Error",error.message);
            });
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, 'ex@gmail.com', 'Qwertyuiop1!')
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user register: ", user);
                // ...
            })
            .catch((error) => {;
                console.log("Error", error.code);
                console.log("Error",error.message);
                // ..
            });
    }

    return(
        <div>
            <h1 className="login-page__main-header">Login page</h1>
            <Button onClick={handleClick}>Sing In</Button>
            <Button onClick={handleSignUp}>Sing Up</Button>
        </div>
    )
}

export default Login;