import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNav from './Components/navbar';

import Entry from './Pages/account/entry';
import Login from './Pages/account/Login';
import Signup from './Pages/account/Signup';
import Home from './Pages/Home';
import Forgot from './Pages/account/Forgot';
import Profile from './Pages/Profile';
import Explore from './Pages/Explore';
import OneMentor from './Pages/OneMentor';
import MyFooter from './Components/footer';
import MyMentors from './Pages/MyMentors';
import MyStudents from './Pages/MyStudents';
import OneStudent from './Pages/OneStudent';

function App() {
  return (
    <div className="App">
      <MyNav></MyNav>
      <BrowserRouter>
            <Routes>
                <Route path='/conantconnect/' element={<Entry/>}></Route>
                <Route path='/conantconnect/login' element={<Login/>}></Route>
                <Route path='/conantconnect/signup' element={<Signup/>}></Route>
                <Route path='/conantconnect/forgot' element={<Forgot/>}></Route>
                <Route path='/conantconnect/profile' element={<Profile/>}></Route>
                <Route path='/conantconnect/explore' element={<Explore/>}></Route>
                <Route path='/conantconnect/mentor' element={<OneMentor/>}></Route>
                <Route path='/conantconnect/student' element={<OneStudent/>}></Route>
                <Route path='/conantconnect/home' element={<Home/>}></Route>
                <Route path='/conantconnect/myMentors' element={<MyMentors/>}></Route>
                <Route path='/conantconnect/myStudents' element={<MyStudents/>}></Route>
            </Routes>
          </BrowserRouter>
        <MyFooter></MyFooter>
    </div>
  );
}

export default App;
