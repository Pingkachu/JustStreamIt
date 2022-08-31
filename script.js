// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal__close")[0];

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

var ul = document.createElement('ul');
        ul.setAttribute('id','proList');

        productList = ['Electronics Watch','House wear Items','Kids wear','Women Fashion'];

        document.getElementById('renderList').appendChild(ul);
        productList.forEach(renderProductList);

        function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);

            li.innerHTML=li.innerHTML + element;
        }

  fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(value) {
        let bestMovie = value.results[0];
        var img = document.createElement('img');
        img.setAttribute('id', 'best-movie__picture');
        img.setAttribute('src', bestMovie['image_url']);
        document.getElementById('myBtn').appendChild(img);

        document.getElementsByClassName("best-movie__title").innerHTML = bestMovie['title'];
        console.log(bestMovie['title']);
      })
      .catch(function(err) {
        // Une erreur est survenue
      });
  
