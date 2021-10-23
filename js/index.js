// Iniciando o local storage
function clearStorage() {
  localStorage.clear()
  location.reload()
}

let completedList = []
if( localStorage.getItem('completed') !== null ) {
  let obj = JSON.parse( localStorage.getItem('completed') )
  completedList = obj
}

let planToWatchList = []
if( localStorage.getItem('planToWatch') !== null ) {
  let obj = JSON.parse( localStorage.getItem('planToWatch') )
  planToWatchList = obj
}

// API
const apiKey = 'api_key=04c35731a5ee918f014970082a0088b1'
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${apiKey}`
const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&${apiKey}&query=`

// Elementos do index
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

// Carrega a pagina inicial com os filmes mais populares
showMovies(apiUrl)
function showMovies(url){
  fetch(url).then(res => res.json())
  .then(function(data){
    data.results.forEach(element => {
          
      const el = document.createElement('div')
      const image = document.createElement('img')
      const text = document.createElement('h2')
      const releaseDate = document.createElement('h6')
      const url = document.createElement('a')
      
      text.innerHTML = `${element.title}`
      releaseDate.innerHTML = `${element.release_date}`
      image.src = IMGPATH + element.poster_path
      url.href = '#'
      url.addEventListener('click', function(){createMoviePage(`${element.id}`)}, false )

      el.appendChild(url)
      url.appendChild(image)
      el.appendChild(text)
      el.appendChild(releaseDate)
      main.appendChild(el)
    }) 
  })
}

// Impede que a searchbar faça uma pesquisa estando vazia
form.addEventListener("submit", (e) => {
    e.preventDefault()
    main.innerHTML = ''
     
    const searchTerm = search.value
    /* Adding the value wriiten in the search bar to the search Api,
    in order to get the movies we search for. */
    if (searchTerm) {
        showMovies(SEARCHAPI + searchTerm)
        search.value = ""
    }
})


const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

// Cria o popup com as informações do filme
function createMoviePage(id) {
  modal.style.display = "block";
  const movieSearch = `https://api.themoviedb.org/3/movie/${ id }?&` + apiKey
  fetch(movieSearch).then(res => res.json())
  .then(function(data){
    
    const el = document.getElementById("modalContent")
    
    const div = document.createElement('div')

    const divImg = document.createElement('div')
    const image = document.createElement('img')
    
    const divInfo = document.createElement('div')
    const title = document.createElement('h2')
    const releaseDate = document.createElement('p')
    const genreList = document.createElement('ul')
    const genres = document.createElement('h5')
    const time = document.createElement('h5')
    const votes = document.createElement('h5')
    const runtime = document.createElement('p')
    const voteAverage = document.createElement('p')
    const dataLancamento = document.createElement('h5')
    const addToCompletedList = document.createElement('button')
    const addToPlanToWatchList = document.createElement('button')


    for( let i = 0; i < data.genres.length; i++ ) {
      const genre = document.createElement('li')
      genre.innerHTML = `${data.genres[i].name}`
      genreList.appendChild(genre)
    }
    
    title.innerHTML = `${data.title}`
    releaseDate.innerHTML = `${data.release_date}`
    image.src = IMGPATH + data.poster_path
    genres.innerHTML = 'Generos:'
    time.innerHTML = 'Duração: '
    runtime.innerHTML = `${data.runtime} min`
    votes.innerHTML = 'Nota: '
    voteAverage.innerHTML = `${data.vote_average}`
    dataLancamento.innerHTML = 'Lançamento: '

    addToCompletedList.innerHTML = 'Completed'
    addToCompletedList.addEventListener('click', function(){ 
      completedList.push( data )
      let objString = JSON.stringify(completedList)
      localStorage.setItem('completed', objString)  
    }, false )
    addToPlanToWatchList.innerHTML = 'Plan to Watch'
    addToPlanToWatchList.addEventListener('click', function(){
      planToWatchList.push(data)
      let objString = JSON.stringify(planToWatchList)
      localStorage.setItem('planToWatch', objString)
    }, false )

    el.appendChild(div)

    div.appendChild(divImg)
    div.appendChild(divInfo)
    
    divImg.appendChild(image)
    
    divInfo.appendChild(title)
    divInfo.appendChild(dataLancamento)
    divInfo.appendChild(releaseDate)
    divInfo.appendChild(genres)
    divInfo.appendChild(genreList)
    divInfo.appendChild(time)
    divInfo.appendChild(runtime)
    divInfo.appendChild(votes)
    divInfo.appendChild(voteAverage)
    divInfo.appendChild(addToCompletedList)
    divInfo.appendChild(addToPlanToWatchList)

    modal.appendChild(el)
  }) 
}

span.onclick = function() {
  modal.style.display = "none";
  window.location.reload()
}

// Mostra a lista dos filmes já assistidos
function showCompleted(){
  main.innerHTML = ''
  completedList.forEach(element => {
    
    const el = document.createElement('div')
    const image = document.createElement('img')
    const text = document.createElement('h2')
    const releaseDate = document.createElement('h6')
    const url = document.createElement('a')
    
    text.innerHTML = `${element.title}`
    releaseDate.innerHTML = `${element.release_date}`
    image.src = IMGPATH + element.poster_path
    url.href = '#'
    url.addEventListener('click', function(){createMoviePage(`${element.id}`)}, false )

    el.appendChild(url)
    url.appendChild(image)
    el.appendChild(text)
    el.appendChild(releaseDate)
    main.appendChild(el)
  }) 
}

// Mostra a lista dos filmes que se pretende assistir
function showPlanToWatch(){
  main.innerHTML = ''
  planToWatchList.forEach(element => {
     
    const el = document.createElement('div')
    const image = document.createElement('img')
    const text = document.createElement('h2')
    const releaseDate = document.createElement('h6')
    const url = document.createElement('a')
    
    text.innerHTML = `${element.title}`
    releaseDate.innerHTML = `${element.release_date}`
    image.src = IMGPATH + element.poster_path
    url.href = '#'
    url.addEventListener('click', function(){createMoviePage(`${element.id}`)}, false )

    el.appendChild(url)
    url.appendChild(image)
    el.appendChild(text)
    el.appendChild(releaseDate)
    main.appendChild(el)
  }) 
}