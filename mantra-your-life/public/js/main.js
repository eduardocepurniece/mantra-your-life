document.querySelector('#getMantra').addEventListener('click', getMantra);
document.querySelector('#addMantra').addEventListener('click', goToAddMantra);

let dailyMantra = '';

function getMantra(){
    fetch('http://localhost:3001/api/mantra/random')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        dailyMantra = data.mantra;
        document.querySelector('h2').innerHTML = data.mantra;
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function goToAddMantra(){
    window.location.href = 'http://localhost:3001/addmantra';
}