const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
const list = document.getElementById("lista");
let arrayMovies = {};

let HTMLContentToApend = "";
const buscador = document.getElementById("inputBuscar");
const TITULO = document.getElementById('titulo');
const OVERVIEW = document.getElementById('overview');
const GENERO = document.getElementById('genero');
const year = document.getElementById("year");
const runtime = document.getElementById("runtime");
const budget = document.getElementById("budget");
const revenue = document.getElementById("revenue");


async function fetchData(url){
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Error");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    fetchData(URL)
    .then(data => {
        data.forEach(movie => {
            let generos = movie.genres
            let listGeneros = ''
            let dateString = movie.release_date
            let date = new Date(dateString)
            let year = date.getFullYear()
            generos.forEach(genero => {
                listGeneros += genero.name+'-'
            })
            HTMLContentToApend += `
            <li onclick="canva(${movie.id})" id="${movie.id}" class="card list-group-item bg-transparent d-none pelicula" data-name="${movie.title}" data-description="${movie.tagline}" data-overview="${movie.overview}" data-genero="${listGeneros}" data-year="${year}" data-runtime="${movie.runtime}" data-budget="${movie.budget}" data-revenue="${movie.revenue}" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
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

function canva(movie){
    const peli = document.getElementById(movie)
    TITULO.textContent = peli.dataset.name;
    OVERVIEW.textContent = peli.dataset.overview;
    GENERO.textContent = peli.dataset.genero;
    year.textContent =  peli.dataset.year;
    runtime.textContent = peli.dataset.runtime;
    budget.textContent =  "$" + peli.dataset.budget;
    revenue.textContent = "$" + peli.dataset.revenue;
}

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
        const movies = document.querySelectorAll(".pelicula");
        
        movies.forEach(movie => {
            if(movie.dataset.name.toLowerCase().includes(e.target.value.toLowerCase()) || movie.dataset.description.toLowerCase().includes(e.target.value.toLowerCase())) {
                movie.classList.remove("d-none");
            } else {
                movie.classList.add('d-none')
            }
        })
    }
}

buscador.addEventListener("keyup", e => {
    
    search(e);
    
})



