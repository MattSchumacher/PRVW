import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import M from  'materialize-css/dist/js/materialize.min.js';

import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Landing from './components/dashboard/Landing'
import Footer from './components/layout/Footer'

import AnnounceDashboard from './components/dashboard/AnnounceDashboard'
import CreateAnnounce from './components/announcements/CreateAnnounce'
import AnnounceDetails from './components/announcements/AnnounceDetails'
import MyProfile from './components/user/ProfilePage'

import NotFound from './components/dashboard/NotFound'


class App extends Component {
  componentDidMount() {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});

    
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <main>
          <Switch>
            <Route exact path='/' component={ Landing } />
            <Route path='/announcements' component={ AnnounceDashboard }/>
            <Route path='/announce/:id' component={ AnnounceDetails } />
            <Route path='/createAnnounce' component={ CreateAnnounce }/>
            <Route path='/myProfile' component={ MyProfile }/>
            <Route path='/signin' component={ SignIn }/>
            <Route path='/signup' component={ SignUp }/>
            <Route component = {NotFound} />

          </Switch>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
