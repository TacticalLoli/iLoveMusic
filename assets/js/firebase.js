// Initialize Firebase
var config = {
  apiKey: "AIzaSyAj8lfGwSwsKsfcYLg4o2NoVJO-CJY0zB0",
  authDomain: "bandsintown-175219.firebaseapp.com",
  databaseURL: "https://bandsintown-175219.firebaseio.com",
  projectId: "bandsintown-175219",
  storageBucket: "",
  messagingSenderId: "1081210650945"
};

firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

$(document).ready(function() {

  // // Gets the search input
  $('#searchButton').click(function(e) {
    e.preventDefault();
    var val = $('#search').val().trim();

    // Adds Search to firebase db
    database.ref('searches').push().set({
      date_added: firebase.database.ServerValue.TIMESTAMP,
      search_value: val
    });

  });

  // Gets Last 10 Recent Searches
  database.ref('searches').limitToLast(10).once('value', function(snapshot) {
    snapshot.forEach(function(data) {
      console.log( data.val().search_value + " was added " + moment( data.val().date_added ).format("M/D/YYYY H:mm") );
    });
  });

});


database.ref("searches").limitToLast(10).on("value", function(snapshot) {

  console.log("logging snapshot")
  console.log(snapshot.val());
  var searchArray = [];
    snapshot.forEach(function(data){
      searchArray.push(data.val().search_value);
    })
    console.log("===== search array ======")
    console.log(searchArray)

    var uniqueSearch = searchArray.filter((v, i, a) => a.indexOf(v) === i); 

    console.log("===== unique search array =====") 
    console.log(uniqueSearch)
    $("#recentSearchButtons").empty();
    for (var i = 0 ; i < 5; i++){
      console.log(uniqueSearch[i])
      var recentSearchButton = $("<button>");
      recentSearchButton.attr("data-value", uniqueSearch[i]);
      recentSearchButton.text(uniqueSearch[i]);
      recentSearchButton.addClass("btn btn-info recentSearchButton")
      $("#recentSearchButtons").append(recentSearchButton)
    }
  })