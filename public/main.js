function page(num) {
    fetch ("/backend/page.json?page=" + num, {headers: {
        'Content-Type': 'application/json',
    }}).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.title == true) {
            document.getElementById('title').innerText = "Created by Andy Z, Noah E, and Wes S"
        }
        else {
            document.getElementById('title').innerText = ""
        }
        document.getElementById("content").innerHTML = data.html
        window.localStorage.setItem('page', num)
        if(num == 0){ document.getElementById("css").href = "home.style.css"; document.getElementById("malimg").src = "favicon.ico"; document.getElementById('upArrowBtn').style.display = "none" } else { document.getElementById("css").href = "style.css"; document.getElementById("malimg").src = ""}
    })
}
switch (window.localStorage.getItem("page")) {
    case "0":
        page(0)
        break;
    case "1":
        page(1)
        break;
    case "2":
        page(2)
        break;
    default:
        page(0)
        break;
}
window.localStorage.setItem("page", 0)