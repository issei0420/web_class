// 初期線分の緯度・軽度
const latlngs = [
    [35, 138],
    [35, 140],
]
// 初期線分
let polyline;
//　イベント登録
window.onload = viewmap;

function viewmap() {
    let map = L.map("mapid");
    map.setView([35.69, 139.695], 8);
    let tileLayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', 
    {
        attribution: "a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
        minZoom: 5, 
        maxZoom: 18,        
    });
    tileLayer.addTo(map);
    // 初期線分の地図上への表示
    polyline = L.polyline(latlngs, {color: 'red'});
    polyline.addTo(map);
    
    // クリック時
    map.on('click', onMapClick);
    // 右クリック時
    map.on('contextmenu', onMapRightClick);
}

function onMapClick(e) {
    polyline.addLatLng(e.latlng);
    let center = polyline.getCenter(e.latlng[-1]);
    // 取得
    const theCenter = document.getElementById('center');

    let new_element = document.createElement('p');
    new_element.id = 'centerValue'
    theCenter.textContent = `中心座標: ${center}`;
    theCenter.appendChild(new_element);
    console.log(new_element);
}

function onMapRightClick(e) {
    let l = polyline.getLatLngs();
    l.pop();
    polyline.setLatLngs(l)
    element = document.getElementById('centerValue');
}



