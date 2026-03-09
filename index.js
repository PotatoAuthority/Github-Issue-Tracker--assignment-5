const login = ()=>{
    const username = document.getElementById('userID').value;
    const password = document.getElementById('pass').value;
    console.log(username);
    console.log(password);

    if(username === 'admin' && password === 'admin123'){
        window.location.assign('./GitIssue.html');
    }
    else if(username === '' || password === ''){
        alert('Please enter username and password');
    }
    else{
            alert('Wrong username or password');
        }
    
}