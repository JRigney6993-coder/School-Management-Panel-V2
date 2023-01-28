// Gets side bar html data from file and adds it to the current page
fetch("sidebar/sidebar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("sidebar").innerHTML = data;
    });