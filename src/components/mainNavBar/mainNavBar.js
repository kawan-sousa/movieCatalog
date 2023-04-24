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

        <form action="./search.html" class="search-bar">
            <input type="text" name="search-bar" id="" class="search-bar-inpt" placeholder="o que você quer assistir?">
            <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
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

        return nav
}