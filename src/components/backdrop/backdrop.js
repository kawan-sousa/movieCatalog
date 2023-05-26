export default async (IMAGE_URL, backdropPath)=>{
    const $backdrop = document.createElement('picture')

    $backdrop.classList.add('backdrop')

    $backdrop.innerHTML=`
    <img src="${IMAGE_URL}${backdropPath}" alt="backdrop of the movie" class="backdrop-image">`

    
    return $backdrop
}