$(document).ready(function () {
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCdDBmOVlxuTvueEby7-e3Dt3Eqe_oyK00",
    authDomain: "train-timetable-2e14e.firebaseapp.com",
    databaseURL: "https://train-timetable-2e14e.firebaseio.com",
    projectId: "train-timetable-2e14e",
    storageBucket: "",
    messagingSenderId: "297005005683"
    };
    firebase.initializeApp(config);

    // shorthand for firebase references
    var database = firebase.database()
    var trains = database.ref('/trains')

    // on page load, grab train schedule from database and update train schedule field on document
    trains.once('value', function (snap) {

    // create array from database train objects to loop through
    var array = Object.values(snap.val())

    // create div for new entry line
    var newEntry = $("<div>")
    newEntry.addClass("row entry-text")

    // loop through array created from database objects, create array of train data to be passed into addLine function
    for (i in array) {
        var data = timeCalc(array[i].name, array[i].dest, array[i].time, array[i].freq)
        // append line to newEntry div
        newEntry.append(addLine(data))
    }

    // append all train data to current trains div
    $("#current-trains").append(newEntry)
    })

    // click listener for submit button
    $('#submitBTN').on('click', function () {
    event.preventDefault()

    // get input data
    var name = $('#train-name').val().trim()
    var dest = $('#train-dest').val().trim()
    var time = $('#train-time').val().trim()
    var freq = $('#train-freq').val().trim()

    // create array of train data to be passed into addLine function (timeCalc returns an array)
    var data = timeCalc(name, dest, time, freq)

    // push train data to firebase
    trains.push({
        name: data[0],
        dest: data[1],
        time: data[2],
        freq: data[3],
        nextArrival: data[4],
        minAway: data[5]
    })

    // create array of train data to be passed into addLine function
    var newEntry = $("<div>")
    newEntry.addClass("row entry-text")
    newEntry.append(addLine(data))

    // append all train data to current trains div
    $("#current-trains").append(newEntry)
    })

    // takes in an array of train data, returns a formatted html string to be appended to current train schedule
    function addLine(array) {
    var temp = ''
    for (var i = 0; i < array.length - 4; i++) {
        var newField = '<div class="col-md-3">' + array[i] + '</div>'
        temp += newField
    }
    // skips initial time in array, does not need to be printed to document
    for (var i = 3; i < array.length; i++) {
        var newField = '<div class="col-md-2">' + array[i] + '</div>'
        temp += newField
    }
    return temp
    }

    // takes in train data to calculate minutes until next arrival time, returns foratted array for addLine function
    function timeCalc(trainName, trainDest, trainTime, trainFreq) {
    var name = trainName
    var dest = trainDest
    var time = trainTime
    var freq = trainFreq

    // Timestamp for train start time
    var firstTime = moment(time, "HH:mm").unix()
    
    // Unix timestamp for present moment
    var now = moment().unix()

    // Time until next train in seconds
    var freqSec = freq * 60
    var secAway = freqSec - Math.ceil((now - firstTime) % freqSec)

    // Convert time until next train to minutes
    var minAway = moment.duration(secAway, 's').asMinutes().toFixed(0)

    // Add seconds until next train to current moment
    var nextInSec = moment().add(secAway, 's')

    // Convert time of next train to 12 hour time
    var nextArrival = moment(nextInSec, 's').format("h:mm A") // convert to time of next train

    return [name, dest, time, freq, nextArrival, minAway]
    }
})