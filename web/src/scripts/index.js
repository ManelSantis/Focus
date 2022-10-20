var duration; // Converter a duração em segundos
var display = document.querySelector("#timer"); // Elemento para exibir o timer
var hours;
var tasksCount = 0;
var minutes;
var seconds;
var timer;
var interval;
var counterMin = null;
var pauseWatch = new Boolean(true);
var restTime = new Boolean(false);

function watch() {

    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt((timer % 3600) % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0){
       rest();
    }

}

function adicionarTask () {
    if(document.querySelector("#addTask").value.length == 0){
        alert("Por favor, escreva uma tarefa")
    } else {
        tasksCount += 1;
        document.querySelector("#list").innerHTML += `
        <br>
        <br>
        <span> 
        <input type="checkbox" id="task" /> 
        <label> ${document.querySelector("#addTask").value} </label>
        </span> 
        `
    }
}

function start() {
    if (restTime) {
        duration = 60 * 25;
        timer = duration;
        document.getElementById("start").disabled = true; // Desabilitar botão para evitar mult click
        document.getElementById("pause").disabled = false; // Habilitar botão 
        document.getElementById("start").style.cursor = 'auto';
        interval = setInterval(watch, 1000); // Usar essa função a cada 1 segundo
    } else {
        duration = 60 * 5;
        timer = duration;
        document.getElementById("start").disabled = true; // Desabilitar botão para evitar mult click
        document.getElementById("pause").disabled = false; // Habilitar botão 
        document.getElementById("start").style.cursor = 'auto';
        interval = setInterval(watch, 1000); // Usar essa função a cada 1 segundo
    }
}

function pause(){
    
    if(pauseWatch) {
        clearInterval(interval);
        document.getElementById("pause").innerHTML = `<i class="fa-solid fa-backward"></i>`;
    } else {
        interval = setInterval(watch, 1000);
        document.getElementById("pause").innerHTML = `<i class="fa fa-pause"></i>`;
    }
    pauseWatch = !pauseWatch;
}

function rest(){
    document.getElementById("pause").disabled = true; // Desabilitar botão
    if (restTime) {
        document.getElementById("start").innerHTML =  `<i class="fa-solid fa-rotate-right"></i>`; 
    } else {
        document.getElementById("start").innerHTML = `<i class="fa fa-play"></i>`; 
    }
    
    document.getElementById("start").disabled = false;
    document.getElementById("start").style.cursor = 'pointer';
    clearInterval(interval);
    display.textContent = "00:00";
    restTime = !restTime;
    counterMin = null;
}