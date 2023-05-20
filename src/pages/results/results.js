import mainNavBar from "../../components/mainNavBar/mainNavBar.js"
import getMoviesByTheme from '../../components/moviesByTheme/moviesByTheme.js';

const URL_Search = new URLSearchParams(window.location.search)
const query = URL_Search.get('query')
const API_URL= 'https://api.themoviedb.org'
const IMAGE_URL= 'https://image.tmdb.org/t/p/w1280'
const IMAGE_URL_P= 'https://image.tmdb.org/t/p/w300'
const API_KEY= 'd1c96093b22eb879b6858f590e7686a0'
const $body = document.querySelector('body')

pageGenerator()

async function pageGenerator(){
    const multiList = await getMulti()

    setHeader()

    const dataContentList = {
        multiList: multiList,
    }

    await setMain(dataContentList)
}

function setHeader(){
    const $header = document.createElement('header')
    const $navBar = mainNavBar()

    $navBar.classList.add('no-overlap')
    $header.appendChild($navBar)
    $body.appendChild($header)
    
}
async function setMain(dataContentList){
    const $main = document.createElement('main')
    
    $body.appendChild($main)

    const multiResult = await getMoviesByTheme(dataContentList.multiList, 'Resultados Recomendados', IMAGE_URL_P)
    $main.appendChild(multiResult)
}

async function getMulti(){
    const lang= navigator.language || navigator.userLanguage
    
    const multiMovieURL= `${API_URL}/3/search/multi?api_key=${API_KEY}&language=${lang}&page=1&include_adult=false&query=${query}`
    
    const response= await fetch(multiMovieURL).then(response => response.json()).catch(error => console.error(`Unable to get featured movies data : ${error}`))
    
    const movieList= response.results
    return movieList
}