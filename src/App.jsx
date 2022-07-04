import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProtectedRoute from './layout/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import ManagePatients from './pages/ManagePatients';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

import { AuthProvider } from './context/AuthProvider'
import { PatientsProvider } from './context/PatientsProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            
            <Route path='/' element={ <AuthLayout /> }>
              <Route index element={ <Login /> } />
              <Route path='registrar' element={ <Register /> } />
              <Route path='olvide-password' element={ <ForgetPassword /> } />
              <Route path='olvide-password/:token' element={ <NewPassword /> } />
              <Route path='confirmar/:id' element={ <ConfirmAccount /> } />
            </Route>

            <Route path='/admin' element={<ProtectedRoute />}>
              <Route index element={ <ManagePatients /> } />
              <Route path='perfil' element={ <EditProfile /> } />
              <Route path='cambiar-password' element={ <ChangePassword /> } />
            </Route>

          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
