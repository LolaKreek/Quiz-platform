import './App.css'
import './App.css'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './store'
import Login from './pages/auth'

function App() {
  return (
    // <ThemeProvider theme={colorTheme}>
    <>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<PrivateRoute><Menu /></PrivateRoute>} /> */}
            {/* <Route path="/" element={<MainWrapper />} > */}
              {/* <Route path='/' element={<Homepage />} /> */}

              <Route path='/' element={<Login />} />
              {/* <Route path='/register' element={<RegisterPage />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              
              <Route path='/quiz' element={<Quiz />} />
              <Route path='/instruction' element={<Instruction />} />
              <Route path='/profile' element={<Profile />} />

              <Route path='/*' element={<NotFound />} /> */}
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
    // </ThemeProvider>
  )
}

export default App
