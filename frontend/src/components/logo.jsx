import './logo.css'
import React from 'react'
import img  from '../assets/imgs/ja.jpg'

export default props =>
<aside className="logo">
    <a href="/" className="logo">
        <img src={img} alt="logo"/>
    </a>
</aside>