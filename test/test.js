let node_clock;
window.onload = function()
{
	/* sample4 イベントハンドラ設定*/
	let node_menu1 = document.getElementById('menu1');
	node_menu1.onclick = function(event) { sample4(event, document.getElementById('submenu1')) }
	let node_menu2 = document.getElementById('menu2');
	node_menu2.onclick = function(event) { sample4(event, document.getElementById('submenu2')); }
	node_clock = document.getElementById('clock');
	setInterval(function() { put_clock_time(node_clock);}, 1000);
}

// Sample 4
function sample4(event,node)
{
	let rf = /show/;
	if(rf.test(node.className))
	{
		node.className = 'hide';
	}
	else
	{
		node.className = 'show';
	}
}

function put_clock_time(node) {
	node.value = new Date();
}
