export default ()=>{
    const nav = document.createElement('nav')

    nav.classList.add('main-nav-bar')

    nav.innerHTML = `
        <a href="#" class="logo-link">
            <i>
                <img src="./src/images/icons/tv.svg" alt="logo tv" class="logo-img">
            </i>
            <span class="logo-name">Movie Box</span>
        </a>

        <form action="/" name="keyword" class="search-bar">
            <input type="text" name="search" id="search-bar-inpt" class="search-bar-inpt" placeholder="o que você quer assistir?">
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
            const $searchIpt = nav.querySelector(".search-bar-inpt")
            const $searchLabel = nav.querySelector(".search-label")
            const $searchBtn = nav.querySelector(".search-request-btn")
            const URL_domain = window.location.host
            const URL_protocol = window.location.protocol

            $searchIpt.addEventListener('input', (e)=>{
                const { value } = e.target
                if(value){
                    $searchLabel.classList.add('hidden')
                    $searchBtn.classList.remove('hidden')
                    $searchform.action = `${URL_domain}.online/src/pages/search/search?name=${value}`
                }
                else{
                    $searchLabel.classList.remove('hidden')
                    $searchBtn.classList.add('hidden')
                }
            })

            // to mobile
            if(window.matchMedia("(max-width: 585px)").matches){
                const $searchBar = nav.querySelector(".search-bar")
                const $searchBtn = nav.querySelector(".search-bar .search-btn")
                
                $searchBtn.addEventListener('click', ()=>{
                    $searchBar.classList.add('active')
                })
            }
        }
        return nav
}