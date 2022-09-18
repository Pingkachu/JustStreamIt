// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal__close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on a picture, opens the modal
window.onclick = function(event) {
  if (event.target.classList.contains("btn-movie")) {
    let movieUrl = event.target.getAttribute("movie-url");
    getMovieInfo(movieUrl);
    modal.style.display = "block";
  }
  if(event.target.classList.contains("row__next")) {
    var row = event.target.parentElement;
    var rowContainer = row.firstElementChild;
    rowContainer.scroll({
      left: 400,
      top: 0,
      behavior: 'smooth'
    })
  }
  if(event.target.classList.contains("row__previous")) {
    var row = event.target.parentElement;
    var rowContainer = row.firstElementChild;
    rowContainer.scroll({
      left: -400,
      top: 0,
      behavior: 'smooth'
    })
  }
}

getBestMovie();
setNextPreviousBtn();
getMoviesPicture('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', 'topRatedMovies');
getMoviesPicture('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=action', 'actionMovies');
getMoviesPicture('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&lang=french&country=france', 'frenchMovies');
getMoviesPicture('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&actor=morgan+freeman', 'freemanMovies');

function setNextPreviousBtn() {
  var rows = document.getElementsByClassName("row");
  for (let i=0; i<4; i++) {
    //Définis les boutons du scroll
    var btnext = document.createElement('span');
    btnext.setAttribute('class', 'row__next row__indicator');
    btnext.innerHTML = ">";
    rows[i].append(btnext);
    var btnpre = document.createElement('span');
    btnpre.setAttribute('class', 'row__previous row__indicator');
    btnpre.innerHTML = "<";
    rows[i].append(btnpre);
  }
}

function getBestMovie() {
  fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .then(function(value) {
      let bestMovie = value.results[0];
      var img = document.createElement('img');
      var text = document.createElement('h1');
      var btn = document.createElement('button');
      img.setAttribute('class', 'best-movie__picture');
      img.setAttribute('src', bestMovie['image_url']);
      text.setAttribute('class', 'best-movie__title');
      btn.setAttribute('class', 'best-movie__button btn-movie');
      btn.setAttribute('movie-url', bestMovie['url']);
      btn.innerHTML = "Play";
      text.innerHTML = bestMovie['title'];
      document.getElementById('bestMovie').appendChild(img);
      document.getElementById('bestMovie').appendChild(text);
      document.getElementById('bestMovie').appendChild(btn);



      console.log(value.results[0]);
    }) 
    .catch(function(err) {
      // Une erreur est survenue
    });
}


function getMoviesPicture(url, category) {
  fetch(url)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .then(function(value) {
      console.log(value);
      let movies = value.results;
      //On va chercher l'image du film ainsi que l'url avec toutes les infos
      for (let i=0; i<5; i++) {
        var img = document.createElement('img');
        img.setAttribute('class', ('row__content btn-movie'));
        img.setAttribute('src', movies[i]['image_url']);
        img.setAttribute('movie-url', movies[i]['url']);
        document.getElementById(category).appendChild(img);
      }
      fetch(value.next)
        .then(function(res) {
          if (res.ok) {
            return res.json();
          } else {
            console.log('Mauvaise réponse du réseau');
          }
        })
        .then(function(value) {
          let movies = value.results;
          for (let i=0; i<2; i++) {
            var img = document.createElement('img');
            img.setAttribute('class', 'row__content btn-movie');
            img.setAttribute('src', movies[i]['image_url']);
            img.setAttribute('movie-url', movies[i]['url']);
            document.getElementById(category).appendChild(img);
          }
        }) 
        .catch(function(err) {
          // Une erreur est survenue
        });
    }) 
    .catch(function(err) {
      // Une erreur est survenue
    });
}
  
function getMovieInfo(url) {
  fetch(url)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .then(function(value) {
        let movie = value;
        let actors = [];
        for (let i=0; i<3; i++) {
          actors += movie['actors'][i] + ", ";
        }

        document.getElementById('moviePicture').src = movie['image_url'];
        document.getElementById('movieTitle').innerHTML = movie['title'];
        document.getElementById('movieGenres').innerHTML = movie['genres'];
        document.getElementById('movieReleaseDate').innerHTML = movie['date_published'] + ", " + movie['duration'] + " min";
        document.getElementById('movieRated').innerHTML = "Rated : " + movie['rated'];
        document.getElementById('movieImdbScore').innerHTML = "Score Imdb : " + movie['imdb_score'];
        document.getElementById('movieDirector').innerHTML = "Réalisation : " + movie['directors'];
        document.getElementById('movieActors').innerHTML = "Distribution : " + actors;
        document.getElementById('movieCountry').innerHTML = "Pays d'origine : " + movie['countries'];
        if (movie['worldwide_gross_income'] == null) {
          document.getElementById('movieGrossIncome').innerHTML = "Recettes : Non défini"
        } else {
          document.getElementById('movieGrossIncome').innerHTML = "Recettes : " + movie['worldwide_gross_income'].toString() + " " + movie['budget_currency'];
        }
        document.getElementById('movieDescritpion').innerHTML = movie['description'];
    }) 
    .catch(function(err) {
      // Une erreur est survenue
    });
}
