import {Routes,Route} from 'react-router-dom'
import Layout from './hoc/Layout';
import Activate from './pages/auth/Activate';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';


function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Layout />} >
         <Route index element={<Home />} />

        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/activation' element={<Activate />} />
        <Route path='/auth/login' element={<Login />} />
        </Route>
    </Routes>
    </>
  );
}

export default App;
