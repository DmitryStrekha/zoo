const amounts = document.querySelectorAll('.money');
const rangeValues = document.querySelectorAll('.range-value');
const enterAmount = document.querySelector('.input-amount');
const arrValues = [5000, 2000, 1000, 500, 250, 100, 50, 25];
const mediaQuery = window.matchMedia('(max-width: 640px)');
const active1000 = document.querySelector('.value1000');
const active100 = document.querySelector('.value100');

const blackout = document.querySelector('.blackout')
const headerBg = document.querySelector('.header');
const headerLogo = document.querySelector('.logo')
const areaBtnMenu = document.querySelector('.to-open-wrapper');
const btnMenu = document.querySelector('.to-open');
const menu = document.querySelector('.header__nav');
const designLink = document.querySelector('.header__link');

// burger menu
areaBtnMenu.addEventListener('click', openMenu);
blackout.addEventListener('click', openMenu);
function openMenu(){
    if (mediaQuery.matches) {
        blackout.classList.toggle('blackout-visible');
        headerBg.classList.toggle('header-open-menu');
        headerLogo.classList.toggle('logo-open-menu');
        btnMenu.classList.toggle('cross-open');
        menu.classList.toggle('open-nav');
        designLink.classList.toggle('design-open-menu');
    }
}

// end burger menu
window.addEventListener('DOMContentLoaded', checkActiveAmount);
window.addEventListener('resize', checkActiveAmount);
function checkActiveAmount(){
    // if (mediaQuery.matches) {
        nonActiveAmount();
        active100.classList.add('money-active');
        enterAmount.value = '100 ';
        // menu.classList.add('hidden-nav')
//   } else{
//     nonActiveAmount();
//     active1000.classList.add('money-active');
//     enterAmount.value = '';
//   }
}

for(const range of rangeValues){
    range.addEventListener('click', addActiveAmount);     
    // range.addEventListener('mouseover', addActiveAmount); 
}

function addActiveAmount(){
    amounts.forEach(amount => {
        amount.classList.remove('money-active');
    })
    let i = this.dataset.value - 1;
    amounts[i].classList.add('money-active');
    enterAmount.value = '';
    enterAmount.value = `${arrValues[i]}`;
}


amounts.forEach(el => {
    el.addEventListener("click", () => {
        nonActiveAmount();
        el.classList.add('money-active');
        enterAmount.value = '';
        enterAmount.value = `${el.dataset.value}`;
    })
    // el.addEventListener('mouseover', () => {
    //     nonActiveAmount();
    //     el.classList.add('money-active');
    //     enterAmount.value = '';
    //     enterAmount.value = `${el.dataset.value}`;
    // })
})

function nonActiveAmount(){
    amounts.forEach(amount => {
        amount.classList.remove('money-active');
    })
}

// const form = document.querySelector('.donation__form');
// form.addEventListener('keydown', function(event) {
//     if(event.keyCode == 13) {
//         event.preventDefault();
            
//        }
    
//  });

 enterAmount.addEventListener('input', afterWriteActiveAmount);

 function afterWriteActiveAmount(e){
    let writeAmount = Number(e.target.value);
    console.log('write', writeAmount);
    amounts.forEach(amount => {
        amount.classList.remove('money-active');
        if(arrValues.includes(writeAmount)){
        
            if(amount.dataset.value == writeAmount){
                console.log('amount.dataset.value ', amount.dataset.value );
                amount.classList.add('money-active');
            }
        }      
    })

 }


 

 enterAmount.addEventListener('input', ()=>{
	if(enterAmount.value > 9999){
		enterAmount.value = 9999;
}
})