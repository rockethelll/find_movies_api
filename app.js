const result = document.getElementById('result')
const form = document.querySelector('form')
const input = document.querySelector('input')

const modal = document.getElementById('myModal')

let movies = []

const fetchMovies = async (search) => {
  await fetch(`http://www.omdbapi.com/?s=${search}&apikey=[YOUR_API_KEY]`)
    .then((response) => response.json())
    .then((data) => (movies = data))
}

const moviesDisplay = () => {
  if (movies.Search === null) {
    result.innerHTML = '<h2>Aucun résultat</h2>'
  } else {
    result.innerHTML = movies.Search.map((movie) => {
      return `
      <li class='card'>
        <img src='${movie.Poster}' alt='${movie.Title}'>
        <h2>${movie.Title}</h2>
        <p>${movie.Year}</p>
        <button data-imdbID='${movie.imdbID}' id='read'>Read More</button>
      </li>
      `
    }).join('')
    let readMoreBtn = document.querySelectorAll('button')
    readMoreBtn = document.querySelectorAll('button')
    readMoreBtn.forEach((button) => {
      button.addEventListener('click', () => {
        let imdbID = button.dataset.imdbid
        modalDisplay(imdbID)
      })
    })
  }
}

let searchModal = []

const fetchModal = async (imdbID) => {
  let url = `http://www.omdbapi.com/?i=${imdbID}&apikey=[YOUR_API_KEY]`
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      searchModal = data
    })
}

const modalDisplay = async (imdbID) => {
  await fetchModal(imdbID).then(() => {
    return (modal.innerHTML = `
    <div class="modal-wrapper">
      <span class="close">&times;</span>
      <div class="modal-content">
        <div class="modal-image">
          <img src='${searchModal.Poster}'>
        </div>
        <div class="modal-text">
          <h3>${searchModal.Title}</h3>
          <p>${searchModal.Year}</p>
          <p>${searchModal.Plot}</p>
        </div>
      </div>
    </div>
    `)
  })
  const span = document.getElementsByClassName('close')[0]

  modal.style.display = 'block'
  span.addEventListener('click', () => {
    modal.style.display = 'none'
  })
}

input.addEventListener('input', (e) => {
  fetchMovies(e.target.value)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  moviesDisplay()
})

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

// let options = {
//   rootMargin: '10% 0px',
//   thresold: 0,
// }

// const images = document.querySelectorAll('li > img')
// const handleIntersect = (entries) => {
//   console.log(entries)

//   entries.array.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.style.opacity = 1
//     }
//   })
// }

// const observer = new IntersectionObserver(handleIntersect, options)
// images.forEach((image) => {
//   observer.observe(image)
// })
