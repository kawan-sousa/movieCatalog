export default (movieList, IMAGE_URL)=>{
    const $header = document.createElement('header')
    const { title, vote_average, overview, backdrop_path, id} = movieList

    $header.classList.add('main-header')

    $header.innerHTML += `
        <div class="carousel-banner">
            <picture class="banner-image-wppr">
                <img src="${IMAGE_URL+backdrop_path}" alt="${title}" srcset="" class="banner-image">
            </picture>

            <div class="text-about">
                <h2 class="title">${title}</h2>

                <div class="reviews">
                    <div class="IMDb-review">
                        <i class="IMDb-icon"><img src="./src/images/icons/TMDb.svg" alt="TMDb logo"></i>
                        <span class="IMDb-result"><span class="real-result">${vote_average}</span> / 100</span>
                    </div>
                </div>

                <div class="synopsis-container">
                    <p class="synopsis-text">
                        ${overview}
                    </p>
                </div>

                <a href="https://${window.location.host}/movie?id=${id}" class="trailer-btn">
                    <i class="fa-solid fa-circle-play"></i>
                    <span class="button-text-content">ver mais</span>
                </a>
            </div>

            <ul class="banner-controller">
                <li class="banner-pick selected" id="banner-btn-1">1</li>
                <li class="banner-pick" id="banner-btn-2">2</li>
                <li class="banner-pick" id="banner-btn-3">3</li>
                <li class="banner-pick" id="banner-btn-4">4</li>
                <li class="banner-pick" id="banner-btn-5">5</li>
            </ul>

            </div>
            `
    return $header
}


export function setHeaderInteractivity(movieList){
    
    setBannerControl()
    
    function setBannerControl(){
        const bannerPikerList= document.querySelectorAll('.banner-controller .banner-pick')
        const $mainHeader = document.querySelector('.main-header')
        const IMAGE_URL= 'https://image.tmdb.org/t/p/w1280'

        const newMovieList = [...movieList]
        newMovieList.length = 5

        
        let currentPiker
        let currentContentIndex = 0
        let blockNextAltomaticChange = false //used for the banner not to switch quickly when the user selects it from the control

        bannerPikerList.forEach((piker, index)=>{
            if(piker.classList.contains('selected')) currentPiker = piker

            piker.addEventListener('click', (e)=>{
                if(e.target === currentPiker) return

                e.target.classList.add('selected')
                currentPiker.classList.remove('selected')

                toggleBanner(newMovieList[index])

                currentPiker = e.target
                currentContentIndex = index
                blockNextAltomaticChange = true
            })
        })

        setAutomaticControl()
        function setAutomaticControl(){
            setInterval(() => {

                // used how parama for the banner not to switch quickly when the user selects it from the control
                if(blockNextAltomaticChange){
                    blockNextAltomaticChange = false
                    return
                }

                let nextBannerIndex = currentContentIndex++ >= bannerPikerList.length -1 ? 0 : currentContentIndex++
                
                toggleBanner(newMovieList[nextBannerIndex])

                bannerPikerList[nextBannerIndex].classList.add('selected')
                currentPiker.classList.remove('selected')

                currentPiker = bannerPikerList[nextBannerIndex]
                currentContentIndex = nextBannerIndex
            }, 5000);
        }
        
        function toggleBanner(bannerContent){
            const { title, vote_average, overview, backdrop_path} = bannerContent
            const backdropPath = IMAGE_URL+backdrop_path
            
            $mainHeader.querySelector('.banner-image').src = backdropPath
            $mainHeader.querySelector('.banner-image').alt = title
            $mainHeader.querySelector('.title').textContent = title
            $mainHeader.querySelector('.IMDb-result .real-result').textContent = vote_average
            $mainHeader.querySelector('.synopsis-text').textContent = overview
        }
}
}