
import './App.css';
import Register from './components/Register.js'
import Login from './components/Login.js'
import PageNotFound from './components/PageNotFound.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProctectedRoute from './components/ProtectedRoute.js';
import Dashboard from './components/Dashboard.js';
import FinalSideNav from './components/FinalSideNav.js';
import Settings from './components/Settings.js';
import Activity from './components/Activity.js';
import {Link} from 'react-router-dom';
import SingleProduct from './components/SingleProduct.js';
// import { Provider } from 'react-redux';
// import store from './store';
function App() {
  return (
    <>
    {/* <Provider store={store}> */}
    <BrowserRouter>
    <Routes>
      <Route path='/dashboard' element={<ProctectedRoute><Dashboard/></ProctectedRoute>}/>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/test' element={<FinalSideNav/>}/>
      <Route path='/settings' element={<ProctectedRoute><Settings/></ProctectedRoute>}/>
      <Route path='/activity' element={<ProctectedRoute><Activity/></ProctectedRoute>}/>
      <Route path='/viewproduct/:id' element={<ProctectedRoute><SingleProduct/></ProctectedRoute>}/>
      
    </Routes>
    </BrowserRouter>
    {/* </Provider> */}
    </>
  );
}

export default App;
