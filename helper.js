function $(id) {
	return document.getElementById(id);
}

function $s(id, text) {
	$(id).innerText = text;
}

function $h(id, html) {
	$(id).innerHTML = html;
}

function d(num) {
	return Math.floor(Math.random() * num) + 1;
}

function dd(time, num) {
	var result = d(num);
	while (time-- > 1) {
		result += d(num);
	}
	return result;
}

function n(num) {
	var result = d(num);
	if (result == num) {
		result += n(num);
	}
	return result;
}

function nd(time, num) {
	var result = n(num);
	while (time-- > 1) {
		result += n(num);
	}
	return result;
}
