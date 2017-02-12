function urlParamsHandler(o) {
	var arr = [];
	for(var key in o) {//key=value
		arr.push(encodeURIComponent(key)+"="+encodeURIComponent(o[key]));
	}
	return arr.join("&");
}


function ajax(o) {
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	// if(!o.method) {
	// 	o.method = "get";
	// }
	o.method = o.method || "get";
	// if(!((typeof o.isAsync) == "boolean")) {
	// 	o.isAsync = true;
	// }
	o.isAsync = (typeof o.isAsync) == "boolean"? o.isAsync : true;
	if(o.method.toLowerCase()=="get") {
		if(o.data) {
			o.url += "?t="+new Date().getTime()+"&"+urlParamsHandler(o.data);
		} else {
			o.url += "?t="+new Date().getTime();
		}
		xhr.open("get", o.url, o.isAsync);
		xhr.send();
	} else if(o.method.toLowerCase()=="post") {
		xhr.open("post", o.url, o.isAsync);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(urlParamsHandler(o.data));
	}

	xhr.onreadystatechange = function() {
		if(xhr.readyState==4) {
			if(xhr.status==200) {
				// if(o.success) {
				// 	o.success(xhr.responseText);
				// }
				o.success && o.success(xhr.responseText);
			} else {
				// if(o.error) {
				// 	o.error(xhr.responseText);
				// }
				o.error && o.error(xhr.responseText);
			}
		}
	}
}

// GET请求
function get(url, data, fn) {
	ajax({
		"url" : url,
		"method" : "get",
		"data" : data,
		"success" : fn
	});
}

// POST 请求
function post(url, data, fn) {
	ajax({
		"url" : url,
		"method" : "post",
		"data" : data,
		"success" : fn
	});
}
