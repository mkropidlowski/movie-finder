const form = document.querySelector('.inputFilm');
const filmBox = document.querySelector('.filmBox');

const key = '49fe4ed1';

const getMovie = async (titleMovie) => {
    const url = 'http://www.omdbapi.com/';
    const query = `?apikey=${key}&t=${titleMovie}`;

    const response = await fetch(url+query);
    const data = response.json();

    return data;
    
}
// s= / wypisuje wszystkie skojarzenia
// t= / wypisuje tylko po konkretnym tytule

const viewData = (data) =>{

    const htmlTemplate = `
    <div class="header">
        <div class="movieTitle">
            <h2>${data.Title}</h2>
            <p>${data.Year} / ${data.Runtime}</p>
            <p><img src="/img/star.png"> ${data.imdbRating} Votes: ${data.imdbVotes}</p>
        </div>
        </div>
        
        <div class="filmDetails">
    
            <div class="filmImg">
            <img src="${data.Poster}" width="320" height="400">
            </div>
    
            <div class="aboutFilm">
                <p>${data.Plot}</p>
                <table class="tableFilmInfo">    
                    <tr>
                        <td class="filmInfo"><p>Director: </p></td><td><p>${data.Director}</p></td>
                    </tr>
                    <tr>
                        <td class="filmInfo"><p>Genre: </p></td><td><p>${data.Genre}</p></td>
                    </tr>
                    <tr>
                        <td class="filmInfo"><p>Production:</p></td><td><p>${data.Country}</p></td>
                    </tr>
                    <tr>
                        <td class="filmInfo"><p>Released:</p></td><td><p>${data.Released}</p></td>
                    </tr>
                    <tr>
                        <td class="filmInfo"><p>Awards:</p></td><td><p>${data.Awards}</p></td>
                    </tr>
                    <tr>
                        <td class="filmInfo"><p>Box Office:</p></td><td><p>${data.BoxOffice}</p></td>
                    </tr>
                    
                </table>
            </div>
    
            
        </div>

        <div class="actorsInfo">
            <p><b>Actors:</b> ${data.Actors}</p>
            
        </div> 
    `;

    filmBox.innerHTML = htmlTemplate;
}

form.addEventListener('keyup', e =>{
    e.preventDefault();
    const empty = '';
    const userValue = form.filmName.value.trim();
    //form.reset();
    if(userValue === '')
    {
        filmBox.innerHTML = empty;    
    } else {
        getMovie(userValue)
         .then(data => viewData(data))
         .catch(err => console.log(err));

    } 

});

