import getMainNavBar from '../../components/mainNavBar/mainNavBar.js'
import getBackdrop from '../../components/backdrop/backdrop.js'

const URL_Search = new URLSearchParams(location.search)
const movieID = URL_Search.get('id')
const API_URL= 'https://api.themoviedb.org'
const IMAGE_URL= 'https://image.tmdb.org/t/p/w1280'
const IMAGE_URL_P= 'https://image.tmdb.org/t/p/w300'
const API_KEY= 'd1c96093b22eb879b6858f590e7686a0'
const $body = document.querySelector('body')
const lang= navigator.language || navigator.userLanguage

pageGenerator()

async function pageGenerator(){
    const movieDetails = await getTMDB_List(`${API_URL}/3/movie/157336?api_key=${API_KEY}&language=${lang}`)
    console.log(movieDetails)
    const dataContentList = {
        movieDetails: movieDetails,
    }

    setPageTitle(movieDetails.title)


    await setHeader(movieDetails)

    await setMain()

}

async function getTMDB_List(URL){
    const response= await fetch(URL).then(response => response.json()).catch(error => console.error(`Unable to get TMDb datas : ${error}`))
    
    const movieList= response.results || response
    return movieList
}

function setPageTitle(title){
    document.title = title
}

async function setHeader(movieDetails){
    const $header = document.createElement('header')
    const $navBar = getMainNavBar()
    const $backdrop = await getBackdrop(IMAGE_URL, movieDetails.backdrop_path)

    $header.appendChild($navBar)
    $header.appendChild($backdrop)
    $body.appendChild($header)
}

function setMain(){

}