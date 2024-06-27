const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("modal-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmark-container");

let bookmarks = {};

// Regex expression || Validate Form
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) return alert("Please fill both fields!!");
  if (!urlValue.match(regex)) return alert("Please provide a valid web address!");
  return true;
}

// Generation Bookmarks
function generateBookmarks() {
  bookmarkContainer.textContent = "";

  console.log("generate working");
  console.log(bookmarks);
  Object.keys(bookmarks).forEach((key) => {
    const { name, url } = bookmarks[key];
    // Creating html element
    // 1) item
    const item = document.createElement("div");
    item.classList.add("item");
    // 2) delete bookmark icon
    const i = document.createElement("i");
    i.classList.add("fa", "fa-times");
    i.setAttribute("title", "delete bookmark");
    i.setAttribute("onclick", `deleteBookmark("${url}")`);
    // bookmart linkinfo
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // 3) img
    const img = document.createElement("img");
    img.setAttribute("src", `https://www.google.com/s2/u/0/favicons?domain=${url}`);
    img.setAttribute("alt", `${name}`);
    // 4) a
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.textContent = name;

    // Append bookmark
    linkInfo.append(img, a);
    item.append(i, linkInfo);
    bookmarkContainer.appendChild(item);
  });
}

// Delete Bookmark
function deleteBookmark(id) {
  if (bookmarks[id]) {
    delete bookmarks[id];
  }

  // Setting bookmark to localstorage again
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Show modal & focul on input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modal.addEventListener("click", (e) => (e.target == modal ? modal.classList.remove("show-modal") : ""));
document.addEventListener("keydown", (e) => (e.key === "Escape" ? modal.classList.remove("show-modal") : ""));
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"));

// Fetch bookmarks from localstorage
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  else {
    bookmarks = {
      "https://ashok.cloudaccess.host": { name: "ashok", url: "https://ashok.cloudaccess.host" },
      "https://ashoka2003.netlify.app/": { name: "ashok2", url: "https://ashoka2003.netlify.app/" },
    };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  generateBookmarks();
}

// Handle form data
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) return false;
  bookmarks[urlValue] = { name: nameValue, url: urlValue };
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Modal Event Listeners
bookmarkForm.addEventListener("submit", storeBookmark);

//  On Load
fetchBookmarks();
