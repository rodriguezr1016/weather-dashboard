//I want to add the previous searches to a list
var searchbtnEl= document.querySelector("#searchbtn");
searchbtnEl.addEventListener("click", function(target){
    createlist();
})
function createlist(){
    var inputValue= document.getElementById('search-input').value;
    var inputEl = document.getElementById("search-input");
    localStorage.setItem('city-name',inputValue);
    var recentSearches= document.getElementById("recent-searches");
    var liEl = document.createElement("li");
    var newButton = document.createElement("button");
    newButton.setAttribute("id", "search-again")
    newButton.addEventListener("click", function(){
        console.log("hello")
    })
    newButton.innerHTML = inputValue;
    liEl.appendChild(newButton);
    recentSearches.appendChild(liEl);
    inputEl.value=""

}