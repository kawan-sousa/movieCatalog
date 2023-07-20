import mainNavBar from "../../components/mainNavBar/mainNavBar.js"
import getMoviesByTheme from '../../components/moviesByTheme/moviesByTheme.js';
import getPeopleList from '../../components/peopleList/peopleList.js'
import getFooter from '../../components/footer/footer.js'
import footer from "../../components/footer/footer.js";

const URL_Search = new URLSearchParams(window.location.search)
const query = URL_Search.get('query')
const API_URL= 'https://api.themoviedb.org'
const IMAGE_URL= 'https://image.tmdb.org/t/p/w1280'
const IMAGE_URL_P= 'https://image.tmdb.org/t/p/w300'
const API_KEY= 'd1c96093b22eb879b6858f590e7686a0'
const $body = document.querySelector('body')
const lang= navigator.language || navigator.userLanguage

pageGenerator()

async function pageGenerator(){
    const resultingMultiList = await getTMDB_List(`${API_URL}/3/search/multi?api_key=${API_KEY}&language=${lang}&page=1&include_adult=false&query=${query}`)
    const resultingMovieList = await getTMDB_List(`${API_URL}/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=${lang}&page=1`)
    const resultingSerieList = await getTMDB_List(`${API_URL}/3/search/tv?api_key=${API_KEY}&query=${query}&include_adult=false&language=${lang}&page=1`)
    const resultingpeoplesList = await getTMDB_List(`${API_URL}/3/search/person?api_key=${API_KEY}&query=${query}&include_adult=false&language=${lang}&page=1`)
    const featuredMovies = await getTMDB_List(`${API_URL}/3/trending/movie/day?api_key=${API_KEY}&language=${lang}`)
    const featuredSeries = await getTMDB_List(`${API_URL}/3/trending/tv/week?api_key=${API_KEY}&language=${lang}`)
    const featuredPeoples = await getTMDB_List(`${API_URL}/3/trending/person/week?api_key=${API_KEY}&language=${lang}`)
    const movieRelises = await getTMDB_List(`${API_URL}/3/discover/movie?api_key=${API_KEY}&language=${lang}`)
    const seriesMostAcclaimeds = await getTMDB_List(`${API_URL}/3/tv/top_rated?api_key=${API_KEY}&include_adult=false&language=${lang}&page=1`)
    const $footer = await getFooter()

    setMediaTypeHowTV(featuredSeries)
    setMediaTypeHowTV(seriesMostAcclaimeds)
    console.log(resultingMultiList)
    

    setHeader()

    const dataContentList = {
        resultingMultiList: resultingMultiList,
        resultingMovieList: resultingMovieList,
        resultingSerieList: resultingSerieList,
        resultingpeoplesList: resultingpeoplesList,
        featuredMovies: featuredMovies,
        featuredSeries: featuredSeries,
        featuredPeoples: featuredPeoples,
        movieRelises: movieRelises,
        seriesMostAcclaimeds: seriesMostAcclaimeds,
    }

    await setMain(dataContentList)
    
    setFooter($footer)
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

    if(dataContentList.resultingMultiList.length){
        const $multiResult = await getMoviesByTheme(dataContentList.resultingMultiList, 'Resultados Recomendados', IMAGE_URL_P)
        $main.appendChild($multiResult)
    }

    if(dataContentList.resultingMovieList.length){
        const $movieResult = await getMoviesByTheme(dataContentList.resultingMovieList, 'Filmes Recomendados', IMAGE_URL_P)
        $main.appendChild($movieResult)
    }

    if(dataContentList.resultingSerieList.length){
        const $serieResults = await getMoviesByTheme(dataContentList.resultingSerieList, 'Séries Recomendadas', IMAGE_URL_P)
        $main.appendChild($serieResults)
    }


    if(dataContentList.resultingpeoplesList.length){
        const $personsResults = await getPeopleList(dataContentList.resultingpeoplesList, 'Pessoas Recomendadas', IMAGE_URL_P)
        $main.appendChild($personsResults)
    }

    if(dataContentList.featuredMovies.length){
        const $featuredMovies = await getMoviesByTheme(dataContentList.featuredMovies, 'Filmes em Alta', IMAGE_URL_P)
        $main.appendChild($featuredMovies)
    }

    if(dataContentList.featuredSeries.length){
        const $featuredMovies = await getMoviesByTheme(dataContentList.featuredSeries, 'Séries em Alta', IMAGE_URL_P)
        $main.appendChild($featuredMovies)
    }

    if(dataContentList.featuredPeoples.length){
        const $featuredPeoples = await getPeopleList(dataContentList.featuredPeoples, 'Pessoas em Alta', IMAGE_URL_P)
        $main.appendChild($featuredPeoples)
    }

    if(dataContentList.movieRelises.length){
        const $movieRelises = await getMoviesByTheme(dataContentList.movieRelises, 'Lançamento de Filmes', IMAGE_URL_P)
        $main.appendChild($movieRelises)
    }

    if(dataContentList.seriesMostAcclaimeds.length){
        const $seriesMostAcclaimeds = await getMoviesByTheme(dataContentList.seriesMostAcclaimeds, 'Séries mais aclamadas', IMAGE_URL_P)
        $main.appendChild($seriesMostAcclaimeds)
    }
}

function setFooter($footer){
    
    $body.appendChild($footer)
}

async function getTMDB_List(URL){
    const response= await fetch(URL).then(response => response.json()).catch(error => console.error(`Unable to get TMDb datas : ${error}`))
    
    const movieList= response.results
    return movieList
}

function setMediaTypeHowTV(serieList){
    serieList.media_type = "tv"
    return serieList
}