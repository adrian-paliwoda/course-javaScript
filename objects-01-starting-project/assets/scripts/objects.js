const movieList = document.getElementById('movie-list');
const addMoveBtn = document.getElementById('add-movie-btn');
const searchMoveBtn = document.getElementById('search-btn');
const filterInput = document.getElementById('filter-title');
const movies = [];

// movieList.style.backgroundColor = 'red';
// movieList.style['backgroundColor'] = 'red';
// movieList.style['background-color'] = 'red';
//
// movieList.style.display = 'block';

const addMovieHandler = () => {
    addMovie();
    renderMovies();
    clearInputAddMovie();
}

const addMovie = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (extraName.trim() === '' || extraValue === '') {
        return;
    }

    const newMovie = {
        info: {
            get title(){
                return this._title;
            },
            set title(value){
                if (value.trim() === '') {
                    this._title = 'DEFAULT';
                }
                this._title = value;
            },

            [extraName]: extraValue
        },
        id: Math.random().toString(),
        getFormattedTitle: function () {
            return this.info.title.toUpperCase();
        },
        getFormattedTitleLowerCase() {
            return this.info.title.toLowerCase();
        },
    };
    newMovie.info.title = title;

    movies.push(newMovie);

    console.log(newMovie);
}

const renderMovies = (filter = '') => {
    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';

    const filteredMovies = !filter ? movies : movies.info.title.filter(movie => movie.includes(filter));
    for (let movie of  filteredMovies) {
        const newLiElement = createNewLiElementForMovie(movie);
        movieList.appendChild(newLiElement);
    }
}

const createNewLiElementForMovie = (movie) => {
    const newLiElement = document.createElement('li');

    if (!('info' in movie)) {
        return;
    }

    if (movie.info.title === undefined) {
        return;
    }

    const {info, ...otherProperties} = movie;
    const {getFormattedTitleLowerCase } = movie;
    const {title: movieTitle} = info;

    let text = movie.getFormattedTitle() + ' - ';
    const lowerCase = getFormattedTitleLowerCase.bind(movie); //future execution
    const lowerCase2 = getFormattedTitleLowerCase.call(movie); // execute now
    const lowerCase3 = getFormattedTitleLowerCase.apply(movie); // execute now; array as addition arguments

    console.log(lowerCase());
    console.log(lowerCase2);
    console.log(lowerCase3);


    for (const key in info) {
        if (key !== 'title' && key !== '_title') {
            text += key + ": " + info[key];
        }
    }

    newLiElement.textContent = text;
    newLiElement.setAttribute("id", movieTitle);

    return newLiElement;
}

const onSearchMovie = () => {
    movieList.innerHTML = '';

    const filter = filterInput.value;
    if (filter === '') {
        return;
    }

    const filteredMovies = movies.filter(p => p.info.title.includes(filter));

    for (let movie of filteredMovies) {
        const newLiElement = createNewLiElementForMovie(movie);

        movieList.appendChild(newLiElement);
    }

    if (filteredMovies.length > 0) {
        movieList.classList.add('visible');
    }
}

const clearInputAddMovie = () => {
    const movieTitle = document.getElementById('title');
    const movieExtraName = document.getElementById('extra-name');
    const movieExtraValue = document.getElementById('extra-value');

    movieTitle.value = '';
    movieExtraName.value = '';
    movieExtraValue.value = '';
}

addMoveBtn.addEventListener('click', addMovieHandler);
searchMoveBtn.addEventListener('click', onSearchMovie)


let person = {
    name: 'Adrian',
    age: 29,
    hobbies: ['Sports', 'Cooking'],
    greet: function () {
        alert('Hi there!');
    },
};
const userChosenKeyName = "level";

person = {
    name: 'Adrian',
    age: 29,
    hobbies: ['Sports', 'Cooking'],
    greet: function () {
        alert('Hi there!');
    },
    "fist name": 'Adrian',
    1.5: 'hello',
    [userChosenKeyName]: '...',

    // isAdmin: true
};

console.log(person.isAdmin) // undefined

person.isAdmin= true;

console.log(person.isAdmin) // ok

person.age = null; // null is value, property exists
person.age = undefined; // works but bad, property not exists
delete person.age; // good

console.log(person);
person["fist name"] = 'Zuza';
console.log(person[1.5]);


const person2 = { name: 'Adrian', hobbies: ['Sleeping', 'Reading']}
const anotherPerson = {...person2}; // copied key values, not only reference; new reference; it's copy
const anotherPerson2 = {...person2, age: 29, hobbies: [...person2.hobbies, 'Model Driven Architecture']}

const person3 = Object.assign({}, person2); // old way


const members = { teamName: "Blue rockets", people: ['Max', 'Manuel'], getTeamMembers() {
        this.people.forEach(p => {
            console.log(p + ' - ' + this.teamName);
        })
    }};
members.getTeamMembers();
