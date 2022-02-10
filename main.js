const themes = [
    { style: [], bak: 'tree-white' },
    { style: ['dark'], bak: 'tree-dark' },
    { style: ['serif'], bak: 'forest-white' },
    { style: ['serif', 'dark'], bak: 'forest-dark' },
]

function changeTheme(theme) {
    let selected_theme = themes[theme];
    document.body.removeAttribute('class');
    selected_theme.style.forEach(style => {
        document.body.classList.add(style);
    });
    document.body.style.backgroundImage = `url("media/${selected_theme.bak}-bak.jpg")`;
    localStorage.setItem('theme', theme)
}

function deleteLoadingScreen() {
    let loadingScreen = document.querySelector('.loadingscreen');
    loadingScreen.style.opacity = '0';
    loadingScreen.addEventListener('transitionend', () => {
        loadingScreen.remove();
    })
}

function reavealMenu() {
    document.querySelector('.links').classList.toggle('show');
}

let goalDate = "13 Nov 2022";

const blocks = document.querySelectorAll('.block');

function updateTime() {
    const endDate = new Date(goalDate);
    const currentDate = new Date();

    const dateDiff = (endDate - currentDate) / 1000;
    
    let seconds = Math.floor(dateDiff) % 60;
    let minutes = Math.floor(dateDiff / 60) % 60;
    let hours = Math.floor(dateDiff / 3600) % 24;
    let days = Math.floor(dateDiff / 3600 / 24);

    blocks[0].children[0].textContent = timeFormat(days);
    blocks[1].children[0].textContent = timeFormat(hours);
    blocks[2].children[0].textContent = timeFormat(minutes);
    blocks[3].children[0].textContent = timeFormat(seconds);
}

function timeFormat(time) {
    return time < 10 ? "0" + time : time;
}

const timer = setInterval(updateTime, 1000);

function addDate(name, date) {
    let dates = localStorage.getItem('dates');
    let obj = JSON.stringify({"name": name, "date": date});

    if(dates == undefined) {
        localStorage.setItem('dates', [obj])
    }
    else {
        dates.push(obj);
        localStorage.setItem('dates', dates);
    }
    
}

function selectDate(date) {
    goalDate = date.date;
    document.querySelector('.goal').children[1].textContent = date.name;
}

window.onload = () => {
    updateTime();
    //if(localStorage.getItem('theme') == undefined) { return deleteLoadingScreen(); }
    //changeTheme(localStorage.getItem('theme'));
    changeTheme(3);
    deleteLoadingScreen();
}
