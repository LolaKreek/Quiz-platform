import { useDispatch } from 'react-redux'
import App from './App'
import { tokenLogin } from './store/Slices/auth'
import { getTheme, getUserLocalData } from './store/userLocalStorage'
import { changeTheme } from './store/Slices/theme'
import { get, ref } from '@firebase/database'
import { database } from './services/Firebase/firebase'
import { setFavorites } from './store/Slices/favorites'

export const MainEntry = () => {
  const dispatch = useDispatch()

  const user = getUserLocalData()
  const theme = getTheme()
  if (user) {
    dispatch(tokenLogin(user))
    get(ref(database, `users/${user.user.id}/favorites`)).then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(setFavorites({ value: snapshot.val() }))
      }
    })
  }
  if (theme) dispatch(changeTheme(theme))
  
  return <App />
}