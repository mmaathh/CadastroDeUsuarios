import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'

import Logo from '../components/logo'
import Nav from '../components/nav'
import Footer from '../components/footer'
import {HashRouter} from 'react-router-dom'
import Routes from '../main/Routes'
export default props =>
<HashRouter>
<div className="app">
    <Logo />
    <Nav />
    <Routes />
    <Footer />
</div>
</HashRouter>
