import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react';


//this is jsx so we have to use paranthesis
const anotherElement = (
  <a href="https://www.google.com" target="_blank">Google</a>
);

//we create element using the react
// here it has to pass the required parameters
// fisrt tag is tagname
// second is attributes as object ex. href ,target
// third if the text that we want to display
const recatElement=React.createElement(
  'a',
  {
    href:"https://www.google.com" ,target:"_blank"
  },
  'click to visit google'

)


createRoot(document.getElementById('root')).render(
    <App />
    // anotherElement   // here we are directly giving the html element and written directly as object
    // recatElement  // this is the react way of creating element
)
