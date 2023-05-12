import mainNavBar from "../../components/mainNavBar/mainNavBar.js" 

const URL_Search = new URLSearchParams(window.location.search)
const URL_Query = URL_Search.get('query')
const $body = document.querySelector('body')

console.log(window.location.protocol)
pageGenerator()

function pageGenerator(){
    setHeader()
}

function setHeader(){
    const $header = document.createElement('header')
    const $navBar = mainNavBar()

    $navBar.classList.add('no-overlap')
    $header.appendChild($navBar)
    $body.appendChild($header)
    
}