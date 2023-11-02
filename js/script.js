const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
const list = document.getElementById("lista");
let arrayMovies = {};
const btn = document.getElementById("btnBuscar");
let HTMLContentToApend = "";
const buscador = document.getElementById("inputBuscar");


async function fetchData(url){
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Error");
    }
}


btn.addEventListener("click", () => {
    fetchData(URL)
    .then(data => {
        data.forEach(movie => {
            HTMLContentToApend += `
            <li class="card list-group-item bg-transparent d-none" data-name="${movie.title}" data-description="${movie.tagline}">
            <div class="row">
                <div class="col-9">
                    <h6 strong style=""><strong>${movie.title}</strong></h6>
                    <p style="font-style: oblique;">${movie.tagline}</p>
                </div>
                <div class="col-3 stars">
                    <p >${stars(movie.vote_average)}</p>
                </div>
            </div>
            </li>
            `
        });
        list.innerHTML = HTMLContentToApend;
    }) 
});


function stars(average) {
    let score = 0;
    let result = "";
    score = Math.floor(parseInt(average) * 0.625);
    for (let i = 0; i < score; i++) {
        result += `<span class="fa fa-star checked"></span>`
        
    }
    if (score < 5) {
        for (let index = 5; index > score; index--) {
            result += `<span class="fa fa-star"></span>`
        }
    }  
    return result;
}; 

function search (e) {
    if (e.target.matches("#inputBuscar")){
        const movies = document.querySelectorAll("li");
        movies.forEach(movie => {
            if(movie.dataset.name.toLowerCase().includes(e.target.value.toLowerCase()) || movie.dataset.description.toLowerCase().includes(e.target.value.toLowerCase())) {
                movie.classList.remove("d-none");
            };
        })
    }
}

btn.addEventListener("search", e => {
    if (buscador.value != "" ) {
        btn.removeAttribute("disabled");
        search(e);
    } else {
        btn.setAttribute("disabled", "");
    }
})

