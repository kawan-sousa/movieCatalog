export default async (movieList, theme, IMAGE_URL_P)=>{
    const $moviesByTheme = document.createElement('section')
    const newMovieList = [...movieList]
    
    $moviesByTheme.classList.add('movies-by-theme')
    newMovieList.length = 20


    newMovieList.sort((next, current)=>{ // sort the list of movies in ascending order according to the year of release
        const currentMovieReleaseDate = new Date(current.release_date).getFullYear()
        const nextMovieReleaseDate = new Date(next.release_date).getFullYear()

        return currentMovieReleaseDate - nextMovieReleaseDate
    })
    
    $moviesByTheme.innerHTML= `
    <h3 class="theme">${theme}</h3>
    
    <div class="rail-wppr">
        <div class="controller">
            <button class="backwards">
                <img src="https://moviecatalog.kawandev.online/src/images/icons/arrowRight.svg" alt="">
            </button>
            <button class="forwards">
                <img src="https://moviecatalog.kawandev.online/src/images/icons/arrowRight.svg" alt="">
            </button>
        </div>
        <div class="rail">
            <ul class="movie-list">
                ${
                    await Promise.all(newMovieList.map(async movie =>{
                        const { poster_path, release_date, title, vote_average, id} = movie

                        const genreNames = await getGenres(id)

                        const HTMLContent = `
                        <li class="movie">
                        <a href="${location.origin}/src/pages/${movieList?.media_type == "tv" ||  movie?.media_type == "tv" ? "serie/serie.html" : "movie/movie.html"}?id=${id}" class="movie-link">
                            <picture class="cover-wppr">
                                        <img src="${IMAGE_URL_P+poster_path}" alt="" srcset="" class="cover">
                            </picture>
                        </a>

                        <span class="movie-datas">
                                <div class="release-date">${release_date || movie.first_air_date}</div>
                    
                                <h4 class="movie-title">${title || movie.name}</h4>
            
                                <div class="reviews">
                                    <div class="IMDb-review">
                                        <i class="IMDb-icon">
                                            <img src="https://moviecatalog.kawandev.online/./src/images/icons/TMDb.svg" alt="TMDb logo"></i>
                                        <span class="IMDb-result"><span class="real-result">${vote_average}</span> / 100</span>
                                    </div>
                                </div>
                                
                                <span class="generes">${genreNames?.join(', ') || ''
                                }</span>
                        </span>
                            </li>`
                        
                        return HTMLContent
                    })).then(newMovieList => newMovieList.join(''))
                }
            </ul>
        </div>
    </div>`

    setMovieLstInteractivity()

    async function getGenres(movieID){
        const URL_DETAILS = "https://api.themoviedb.org/3/movie"
        const API_KEY= 'd1c96093b22eb879b6858f590e7686a0'
        const userLanguage = navigator.language || navigator.userLanguage

        const details = await fetch(`${URL_DETAILS}/${movieID}?api_key=${API_KEY}&language=${userLanguage}`)
            .then(response => {
                if (response.status == 404) throw new Error('404 (not found)')
                return response.json()
            }).catch(error => 
                    console.error(`it was not possible to obtain the details of the film in question, in the list:${error}`))

        const genres = details?.genres?.map(genre => genre.name) || undefined
        return genres
    }
    
    function setMovieLstInteractivity(){
        const controlBtnLst = $moviesByTheme.querySelectorAll('.controller button')
        const railWppr = controlBtnLst[0].closest('.rail-wppr')
        const rail = railWppr.querySelector('.rail')
        const movieList = rail.querySelector('.movie-list')
        let currentMarginLeft = 0;
        
        controlBtnLst.forEach(button => {
            
            button.addEventListener('click', (e)=> {

                const movieListW = movieList.offsetWidth
                const columnGapPercentage = Number(window.getComputedStyle(movieList).getPropertyValue('column-gap').replace('%', ''))
                const columnGap = (movieListW / 100) * columnGapPercentage
                const marginError = 10
                const movieW = movieList.querySelector('.movie').offsetWidth

                if(button.classList.contains('forwards')){
                    const scrollRight = rail.scrollWidth - rail.clientWidth;
                    let newMarginLft = currentMarginLeft - movieListW - columnGap

                    if(scrollRight <= movieW * 3 + columnGap * 3 + marginError && scrollRight >= movieW * 3 + columnGap * 3 - marginError){
                        newMarginLft = currentMarginLeft - scrollRight
                    }
                    else if(scrollRight <= movieW * 2 + columnGap * 2 + marginError && scrollRight >= movieW * 2 + columnGap * 2 - marginError){
                        newMarginLft = currentMarginLeft - scrollRight
                    }
                    else if(scrollRight <= movieW + columnGap + marginError && scrollRight >= movieW + columnGap - marginError){
                        newMarginLft = currentMarginLeft - scrollRight
                    }
                    else if(scrollRight < rail.offsetWidth){
                        newMarginLft = 0
                    }

                    movieList.style.marginLeft = `${newMarginLft}px`
                    currentMarginLeft = newMarginLft
                }
                else if(button.classList.contains('backwards')){
                    const scrollLeft = -1 * currentMarginLeft
                    let newMarginLft = currentMarginLeft + movieListW + columnGap


                    if(scrollLeft >= movieW + columnGap - marginError && scrollLeft <= movieW + columnGap + marginError)newMarginLft = 0
                    else if(scrollLeft >= movieW * 2 + columnGap * 2 - marginError && scrollLeft <= movieW * 2 + columnGap * 2 + marginError)newMarginLft = 0
                    else if(scrollLeft >= movieW * 3 + columnGap * 3 - marginError && scrollLeft <= movieW * 3 + columnGap * 3 + marginError)newMarginLft = 0
                    else if(newMarginLft >= marginError) newMarginLft = -(movieList.scrollWidth - movieList.offsetWidth)
                    
                    
                    movieList.style.marginLeft = `${newMarginLft}px`
                    currentMarginLeft = newMarginLft
                }
            })


        })
        window.addEventListener('resize', e=>{
            movieList.style.marginLeft = `0px`
            currentMarginLeft = 0
        })

        const movieImages = $moviesByTheme.querySelectorAll('.movie .cover-wppr img')

        movieImages.forEach((img)=>{
            img.onerror = ()=>{
                const movie = img.closest('.movie')
                
                movie.remove()
            }
        })
    }
    
    return $moviesByTheme
}