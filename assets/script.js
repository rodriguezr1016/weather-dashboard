//I want to add the previous searches to a list
var inputEl= document.getElementById('#search-input').value;
var searchbtnEl= document.querySelector("#search-btn")
searchbtnEl.addEventListener('click', function(event){
    event.preventDefault();
    console.log('hey');
    createlist();
})
function createlist(){
    localStorage.setItem('city-name',inputEl);

}