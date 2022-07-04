const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');


const ws = new WebSocket('ws://localhost:3000');

function setStatus(value) {
    status.innerHTML = value;
}

async function  printMessage(value){
    const li = document.createElement('li');
    const text = await value.text(); 
    li.innerHTML = text;
    messages.appendChild(li);

    
}

form.addEventListener('submit', event => {
    event.preventDefault();

    ws.send(input.value);
    input.value =  '';
})

ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onmessage = response =>{
    
    printMessage(response.data)};