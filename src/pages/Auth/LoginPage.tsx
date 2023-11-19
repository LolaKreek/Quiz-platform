import { useAppSelector, useAppDispatch } from '../../hooks/index'

const Login = () => {
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    console.log("count: ", count);
    console.log("dispatch: ", dispatch);

    return(
        <div>
            <h1 className="login-page__main-header">Login page</h1>
        </div>
    )
}

export default Login;