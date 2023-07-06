document.querySelector('button').addEventListener('click', submitNewMantra);

function submitNewMantra(){
    const newMantra = document.querySelector('input').value;

    fetch("http://localhost:3001/api/mantra", {
        method: "POST",
        body: JSON.stringify({
            mantra: newMantra,
            checked: false
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    window.location.href = 'http://localhost:3001/';
}