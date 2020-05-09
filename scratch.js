// search a city
// display stuff
// save to local storage
// display from ls

// ^ this happens when: 
// 1. we click the button to search
// 2. we click the list item

function searchCity(cityName){
    // make api call (with cityName)
    // save results in a variable
    var res = "correct results"
    // display stuff
    displayStuff(res)
    // save to ls
    saveToLocalStorage(cityName)
    displayFromLocalStorage()
}

function displayStuff(response){
    //display stuff (with res)
}

function saveToLocalStorage(cityName) {
    // save to ls
}

function displayFromLocalStorage() {
    //
}

// search click listener
$("#searchbtn").on('click', function(e) {
    // get the value
    var value;

    searchCity(value)
})

// list click lister
$("#li").on('click', function(e) {
    // get the value
    var liValue
    searchCity(liValue)
})

