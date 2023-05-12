export default ()=>{
    const nav = document.createElement('nav')

    nav.classList.add('main-nav-bar')

    nav.innerHTML = `
        <a href="${window.location.protocol}//moviecatalog.kawandev.online" class="logo-link">
            <i>
                <img src="https://moviecatalog.kawandev.online/src/images/icons/tv.svg" alt="logo tv" class="logo-img">
            </i>
            <span class="logo-name">Movie Box</span>
        </a>

        <form action="/" class="search-bar">
            <input type="text" name="query" id="search-bar-inpt" class="search-bar-inpt" placeholder="o que você quer assistir?">
            <label for="search-bar-inpt" class="search-label"><i class="fa-solid fa-magnifying-glass"></i></label>
            <button class="search-request-btn hidden"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>

        <div class="right-btns">
            <a href="#" class="login-btn">Sign in</a>

            <nav class="menu">
                
                <button class="menu-switch">
                    <div class="line-1"></div>
                    <div class="line-2"></div>
                </button>
            </nav>
        <div>`

        setInteractivity()

        function setInteractivity(){
            const $searchform = nav.querySelector(".search-bar")
            const $searchBar = nav.querySelector(".search-bar")
            const $searchIpt = nav.querySelector(".search-bar-inpt")
            const $searchLabel = nav.querySelector(".search-label")
            const $searchBtn = nav.querySelector(".search-request-btn")
            const smallViewport = 595
            const isSmallViewport = ()=>{
                return window.innerWidth <= smallViewport
            }
            const mobileFunctionality = {
                add: ()=>{
                    hasMinViewFunc = true
                    
                    $searchLabel.addEventListener('click', onClickSearchLbl)

                    // on click outside the form, removes the full view of the form and show only the icon
                    window.addEventListener('click', onClickOutsideSearchBar)
                },

                remove: ()=>{
                    hasMinViewFunc = false
                    
                    $searchLabel.removeEventListener('click', onClickSearchLbl)

                    window.removeEventListener('click', onClickOutsideSearchBar)
                }
            }
            let hasMinViewFunc = false
            
            $searchIpt.addEventListener('input', (e)=>{
                const { value } = e.target
                if(value){
                    $searchLabel.classList.add('hidden')
                    $searchBtn.classList.remove('hidden')
                    $searchform.action = `/src/pages/results/results.html?${$searchIpt.value}`
                }
                else{
                    $searchLabel.classList.remove('hidden')
                    $searchBtn.classList.add('hidden')
                }
            })

            $searchform.addEventListener('submit', e=>{
                if(!$searchIpt.value) e.preventDefault()
            })

            // nav bar to small viewport
            if(isSmallViewport() && !hasMinViewFunc) mobileFunctionality.add()

            window.addEventListener('resize', ()=>{

                if(isSmallViewport() && !hasMinViewFunc) mobileFunctionality.add()

                else if(!isSmallViewport() && hasMinViewFunc) mobileFunctionality.remove()
            })

            function onClickSearchLbl(){
                $searchBar.classList.add('active')
                    
                if($searchIpt.value){
                    $searchBtn.classList.remove('hidden')
                    $searchLabel.classList.add('hidden')
                }
            }

            function onClickOutsideSearchBar(e){
                if(!e.target.closest('.search-bar')){
                    $searchBar.classList.remove('active')

                    $searchBtn.classList.add('hidden')
                    $searchLabel.classList.remove('hidden')
                }
            }
            
        }
        return nav
}