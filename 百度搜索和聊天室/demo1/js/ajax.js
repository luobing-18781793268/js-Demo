function ajax(url,fnsucc,fnFaild){
if(window.XMLHttpRequest){
	var xhr=new XMLHttpRequest();
}else{
	var xhr=new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.open("get",url,true);
xhr.send();
xhr.onreadystatechange=function(){
	if(xhr.readyState==4){
		if(xhr.status==200){
			fnsucc(xhr.responseText);
							
		}else{
			if(xhr.fnFaild){
			fnFaild(xhr.stauts);
			}
		}
	}
}
}
//ajax obj 
//{
//	method: "get",
//	url: ,
//	isAsync: true,
//	data: {"username": "zhangsan", "pwd":123},
//	success: function() {},
//	error: function() {}
//}
