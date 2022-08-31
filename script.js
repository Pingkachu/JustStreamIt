// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

fetch('http://localhost:8000/api/v1/titles/?year=2000&imdb_score_min=8.8')
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(value) {
        console.log(value.results[0]['image_url']);
      })
      .catch(function(err) {
        // Une erreur est survenue
      });

