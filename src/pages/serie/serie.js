import getMainNavBar from '../../components/mainNavBar/mainNavBar.js'
import getBackdrop from '../../components/backdrop/backdrop.js'
import getMoviesByTheme from '../../components/moviesByTheme/moviesByTheme.js'
import getSerieDatasSection from '../../components/serieDatas/serieDatas.js'
import getPeopleList from '../../components/peopleList/peopleList.js'
import getFooter from '../../components/footer/footer.js'


const URL_Search = new URLSearchParams(location.search)
const serieID = URL_Search.get('id')
const API_URL= 'https://api.themoviedb.org'
const IMAGE_URL= 'https://image.tmdb.org/t/p/w1280'
const IMAGE_URL_P= 'https://image.tmdb.org/t/p/w300'
const API_KEY= 'd1c96093b22eb879b6858f590e7686a0'
const $body = document.querySelector('body')
const lang= navigator.language || navigator.userLanguage

pageGenerator()

async function pageGenerator(){
    const serieDetails = await getTMDB_List(`${API_URL}/3/tv/${serieID}?api_key=${API_KEY}&language=${lang}`)
    const creditList = await getTMDB_List(`${API_URL}/3/tv/${serieID}/credits?api_key=${API_KEY}&language=${lang}`)
    const featuredMovies = await getTMDB_List(`${API_URL}/3/trending/movie/day?api_key=${API_KEY}&language=${lang}`)
    const featuredSeries = await getTMDB_List(`${API_URL}/3/trending/tv/week?api_key=${API_KEY}&language=${lang}`)
    const featuredPeoples = await getTMDB_List(`${API_URL}/3/trending/person/week?api_key=${API_KEY}&language=${lang}`)
    const movieRelises = await getTMDB_List(`${API_URL}/3/discover/movie?api_key=${API_KEY}&language=${lang}`)
    const seriesMostAcclaimeds = await getTMDB_List(`${API_URL}/3/tv/top_rated?api_key=${API_KEY}&include_adult=false&language=${lang}&page=1`)

    const dataContentList = {
        serieDetails: serieDetails,
        creditList: creditList,
        featuredMovies: featuredMovies,
        featuredSeries: featuredSeries,
        featuredPeoples: featuredPeoples,
        movieRelises: movieRelises,
        seriesMostAcclaimeds: seriesMostAcclaimeds,
    }

    setPageTitle(serieDetails.title)


    await setHeader(serieDetails)
    await setMain(dataContentList)
    await setFooter()
}

async function getTMDB_List(URL){
    console.log(URL)
    const response= await fetch(URL).then(response => response.json()).catch(error => console.error(`Unable to get TMDb datas : ${error}`))
    
    const serieList= response.results || response
    return serieList
}

function setPageTitle(title){
    document.title = title
}

async function setHeader(serieDetails){
    const $header = document.createElement('header')
    const $navBar = getMainNavBar()
    const $backdrop = await getBackdrop(IMAGE_URL, serieDetails.backdrop_path)

    $header.appendChild($navBar)
    $header.appendChild($backdrop)
    $body.appendChild($header)
}

async function setMain(dataContentList){
    const $serieDatas = await getSerieDatasSection(dataContentList.serieDetails, dataContentList.creditList)
    const $main = document.createElement('main')

    $main.classList.add('main')
    $body.appendChild($main)

    $main.appendChild($serieDatas)
    

    // if(dataContentList.featuredMovies.length){
    //     const $featuredMovies = await getMoviesByTheme(dataContentList.featuredMovies, 'Filmes em Alta', IMAGE_URL_P)
    //     $main.appendChild($featuredMovies)
    // }

    // if(dataContentList.featuredSeries.length){
    //     const $featuredMovies = await getMoviesByTheme(dataContentList.featuredSeries, 'Séries em Alta', IMAGE_URL_P)
    //     $main.appendChild($featuredMovies)
    // }

    // if(dataContentList.featuredPeoples.length){
    //     const $featuredPeoples = await getPeopleList(dataContentList.featuredPeoples, 'Pessoas em Alta', IMAGE_URL_P)
    //     $main.appendChild($featuredPeoples)
    // }

    // if(dataContentList.movieRelises.length){
    //     const $movieRelises = await getMoviesByTheme(dataContentList.movieRelises, 'Lançamento de Filmes', IMAGE_URL_P)
    //     $main.appendChild($movieRelises)
    // }

    // if(dataContentList.seriesMostAcclaimeds.length){
    //     const $seriesMostAcclaimeds = await getMoviesByTheme(dataContentList.seriesMostAcclaimeds, 'Séries mais aclamadas', IMAGE_URL_P)
    //     $main.appendChild($seriesMostAcclaimeds)
    // }
}

function setFooter(){
    const $footer = getFooter()
    $body.appendChild($footer)
}