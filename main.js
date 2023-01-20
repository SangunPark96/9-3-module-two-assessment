const filmURL = "https://resource-ghibli-api.onrender.com/films"
const peopleURL = "https://resource-ghibli-api.onrender.com/people"


const select = document.querySelector('select')
const ul = document.querySelector('ul')
const display = document.querySelector('#display-info')
const review = document.querySelector('#review')
const button = document.querySelector('#reset-reviews')
const form = document.querySelector('form')
const showPeople = document.querySelector('#show-people')
const ol = document.querySelector('ol')


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(filmURL)
    .then((data) => data.json())
    .then((result) => {
       result.forEach((movie) =>{
           let option = document.createElement('option')
           option.value = movie.title
           option.innerHTML = movie.title
           select.append(option)
   
           select.addEventListener('change', (event) =>{
               if(event.target.value === option.value){
     
                   const title = document.createElement('h3')
                   const date = document.createElement('p')
                   const description = document.createElement('p')
   
                   display.innerHTML =''
                   title.textContent = `${movie.title}`
                   date.textContent = `${movie.release_date}`
                   description.textContent = `${movie.description}`
   
                   display.append(title, date, description)
               }
           })
       })
   
       form.addEventListener('submit', (event) => {
           event.preventDefault()
           const input = event.target.review.value
           const li = document.createElement('li')
           let movies = select.value
           if(movies === ""){
               alert('Please select a movie first')
           }else{
               li.innerHTML = `<strong><b>${movies}</b></strong>: ${input}`
                   ul.append(li)
                   event.target.reset()
           }
       });
    })
   
    .catch(error =>{
       console.log(error)
    });
}

function getPeople(){
    fetch(peopleURL)
     .then(response => response.json())
     .then(peopleData => {
    
        for(let i = 0; i < peopleData.length; i++){
            const character = document.createElement('li')
            character.innerHTML = peopleData[i].name
            ol.append(character)
        }   
     })
    
     .catch(error =>{
        console.log(error)
     });
    } 
    showPeople.addEventListener('click', (event) =>{
        event.preventDefault()
        getPeople()
    })

    button.addEventListener("click", () => {
        ul.innerHTML = `<ul></ul>`
      }); 

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
