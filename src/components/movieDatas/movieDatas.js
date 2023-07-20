export default async (detailsList, creditsList)=>{    
    const $movieDetails = document.createElement('section')
    const IMAGE_URL_P= 'https://image.tmdb.org/t/p/w300'
    const API_IMAGE_W45 = 'https://image.tmdb.org/t/p/w45'
    const releaseDate = new Date(detailsList.release_date)

    const getPeopleByJob = (peopleList, job)=>{ //return the first people with the job passed as argument
            return peopleList.find((people)=>{
                
                return people.job == job ? true : false
        });
    }
    const genreNames = await getGenres(detailsList.id)
    const companieNameList = detailsList.production_companies.map((companie)=>{
        return companie.name
    })

    const toCurrency = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    })
    
    creditsList.crew.getPeopleByJob

    $movieDetails.classList.add('movie-details')
    
    $movieDetails.innerHTML = `
        <picture class="movie-poster">
            <img src="${IMAGE_URL_P}${detailsList.poster_path}" alt="$" srcset="" class="movie-poster-image">
        </picture>

        <div class="title-area">
            <h1 class="title">${detailsList.title} <span class="release-date">${releaseDate.getFullYear()}</span></h1>
        </div>
        ${detailsList.tagline ? `<div class="tagline"><p class="tagline-text">${detailsList.tagline}</p></div>` : ''}

        <div class="voting-data">
            <span class="stars-wppr">
                ${getStarItens(detailsList.vote_average)}
            </span>
            <span class="result vote-average">
                <span class="name">vote average: </span>
                <span class="value">${detailsList.vote_average || '--'}</span>
            </span>
            <span class="result vote-count">
                <span class="name">vote count: </span>
                <span class="value">${detailsList.vote_count || '--'}</span>
            </span>
            <span class="data-base-icon">
                <img src="../../images/icons/TMDb.svg" alt="TMDb icon">
            </span>
        </div>

        <div class="details">
            <h4 class="title">Detalhes</h4>
            <ul class="details-list">
                <li class="director"><strong class="identifier">Diretor:</strong><span class="information">${getPeopleByJob(creditsList.crew, "Director").name}</span></li>
                <li class="original"><strong class="identifier-lang">Linguagem original:</strong><span class="information">${detailsList.original_language}</span></li>
                <li class="genres"><strong class="identifier">Generos:</strong><span class="information">${setGenres()}
                ${genreNames.length > 3 ? getVerticalList(genreNames) : ''}</span></li>
                <li class="runtime"><strong class="identifier">Duração:</strong><span class="information">${detailsList.runtime}min</span></li>
                <li class="release-date"><strong class="identifier">Data de lançamento:</strong><span class="information">${new Date(detailsList.release_date).toLocaleDateString(navigator.language || navigator.userLanguage, {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}</span></li>
                <li class="producers"><strong class="identifier">Produtoras:</strong><span class="information">${setProductionCompanies()}
                ${companieNameList.length > 1 ? getVerticalList(companieNameList) : ''}
                </span></li>
                <li class="budget"><strong class="identifier">Orçamento:</strong><span class="information">${detailsList.budget <= 0 ? 'não calculado' : toCurrency.format(detailsList.budget)}</span></li>
                <li class="revenue"><strong class="identifier">Receita:</strong><span class="information">${detailsList.revenue <= 0 ? 'não calculado' : toCurrency.format(detailsList.revenue)}</span></li>
                </ul>
        </div>

        <div class="cast-stage">
            <h4 class="title">Cast</h4>
            ${getPeopleListHTML()}
        </div>

        <div class="overview">
            <h4 class="title">Sinopse</h4>
            <p class="text">${detailsList.overview}</p>
        </div>
        `
        setBalonControllerRole()
        setMoreButtonRole()


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

        function setGenres(){
            if(!genreNames) return 'generos não encontrados'

            let genreList = ''

            if(genreNames.length <= 3) genreList = genreNames.join(', ')
            else{
                const cutGenreNames = genreNames.filter((genre, index)=>{
                    return index < 3
                })

                genreList = cutGenreNames.join(', ')
            }

            return genreList
        }

        function getVerticalList(ListItems){
            const buttonHTML = getButton()
            const vertivalList = '<ul class="vertical-list" name="vertical-list">'+`${ListItems.map((name)=>{
                return `<li class="vertical-list-item">${name}</li>`
            }).join('')}`+'</ul>'


            return buttonHTML + vertivalList
        }

        function getButton(){
            return '<button class="ballon-controller" name="ballon-controller"><i class="fa-solid fa-angle-down"></i></button>'
        }

        function setProductionCompanies(){
            const companiesList = detailsList.production_companies
            if(!companiesList) return 'empresas não encontradas'

            const companiesListText = companiesList[0].name

            return companiesListText
        }

        function getPeopleListHTML(){
            let castList = creditsList.cast.map((actor)=>{
                return `<li class="actor">
                            <div class="avatar"><picture class="image-wppr"><img class="image" src="${API_IMAGE_W45 + actor.profile_path}" alt="imagem de perfil" onerror="this.src='../../images/icons/default-avatar.svg'"></picture></div>
                            <span class="name">${actor.name}</span>
                        </li>`
            }).join('')

            castList = `
            <ul class="cast-list" name="cast-list">
                ${castList}
                <li class="more-btn-wppr">
                    <button class="more-btn">
                        <div class="avatar"><picture class="icon-wppr"><img class="icon" src="../../images/icons/angle-to-down.svg" alt="angle to bottom" onerror="this.src='../../images/icons/default-avatar.svg'"></picture></div>
                        <span class="message">Ver todo o elenco</span>
                    </button>
                </li>
            </ul>`

            return castList
        }

        function getStarItens(voteAverage0to10){
            const voteAverage0to5 = Math.round((voteAverage0to10 / 2) * 10) / 10

            const totalFullStars = Math.floor(voteAverage0to5)
            const hasHalfStar = Math.round(voteAverage0to5 - Math.floor(voteAverage0to5)) == 1
            const totalEmptyStars = 5 - Math.round(voteAverage0to5)
            const starsItemsHTML = getStarsItemsHTML(totalFullStars, totalEmptyStars, hasHalfStar)

            return starsItemsHTML

        }

        function getStarsItemsHTML(totalFullStars, totalEmptyStars, hasHalfStar){
            const HTMLFulStar = '<i class="fa-solid fa-star"></i>'
            const HTMLHalfStar = '<i class="fa-solid fa-star-half"></i>'
            const HTMLEmptyStar = '<i class="fa-solid fa-star star-empty"></i>'
            let HTMLContent = ''

            for(let i = 1; i <= totalFullStars; i++) HTMLContent += HTMLFulStar + '\n'
            if(hasHalfStar) HTMLContent += HTMLHalfStar + '\n'
            for(let i = 1; i <= totalEmptyStars; i++) HTMLContent += HTMLEmptyStar + '\n'
            
            return HTMLContent
        }

        
        function setBalonControllerRole(){
            const ballonControllerList = $movieDetails.querySelectorAll('.ballon-controller')
            
            ballonControllerList.forEach(($controller)=>{
                const $verticalList = $controller.closest('.information').querySelector('.vertical-list')

                $controller.addEventListener('click', onBallonControllerClick)
                addOnClickOutsideBallon($verticalList, removeClass, 'show')
            })
        }

        function onBallonControllerClick(e){
            const $verticalList = e.target.closest('.information').querySelector('.vertical-list')
            
            $verticalList.classList.add('show')
        }
        
        function addOnClickOutsideBallon(element, callback, className){
            const elementName = element.getAttribute('name')
            const $ballonController = element.closest('.information').querySelector('.ballon-controller')
            const ballonControllerName = $ballonController.getAttribute('name')
            
            window.addEventListener('click', (e)=>{
                if(e.target !== element && !e.target.closest(`.${elementName}`) && e.target !== $ballonController && !e.target.closest(`.${ballonControllerName}`) && element.classList.contains('show'))callback(element, className)
            })
            
        }
        
        function removeClass(element, className){
            element.classList.remove(className)
        }

        function setMoreButtonRole(){
            const $moreButton = $movieDetails.querySelector('.cast-stage .cast-list .more-btn')
            const $castList = $moreButton.closest('.cast-list')
            
            $moreButton.addEventListener('click', onClickMoreButton)
            addOnClickOutsideCastList($castList, removeClass, 'show-all') // cast-list
        }

        function addOnClickOutsideCastList(element, callback, className){
            const elementName = element.getAttribute('name')

            window.addEventListener('click', (e)=>{
                const $title = document.querySelector('.movie-details .cast-stage .title')

                if(e.target !== element && !e.target.closest(`.${elementName}`) && element.classList.contains('show-all')){
                    callback(element, className)
                    $title.classList.remove('hidden')
                }
            })
            
        }

        function onClickMoreButton(e){
            const {target} = e
            const $castList = target.closest('.cast-list')
            const $title = $castList.parentElement.querySelector('.title')

            $castList.classList.add('show-all')
            $title.classList.add('hidden')
        }

    return $movieDetails
}