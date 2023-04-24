export default ()=>{
    const $footer = document.createElement('footer')
    $footer.classList.add('main-footer')

    $footer.innerHTML=`
        <span class="contact-options">  
            <a href="#" class="facebook-link"><i class="fa-brands fa-square-facebook facebook-icon"></i></a>
            <a href="#" class="instagram-link"><i class="fa-brands fa-instagram instagram-icon"></i></i></a>
            <a href="#" class="twitter-link"><i class="fa-brands fa-twitter twitter-icon"></i></a>
            <a href="#" class="youtube-link"><i class="fa-brands fa-youtube youtube-icon"></i></a>
        </span>

        <span class="terms-and-conditions">
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy & Policy</a>
            <a href="#">Press Room</a>
        </span>

        <span class="authors">
            <a href="https://www.linkedin.com/in/kawan-sousa-alves-b13108251/" target="_blank">2023-Desenvolvido por Kawan Sousa Alves</a>
        </span>
    `
    return $footer
}