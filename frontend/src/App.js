import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<HomeScreen />} />
            <Route path='login' element={<LoginScreen />} />
            <Route path='register' element={<RegisterScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
