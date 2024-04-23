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
                <Route path='/' element={<Entry/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/forgot' element={<Forgot/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/explore' element={<Explore/>}></Route>
                <Route path='/mentor' element={<OneMentor/>}></Route>
                <Route path='/student' element={<OneStudent/>}></Route>
                <Route path='/myMentors' element={<MyMentors/>}></Route>
                <Route path='/myStudents' element={<MyStudents/>}></Route>
            </Routes>
          </BrowserRouter>
        <MyFooter></MyFooter>
    </div>
  );
}

export default App;
