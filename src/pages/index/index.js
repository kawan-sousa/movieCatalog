import mainNavBar from '../../components/mainNavBar/mainNavBar.js';
import header, { setHeaderInteractivity } from '../../components/header/header.js';
import getMoviesByTheme from '../../components/moviesByTheme/moviesByTheme.js';
import getPeopleList from '../../components/peopleList/peopleList.js';
import getFooter from '../../components/footer/footer.js';

const $body = document.querySelector('body');

const API_URL= 'https://api.themoviedb.org'
const IMAGE_URL= 'https://image.tmdb.org/t/p/w1280'
const IMAGE_URL_P= 'https://image.tmdb.org/t/p/w300'
const API_KEY= 'd1c96093b22eb879b6858f590e7686a0'


pageGenerator()

// creates the HTML content of the page
async function pageGenerator(){
    const releaseList= await getReleases()
    const featuredList= await getFeatureds()
    const featuredActorsList= await getFeaturedActors()
    const footer = await getFooter()

    await setHeader(featuredList)
    const dataContentList = {
        releaseList: releaseList,
        featuredList: featuredList,
        featuredActorsList: featuredActorsList,
    }
    
    await setMain(dataContentList)

    setFooter(footer)
}

$body.appendChild(mainNavBar())

async function setHeader(movieList){
    
    
    const { title, vote_average, overview, backdrop_path} = movieList[0]
    
    if(!movieList.length) return
    
    await $body.appendChild(header(IMAGE_URL+backdrop_path, title, vote_average, overview))
    
    setHeaderInteractivity(movieList)
}

async function setMain(dataContentList){
    const main = document.createElement('main')
    
    $body.appendChild(main)

    const featuredMovies = await getMoviesByTheme(dataContentList.featuredList, 'Filmes em alta', IMAGE_URL_P)
    main.appendChild(featuredMovies)
    
    const releaseMovies = await getMoviesByTheme(dataContentList.releaseList, 'Lançamento de filmes', IMAGE_URL_P)
    main.appendChild(releaseMovies)

    const featuredActors = await getPeopleList(dataContentList.featuredActorsList, 'Atores em alta', IMAGE_URL_P)
    main.appendChild(featuredActors)
}

function setFooter(footer){
    $body.appendChild(footer)
}


async function getReleases(){
    const lang= navigator.language || navigator.userLanguage
    
    const releaseMovieURL= `${API_URL}/3/discover/movie?api_key=${API_KEY}&language=${lang}`
    
    const response= await fetch(releaseMovieURL).then(response => response.json()).catch(error => console.error(`Unable to get featured movies adata : ${error}`))
    
    const movieList= response.results
    return movieList
}

async function getFeatureds(){
    const lang= navigator.language || navigator.userLanguage
    
    const featuredMovieURL= `${API_URL}/3/trending/movie/day?api_key=${API_KEY}&language=${lang}`
    
    const response= await fetch(featuredMovieURL).then(response => response.json()).catch(error => console.error(`Unable to get featured movies adata : ${error}`))
    
    const movieList= response.results
    return movieList
}

async function getFeaturedActors(){
    const lang= navigator.language || navigator.userLanguage
    
    const featuredActorURL= `${API_URL}/3/person/popular?api_key=${API_KEY}&language=${lang}`
    
    const response= await fetch(featuredActorURL).then(response => response.json()).catch(error => console.error(`Unable to get featured movies adata : ${error}`))
    
    const actorsList= response.results
    return actorsList
}