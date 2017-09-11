function confirm_pwd(){
	if (document.getElementById('pwd').value === document.getElementById('pwd2').value){
		document.getElementById('messCheckPwd').style.color= 'green';
		document.getElementById('messCheckPwd').innerHTML='Password matching.';
	}
	else if (document.getElementById('pwd').value != document.getElementById('pwd2').value){
		document.getElementById('messCheckPwd').style.color= 'red';
		document.getElementById('messCheckPwd').innerHTML='Password not matching.';
	}
}

function confirm_id(){
	var email = document.getElementById('fullname').value;
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if ((email === "") || (!filter.test(email))){
		document.getElementById('messCheckPwd').style.color= 'red';
		document.getElementById('messCheckPwd').innerHTML='Username must be regular.';
	}
	else{
		document.getElementById('messCheckPwd').style.color= 'green';
		document.getElementById('messCheckPwd').innerHTML='Username is regular.';
	}
}