export default async (peopleList, listTitle, IMAGE_URL_P)=>{
    const $peopleLst = document.createElement('section')
    const newPeopleList = [...peopleList]
    newPeopleList.length = 20
    
    $peopleLst.classList.add('peoples-section')

    $peopleLst.innerHTML= `
    <h3 class="list-title">${listTitle}</h3>
    
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
            <ul class="people-list">
            ${
                newPeopleList.map((people)=>{
                    const { profile_path, name} = people

                    const HTMLContent = `
                    <li class="people">
                        <a href="#" class="people-link">
                            <picture class="profile-wppr">
                                        <img src="${IMAGE_URL_P+profile_path}" alt="" srcset="" class="profile">
                            </picture>
                        </a>
                        
                        <h4 class="people-name">${name}</h4>
                    </li>`
                    
                    return HTMLContent
                }).join('')
            }
            </ul>
        </div>
    </div>`

    setInteractivity()
    
    return $peopleLst

    function setInteractivity(){
        const $controlBtnLst = $peopleLst.querySelectorAll('.controller button')
        const railWppr = $controlBtnLst[0].closest('.rail-wppr')
        const $rail = railWppr.querySelector('.rail')
        const $peopleList = $rail.querySelector('.people-list')
        let currentMarginLeft = 0;

        $controlBtnLst.forEach(button =>{
            
            button.addEventListener('click', e =>{

                const peopleListW = $peopleList.offsetWidth
                const columnGapPercentage = Number(window.getComputedStyle($peopleList).getPropertyValue('column-gap').replace('%', ''))
                const columnGap = (peopleListW / 100) * columnGapPercentage
                const marginError = 10
                const peopleW = $peopleList.querySelector('.people').offsetWidth

                if(button.classList.contains('forwards')){
                    const scrollRight = $rail.scrollWidth - $rail.clientWidth
                    let newMarginLeft = currentMarginLeft - peopleListW - columnGap


                    if(scrollRight <= peopleW * 3 + columnGap * 3 + marginError && scrollRight >= peopleW * 3 + columnGap * 3 - marginError){
                        newMarginLeft = currentMarginLeft - scrollRight
                    }
                    else if(scrollRight <= peopleW * 2 + columnGap * 2 + marginError && scrollRight >= peopleW * 2 + columnGap * 2 - marginError){
                        newMarginLeft = currentMarginLeft - (peopleW * 2 + columnGap * 2)
                    }
                    else if(scrollRight <= peopleW + columnGap + marginError && scrollRight >= peopleW + columnGap - marginError){
                        newMarginLeft = currentMarginLeft - scrollRight
                    }
                    else if(scrollRight < $rail.offsetWidth){
                        newMarginLeft = 0
                    }


                    $peopleList.style.marginLeft = `${newMarginLeft}px`
                    currentMarginLeft = newMarginLeft
                }
                else{
                    const scrollLeft = -1 * currentMarginLeft
                    let newMarginLeft = currentMarginLeft + peopleListW + columnGap

                    if(scrollLeft >= peopleW + columnGap - marginError && scrollLeft <= peopleW + columnGap + marginError)newMarginLeft = 0
                    else if(scrollLeft >= peopleW * 2 + columnGap * 2 - marginError && scrollLeft <= peopleW * 2 + columnGap * 2 + marginError)newMarginLeft = 0
                    else if(scrollLeft >= peopleW * 3 + columnGap * 3 - marginError && scrollLeft <= peopleW * 3 + columnGap * 3 + marginError)newMarginLeft = 0
                    else if(newMarginLeft >= marginError) newMarginLeft = -($peopleList.scrollWidth - $peopleList.offsetWidth)
                    
                    
                    $peopleList.style.marginLeft = `${newMarginLeft}px`
                    currentMarginLeft = newMarginLeft
                }
            })
        })
        
        window.addEventListener('resize', ()=>{
            $peopleList.style.marginLeft = `0px`
            currentMarginLeft = 0
        })

        const peoplesProfiles = $peopleLst.querySelectorAll('.people .people-link .profile')

        peoplesProfiles.forEach((img)=>{
            img.onerror = ()=>{
                const movie = img.closest('.people')
                
                movie.remove()
            }
        })
    }
}