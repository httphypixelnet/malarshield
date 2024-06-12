function page(num) {
    fetch("/backend/page.json?page=" + num, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.title == true) {
          document.getElementById("title").innerText =
            "Created by Yarden Shavit & Logan Spencer";
        } else {
          document.getElementById("title").innerText = "";
        }
        document.getElementById("content").innerHTML = data.html;
        window.localStorage.setItem("page", num);
        if (num == 0) {
          updateIMG(false);
          document.getElementById("css").innerText = "header {height: 89vh}";
          document.getElementById("malimg").src = "favicon.ico";
          document.getElementById("upArrowBtn").style.display = "none";
        } else {
          document.getElementById("malimg").src = "";
          document.getElementById("css").innerText = "header {height: 15vh}";
          updateIMG(true);
        }
      });
  }
  const updateIMG = (b) => {
    for (let i = 0; i > document.getElementsByTagName("img").length; i++) {
      if (b) {
        document.getElementsByTagName("img").item(i).style.boxShadow = "";
      } else {
        document.getElementsByTagName("img").item(i).style.boxShadow =
          "0px 0px 20px rgba(0, 0, 0, 0.2);";
      }
    }
    return b;
  };
  switch (window.localStorage.getItem("page")) {
    case "0":
      page(0);
      break;
    case "1":
      page(1);
      break;
    case "2":
      page(2);
      break;
    default:
      page(0);
      break;
  }
  window.localStorage.setItem("page", 0);