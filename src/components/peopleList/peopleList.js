export default async (peopleList, listTitle, IMAGE_URL_P)=>{
    const $moviesByTheme = document.createElement('section')
    const newPeopleList = [...peopleList]
    newPeopleList.length = 20
    
    $moviesByTheme.classList.add('peoples-section')

    $moviesByTheme.innerHTML= `
    <h3 class="list-title">${listTitle}</h3>
    
    
    <div class="rail">
        <ul class="people-list">
        <div class="controller">
            <button class="backwards">
                <img src="src/images/icons/arrowRight.svg" alt="">
            </button>
            <button class="forwards">
                <img src="src/images/icons/arrowRight.svg" alt="">
            </button>
        </div>
        ${
                newPeopleList.map((people)=>{
                    const { profile_path, name} = people


                    const HTMLContent = `
                    <a href="#" class="people-link">
                        <li class="people">
                        <picture class="profile-wppr">
                                    <img src="${IMAGE_URL_P+profile_path}" alt="" srcset="" class="profile">
                                </picture>
                    
                                <h4 class="people-name">${name}</h4>
                        </li>
                    </a>`
                    
                    return HTMLContent
                }).join('')
            }
        </ul>
    </div>`

    setInteractivity()
    
    return $moviesByTheme

    function setInteractivity(){
        const $controlBtnLst = $moviesByTheme.querySelectorAll('.controller button')
        let currentMarginLeft = 0;

        $controlBtnLst.forEach(button =>{
            
            button.addEventListener('click', e =>{
                const $rail = button.closest('.rail')
                const $peopleList = $rail.querySelector('.people-list')
                const peopleListW = $peopleList.offsetWidth
                const columnGapPercentage = Number(window.getComputedStyle($peopleList).getPropertyValue('column-gap').replace('%', ''))
                const columnGap = (peopleListW / 100) * columnGapPercentage

                if(button.classList.contains('forwards')){
                    let newMarginLeft = currentMarginLeft - peopleListW - columnGap
                    const scrollRight = $rail.scrollWidth - peopleListW

                    if(scrollRight < peopleListW) newMarginLeft = 0
                    $peopleList.style.marginLeft = `${newMarginLeft}px`

                    currentMarginLeft = newMarginLeft
                }
                else{
                        let newMarginLeft = currentMarginLeft + peopleListW + columnGap
    
                        if(newMarginLeft > 0) newMarginLeft = -($rail.scrollWidth - peopleListW)
                        $peopleList.style.marginLeft = `${newMarginLeft}px`
    
                        currentMarginLeft = newMarginLeft
                }
            })
        })
    }
}