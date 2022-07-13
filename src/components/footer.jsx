import React from 'react'



function Footer() {

    const Style={
styles:{
        margin:10,
        flexWrap:"wrap",
        textAlign:"center",
        textDecoration:"none"
}

    }

  return (

   <footer className='footer' style={Style.styles}>
    <a style={Style.styles} href="/datenschutz">Datenschutz</a>
    <a style={Style.styles} href="/kontakt">Kontakt</a>
    <a style={Style.styles} href="/">Home/Startseite</a>


   </footer>
  )
}

export default Footer