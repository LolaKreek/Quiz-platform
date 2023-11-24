import { useDispatch } from 'react-redux'
import App from './App'
import { tokenLogin } from './store/Slices/auth'
import { getUserLocalData } from './store/userLocalStorage'

export const MainEntry = () => {
  const dispatch = useDispatch()

  const user = getUserLocalData()
  if (user) dispatch(tokenLogin(user))
  
  return <App />
}