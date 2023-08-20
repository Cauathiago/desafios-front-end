//theme toggler
const toggle = document.querySelector('.toggle');

toggle.addEventListener('click',()=>{
    document.body.classList.toggle('light-mode');
    toggle.classList.toggle('active');
})

//switch active class
const btns = document.querySelectorAll('.btn');
btns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        document.querySelector('.btn.active').classList.remove('active');
        e.target.classList.add('active');
    })
})

//fetch data
fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        const main = document.querySelector('main');

        function getDaily(){
            main.textContent = "";
            for(let i=0; i<data.length; i++){
                main.innerHTML += `
                    <div class="card">
                        <a href="#" class="details">
                            <section class="details__title">
                                <h2>${data[i].title}</h2>
                                <i class="fa-solid fa-ellipsis"></i>
                            </section>
                            <section class="details__time">
                                <h3 data-num="${data[i].timeframes.daily.current}">${data[i].timeframes.daily.current}hrs</h3>
                                <p>Yesterday - ${data[i].timeframes.daily.previous}hrs</p>
                            </section>
                        </a>
                    </div>`
            }
        }
        function getWeekly(){
            main.textContent = "";
            for(let i=0; i<data.length; i++){
                main.innerHTML += `
                    <div class="card">
                        <a href="#" class="details">
                            <section class="details__title">
                                <h2>${data[i].title}</h2>
                                <i class="fa-solid fa-ellipsis"></i>
                            </section>
                            <section class="details__time">
                                <h3 data-num="${data[i].timeframes.weekly.current}">${data[i].timeframes.weekly.current}hrs</h3>
                                <p>Last Week - ${data[i].timeframes.weekly.previous}hrs</p>
                            </section>
                        </a>
                    </div>`
            }
        }
        function getMonthly(){
            main.textContent = "";
            for(let i=0; i<data.length; i++){
                main.innerHTML += `
                    <div class="card">
                        <a href="#" class="details">
                            <section class="details__title">
                                <h2>${data[i].title}</h2>
                                <i class="fa-solid fa-ellipsis"></i>
                            </section>
                            <section class="details__time">
                                <h3 data-num="${data[i].timeframes.monthly.current}">${data[i].timeframes.monthly.current}hrs</h3>
                                <p>Last Month - ${data[i].timeframes.monthly.previous}hrs</p>
                            </section>
                        </a>
                    </div>`
            }
        }

        window.addEventListener('load',getWeekly()); //load weekly data by default

        //counter animation
        let numbers = document.querySelectorAll('h3');
        let interval = 1000;

        numbers.forEach(num =>{
            let startValue = 0;
            let endValue = parseInt(num.getAttribute('data-num'));
            let duration = Math.floor(interval / endValue);
            let counter = setInterval(()=>{
                startValue++;
                num.textContent = `${startValue}hrs`;
                if(startValue === endValue){
                    clearInterval(counter);
                }
            }, duration)
        })

        const dailyBtn = document.querySelector('.daily-btn');
        const weeklyBtn = document.querySelector('.weekly-btn');
        const monthlyBtn = document.querySelector('.monthly-btn');

        dailyBtn.addEventListener('click', getDaily);
        weeklyBtn.addEventListener('click', getWeekly);
        monthlyBtn.addEventListener('click', getMonthly);
    });