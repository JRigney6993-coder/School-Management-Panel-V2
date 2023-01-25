document.querySelector(".btn").onclick = function () {  
    let username = document.getElementById("username")
    let password = document.getElementById("password")

    eel.login(username, password)(function(result){     
        console.log(result);                 
        document.getElementById("output").innerHTML = result;
    })
  }