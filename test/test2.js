window.onload = function()
{
	/* sample1 イベントハンドラ設定 */
	let node_sample1 = document.getElementById('sample1');
	node_sample1.onclick = sample1;
}

// Sample 1
function sample1(event)
{
	alert('Hello, world!');
}