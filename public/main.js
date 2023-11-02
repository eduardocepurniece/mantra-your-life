/*document.querySelector('#delete-button').addEventListener('click', deleteQuote);*/

const buttons = document.querySelectorAll('.delete-quote-buttons');
const messageDiv = document.querySelector('#message');

Array.from(buttons).forEach(element => element.addEventListener('click', deleteQuote));

function deleteQuote(click){
    const quoteBody = click.target.previousSibling.previousSibling.innerText;
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            quote: quoteBody
        })
    }).then(res => {
        if(res.ok) return  res.json()
    }).then(response => {
        window.location.reload(true)
    })
}
