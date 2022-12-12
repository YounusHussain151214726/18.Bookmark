const add = document.getElementById("addbookmark");
const modalcontainer = document.getElementById("modal-container");
const modalclose = document.getElementById("modalClose");
const bookmarkClose1 = document.getElementById("bm1cross");
const fasolid = document.getElementsByClassName("fa-solid");
const form = document.getElementById("form");
//modal interaction button
const save = document.getElementById("bmbtn");
const url = document.getElementById("bookmarkurl");
const website = document.getElementById("bookmarkname");
const div = document.createElement("div");
const bookmarkContainer = document.getElementById("bookmark-container");

let bookmarks = [];

function getData(e) {
  e.preventDefault();
  let websites = website.value;
  let urls = url.value;
  if (!urls.includes("http://", "https://")) {
    urls = `https://${urls}`;
  }
  if (!Validate(websites, urls)) {
    return false;
  }

  const bookmark = {
    name: websites,
    url: urls,
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetch();
  form.reset();
  buildInDom();

  // //console.log(modalcontainer.childNodes[1])
  // console.log(modalcontainer.classList.contains("show"))

  if (modalcontainer.classList.contains("show")) {
    modalcontainer.classList.remove("show");
  }
}

function buildInDom() {
  bookmarkContainer.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    let { name, url } = bookmark;
    // div.setAttribute('id',url)
    console.log(name, url);
    let section = document.createElement("div");
    const bookmarkContent = document.createElement("div");

    section.setAttribute("class", "bookmark");
    section.setAttribute("id", url);

    const cross = document.createElement("i");
    const logo = document.createElement("img");
    const anchor = document.createElement("a");

    //cross
    cross.setAttribute("class", "fa-solid fa-xmark");
    cross.setAttribute("id", url);
    cross.setAttribute("onclick", `Remove('${url}')`);

    //bookmarkContent

    bookmarkContent.setAttribute("class", "bookmark-content");

    //logo
    // logo.setAttribute('class',`${url}`);
    logo.src = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
    logo.alt = "broken";

    // // logo.setAttribute("src",`https://s2.googleusercontent.com/s2/favicon?domain=${url}`)
    //anchor
    // logo.src=`${url}`
    console.log(logo);
    anchor.href = `${url}`;
    anchor.innerText = `${name}`;

    bookmarkContent.append(logo, anchor);
    section.append(cross, bookmarkContent);

    //div.appendChild(section)

    bookmarkContainer.appendChild(section);
  });
}

function Remove(url) {
  bookmarks.forEach((arr, i) => {
    if (arr.url === url) {
      bookmarks.splice(i, 1);
    }
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetch();
}

function fetch() {
  //check data is in local storage
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Younus",
        url: "pakistan",
      },
    ];

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildInDom();
}

function Validate(name, url) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!name || !url) {
    alert("Textfield must be filled");
    return false;
  } else if (!url.match(regex)) {
    alert("Please enter valid url");
    return false;
  }

  return true;
}

fetch();

//save data

save.addEventListener("click", getData);

//show modal
add.addEventListener("click", () => {
  modalcontainer.classList.add("show");
});

//remove bookmark

// window.addEventListener('click' ,(e)=>{
// console.log(e)
// })

//close modal
modalclose.addEventListener("click", (e) => {
  modalcontainer.classList.remove("show");
});

//fecth when page loadfetch();

//https://s2.googleusercontent.com/s2/favicon?domain=
