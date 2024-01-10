/*=============== SHOW MENU ===============*/
const navMenu= document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* menu show */
if (navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}
/* menu hidden*/
if (navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav_link, we remove the show-menu class navMenu.classList.remove('show-menu')
    navMenu.classList.remove('show-menu')
} 

navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/

const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag this.scrolly >= 50 ? header.classList.add('scroll-header')
    this.scrollY>=50 ? header.classList.add('scroll-header')
                     : header.classList.remove('scroll-header')

}
window.addEventListener('scroll', scrollHeader)


/*=============== SHADOW HEADER ===============*/

const shadowHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag this.scrolly >= 50 ? header.classList.add('scroll-header')
    this.scrollY>=50 ? header.classList.add('shadow-header')
                     : header.classList.remove('shadow-header')

}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()
    emailjs.sendForm('service_fziiebv','template_yaptmys','#contact-form','icj_HwgKRS7mFVJ-G')
    .then(() =>{
        //show sent message
        contactMessage.textContent = 'Message sent successfully :)'
        
        //Remove message after 5 seconds
        setTimeout(() =>{
            contactMessage.textContent = ''

        },5000)

        //clear input fields
        contactForm.reset()

    },()=>{
        contactMessage.textContent = 'Message not send (service error)' 
    })
}

contactForm.addEventListener('submit', sendEmail)


/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp= document.getElementById('scroll-up')
    this.scrollY >=350 ? scrollUp.classList.add('show-scroll')
                       : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive=() =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
                    sectionTop = current.offsetTop -58,
                    sectionId= current.getAttribute('id'),
                    sectionsClass=document.querySelector('.nav__menu a[href*=' + sectionId +']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop+sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 

const themeButton=document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

//previously selected topic
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//obtain current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

//validate if the user previously chose a topic
if (selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    //add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    //save the theme and current icon that the user choose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})



/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr=ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal('.home__perfil, .about__image, .contact__mail', {origin: 'right'})
sr.reveal('.home__name, .home__info, .about__container, .section__title-1, about__info, .contact__social, .contact__data', {origin: 'left'})
sr.reveal('.life__card, .project__card', {interval: 100})