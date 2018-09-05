var map;
function initMap() {
    console.log("THIS IS WORKING")
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.179071, lng: -117.112237 },
        zoom: 11
    })
}