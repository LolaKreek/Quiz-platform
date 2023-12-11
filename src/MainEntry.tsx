import { useDispatch } from 'react-redux'
import App from './App'
import { tokenLogin } from './store/Slices/auth'
import { getTheme, getUserLocalData } from './store/userLocalStorage'
import { changeTheme } from './store/Slices/theme'

export const MainEntry = () => {
  const dispatch = useDispatch()

  const user = getUserLocalData()
  const theme = getTheme()
  if (user) dispatch(tokenLogin(user))
  if (theme) dispatch(changeTheme(theme))
  
  return <App />
}