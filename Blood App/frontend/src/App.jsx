// import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "tailwindcss";
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Application from './Components/Application';
import Donor from './Components/Donor';
import Aboutus from './Utilities/Aboutus';
import Requestor from "./Components/Requestor";
import Donors from './Components/Donors';
import RequestApplication from './Components/RequestApplication';
import Readmore from './Utilities/Readmore';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/applicationform' element={<Application/>}/>
        <Route path='/donor' element={<Donor/>}/>
        <Route path='/requestor' element={<Requestor/>}/>
        <Route path='/aboutus' element={<Aboutus/>}/>
        <Route path='requestor/donorpage/:title' element={<Donors />} />
        <Route path='requestApplication' element={<RequestApplication />} />
        <Route path='readmore' element={<Readmore />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
