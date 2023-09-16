import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import { createContext, useEffect, useState } from 'react';
import User from './interfaces/User';
import { getUserById } from './services/usersService';
import Register from './components/Register';
import MyCards from './components/MyCards';
import CreateCard from './components/CreateCard';
import Favorites from './components/Favorites';
import Sandbox from './components/Sandbox';
import About from './components/About';


const theme = {
  light: "light",
  dark: "dark",
};
export let SiteTheme = createContext(theme.light);

function App() {
  let [user, setUser] = useState<User | null>(null);
  let [loggedIn, setLoggedIn] = useState<boolean>(false);
  let [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.getItem("token") ? (
      getUserById(JSON.parse(sessionStorage.getItem("userInfo") as string)._id)
        .then((res) => setUser(JSON.parse(sessionStorage.getItem("userInfo") as string)))
        .catch((error) => console.log(error))
    ) : (setUser(null))
  }, [loggedIn]);

  return (
    <SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
      <Router>
        <ToastContainer theme={darkMode ? "dark" : "light"} />
        <div className={`App ${darkMode && "dark"}`} >
          <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/about' element={<About />} />
            <Route path='/favorites' element={<Favorites user={user} />} />
            <Route path='/my-cards' element={<MyCards />} />
            <Route path='/my-cards/create-card' element={<CreateCard userId={user?._id as string} />} />
            <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path='/register' element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path='/sandbox' element={<Sandbox />} />
            <Route path='/profile' element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={user} setCurrentUser={setUser} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </SiteTheme.Provider>
  );
}

export default App;
