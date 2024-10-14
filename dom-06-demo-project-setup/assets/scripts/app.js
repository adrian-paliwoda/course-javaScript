const startMovieButton = document.querySelector('header button')

const addMovieModal = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const backdrop = document.getElementById('backdrop');
const entryText = document.getElementById("entry-text");

const cancelAddingMovieButton = document.querySelector('#add-modal .btn--passive');
const confirmAddingMovieButton = document.querySelector('#add-modal .btn--success');

const cancelDeletingMovieButton = document.querySelector('#delete-modal .btn--passive');


const titleInput = document.getElementById('title');
const imageUrlInput = document.getElementById('image-url');
const ratingInput = document.getElementById('rating');

let movies = [];


const confirmAddingMovieHandler= () => {
    turnOffAddingMovieModal();

    if (!validMovieInputs()) {
        alert('Provide correct data');
        return;
    }

    let movie = {
        id: Math.random().toString(),
        title : titleInput.value,
        imageUrl : imageUrlInput.value,
        rating : ratingInput.value.trim()
    };
    movies.push(movie);

    const newLi = document.createElement('li');
    newLi.classList.add('movie-element');
    newLi.innerHTML = `
    <div class="movie-element__image">
        <img src="${movie.imageUrl}" alt="${movie.title}">
    </div>
    <div class="movie-element__info">
        <h2>${movie.title}</h2>
        <p>${movie.rating}/5</p>
    </div>
    `;
    newLi.addEventListener('click', onClickMovieHandler.bind(this, movie.id));

    const ul = document.getElementById('movie-list');
    ul.append(newLi);

    cleanInputs();
    updateUI();
}

const cancelAddingMovieHandler= () => {
    turnOffAddingMovieModal();
    turnOffConfirmingModal();
    cleanInputs();
}

const onBackdropClickHandler = () => {
    turnOffAddingMovieModal();
    turnOffConfirmingModal();

    //confirmDeletingMovieButton.removeEventListener('click', confirmDeletingMovieHandler);
    cleanInputs();
}

const cancelDeletingMovieHandler = () => {
    //confirmDeletingMovieButton.removeEventListener('click', confirmDeletingMovieHandler);
    hideElement(deleteMovieModal);
    hideElement(backdrop);
}

const confirmDeletingMovieHandler = (movieId) => {
    confirmDeletingMovie(movieId);

    hideElement(backdrop);
    hideElement(deleteMovieModal);
    updateUI();
}

const onClickMovieHandler = (movieId) => {
    const confirmDeletingMovieButton = document.querySelector('#delete-modal .btn--danger');
    let yesButton = confirmDeletingMovieButton.cloneNode(true);

    yesButton.addEventListener('click', confirmDeletingMovieHandler.bind(null, movieId));
    confirmDeletingMovieButton.replaceWith(yesButton);

    showElement(deleteMovieModal);
    showElement(backdrop);
}

const updateUI = () => {
    const lis = document.querySelectorAll('main ul li');
    if (lis && lis.length > 0) {
        entryText.style.display = 'none';
    }
    else{
        entryText.style.display = 'block';
    }
}

const confirmDeletingMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }

    movies.splice(movieIndex, 1);
    const lis = document.getElementById('movie-list');
    lis.children[movieIndex].remove();

    //confirmDeletingMovieButton.removeEventListener('click', confirmDeletingMovieHandler.bind(null, movieId));
    updateUI();
}


const showElement= (elementToShow) => {
    elementToShow.classList.add('visible');
}

const hideElement= (elementToHide) => {
    elementToHide.classList.remove('visible');
}

const cleanInputs= () => {
    titleInput.value = '';
    imageUrlInput.value = '';
    ratingInput.value = '';
}


const showMovieModal = () => {
    showElement(addMovieModal);
    showElement(backdrop);

}

const turnOffAddingMovieModal = () => {
    hideElement(addMovieModal)
    hideElement(backdrop);
}

const turnOffConfirmingModal = () => {
    hideElement(deleteMovieModal);
    hideElement(backdrop);
}


const validMovieInputs = () =>{

    return validTitle() && validUrl() && validRatting();
}

const validTitle = () =>{
    let value = titleInput.value.trim();
    if (!value) {
        return false;
    }

    return isStringValid(value);
}

const validUrl = () =>{
    let value = imageUrlInput.value.trim();

    if (!value){
        return false;
    }

    return isStringValid(value);
}

const validRatting = () =>{
    let value = ratingInput.value.trim();
    if (!value){
        return false;
    }

    if (typeof value != "string"){
        return false; // we only process strings!
    }

    let digit = parseFloat(value);
    if (digit < 1 || digit > 5) {
        alert('Return rating value between 1 and 5');
        return false;
    }

    return true;
}

const isStringValid = (text) => {
    const regex = /^[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]+[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]*$/g;
    if (!regex.test(text))
    {
        return false;
    }

    return true;
}
const isUrl = (text) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

    return !!urlPattern.test(text);
}

startMovieButton.addEventListener('click', showMovieModal)

cancelAddingMovieButton.addEventListener('click', cancelAddingMovieHandler)
confirmAddingMovieButton.addEventListener('click', confirmAddingMovieHandler)

cancelDeletingMovieButton.addEventListener('click', cancelDeletingMovieHandler);
backdrop.addEventListener('click', onBackdropClickHandler)