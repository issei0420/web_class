// 初期設定

// 初期線分の緯度・軽度
const latlngs = [
    [35, 138],
    [35, 140],
]
// 初期線分
let polyline;

// イベント呼び出し要素を保持する変数の宣言
let node_clock, node_etime;

// タイマーの開始時刻を、現在に設定
let start = new Date();
let prev = start.getSeconds();

let i = 0;
let tid;
let _e = 20 //開始時刻

//　イベント登録
window.addEventListener('load', viewmap);
window.addEventListener('load', setTimer);

function setTimer() {
    let node_sample1 = document.getElementById('sample1')
    node_sample1.onclick = sample1;

    // 時計　clock　のデータ書き換えハンドラの登録
    node_clock = document.getElementById('clock');
	setInterval(function() { put_clock_time(node_clock);}, 1000);
    
	// タイマー etime のデータ書き換えハンドラの登録
	node_etime = document.getElementById('etime');
	node_etime.style.fontSize = '8em';
	put_time(node_etime);
    tid = setInterval('put_time(node_etime)', 1000);

	// タイマーのrestartボタン押下時ハンドラの登録
	document.getElementById('restart').onclick = function() { 
        start = new Date(); 
        i = 0;
        tid = setInterval('put_time(node_etime)', 1000);
    }
}

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

// Sample 1
function sample1(event)
{
    window.alert('Hello, world!');
}

function put_clock_time(node) {
	node.value = new Date();
}

// etime用に定期的に呼び出されるイベントハンドラ
// 経過時間を計算して、文字列として構築する
function put_time(node)
{
	let curr = new Date();			// 現在時刻オブジェクトを取得し、curr変数で参照
	let s = curr.getSeconds();	// 変数 sにcurrの 秒(0～59)を代入
	if (s == prev) return;			// sの数値がprevと同じなら何も処理せず戻る
	prev = s;										// prevをsに更新（代入）

	// 現在時刻currと開始時刻startの差を計算し（単位はミリ秒）、
	// 秒単位に変換するため、1000で割り、整数部分のみを取り出す
	let e = Math.floor((curr - start) / 1000);	// eは経過秒数

	let ss = e % 60;						// ssにeの分未満の部分を取り出す
	e = Math.floor(e/60);				// eを分単位（整数）に変換
	let mm = e % 60;						// mm にeの時間未満の部分を取り出す
	e = Math.floor(e/60);				// eを時間単位（整数）に変換
	let hh = e;									// hh にe（時間部分）を設定

    // 残り時間を計算
    let r_ss = _e - ss
    

	let em_s = em_e = '';
	if (r_ss <= 10)
	{
		em_s = '<em>';
		em_e = '</em>';
		node.style.color = '#CC0000';
	}
	else
	{
		node.style.color = '#000000';
	}
	// hh:mm:ss 形式でnode内のHTMLを書き換え
	node.innerHTML = em_s+two_digit(hh)+':'+two_digit(mm)+':'+two_digit(r_ss)+em_e;
    i += 1
    console.log(i)
    if (i >= _e) {
        clearInterval(tid)
    }
}

// 数値が1桁（0～9）なら、頭に'0'を付け足した文字列を返す関数
function two_digit(d)
{
	if (d < _e) return '0'+d;
	return d;
}



