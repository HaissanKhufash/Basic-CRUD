export default function activatePanel(){
    const $button = document.querySelector('.panel-btn'),
    showPanel = e => {
        const $asideMoblie = document.querySelector('.nav-index-m')
        if(e.target === $button || e.target.matches('.panel-btn *')){
            $asideMoblie.classList.toggle('nav-index-m--activated')
        }else if(e.target.matches('.nav-index-m') || e.target.matches('.nav-index-m *:not(a)')){

        }else{  
            $asideMoblie.classList.remove('nav-index-m--activated')
        }
    }

    document
    .addEventListener('click', showPanel)
}