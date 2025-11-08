console.log("ola mundo");


document
    .querySelector('#nav-itens')
    .querySelectorAll('.nav-link')
    .forEach(navLink) =>{
        console.log('percorrendo navLink')
        console.log(navLink.href);
        const uriAtual = window.location.pathname
        if (navLink.href.includes(uriAtual)){
            console.log('deu match',navLink)
        }
    }