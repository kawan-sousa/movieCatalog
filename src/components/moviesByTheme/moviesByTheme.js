export default async (movieList, theme, IMAGE_URL_P)=>{
    const $moviesByTheme = document.createElement('section')
    const newMovieList = [...movieList]
    
    $moviesByTheme.classList.add('movies-by-theme')
    newMovieList.length = 20

    $moviesByTheme.innerHTML= `
    <h3 class="theme">${theme}</h3>
    
    
    <div class="rail">
        <ul class="movie-list">
            <div class="controller">
                <button class="backwards">
                    <img src="src/images/icons/arrowRight.svg" alt="">
                </button>
                <button class="forwards">
                    <img src="src/images/icons/arrowRight.svg" alt="">
                </button>
            </div>
            ${
                await Promise.all(newMovieList.map(async movie =>{
                    const { poster_path, release_date, title, vote_average, id} = movie

                    const genreNames = await getGenres(id)

                    const HTMLContent = `
                    <a href="#" class="movie-link">
                        <li class="movie">
                        <picture class="cover-wppr">
                                <img src="${IMAGE_URL_P+poster_path}" alt="" srcset="" class="cover">
                            </picture>
                
                            <div class="release-date">${release_date}</div>
                
                            <h4 class="movie-title">${title}</h4>
        
                            <div class="reviews">
                                <div class="IMDb-review">
                                    <i class="IMDb-icon"><img src="./src/images/icons/TMDb.svg" alt="TMDb logo"></i>
                                    <span class="IMDb-result"><span class="real-result">${vote_average}</span> / 100</span>
                                </div>
                            </div>
                            
                            <span class="generes">${genreNames.join(', ')
                            }</span>
                        </li>
                    </a>`
                    
                    return HTMLContent
                })).then(newMovieList => newMovieList.join(''))
            }
        </ul>
    </div>`

    setMovieLstInteractivity()

    async function getGenres(movieID){
        const URL_DETAILS = "https://api.themoviedb.org/3/movie"
        const API_KEY= 'd1c96093b22eb879b6858f590e7686a0'

        const details = await fetch(`${URL_DETAILS}/${movieID}?api_key=${API_KEY}&language=en-US`).then(response => response.json()).catch(error => console.error('it was not possible to obtain the details of the film in question, in the list:'+error))
        
        const genres = details.genres.map(genre => genre.name)
        return genres
    }
    
    function setMovieLstInteractivity(){
        const controlBtnLst = $moviesByTheme.querySelectorAll('.controller button')
        let currentMarginLeft = 0;
        
        controlBtnLst.forEach(button => {
            
            button.addEventListener('click', (e)=> {
                const rail = button.closest('.rail')
                const movieList = rail.querySelector('.movie-list')
                const movieListW = movieList.offsetWidth
                const columnGapPercentage = Number(window.getComputedStyle(movieList).getPropertyValue('column-gap').replace('%', ''))
                const columnGap = (movieListW / 100) * columnGapPercentage

                if(button.classList.contains('forwards')){
                    let newMarginLft = currentMarginLeft - movieListW - columnGap
                    const scrollRight = rail.scrollWidth - rail.clientWidth;

                    if(scrollRight < rail.offsetWidth) newMarginLft = 0

                    movieList.style.marginLeft = `${newMarginLft}px`
                    currentMarginLeft = newMarginLft
                }
                else if(button.classList.contains('backwards')){
                    let newMarginLft = currentMarginLeft + movieListW + columnGap

                    if(newMarginLft >= 0) newMarginLft = -(movieList.scrollWidth - movieListW)

                    movieList.style.marginLeft = `${newMarginLft}px`
                    currentMarginLeft = newMarginLft
                }
            })
        })
    }
    
    return $moviesByTheme
}