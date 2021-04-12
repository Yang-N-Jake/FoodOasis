var map, marker, lat, lng;
function initMap() {
    //抓當前位置
    navigator.geolocation.watchPosition((position) => {
        console.log(position.coords);
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        // 初始化地圖
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: { lat: lat, lng: lng }
        });
        marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map
        });
    });
}