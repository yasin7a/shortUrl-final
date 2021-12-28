var items = JSON.parse(localStorage.getItem("link-list")) || [];
var itemsList = document.querySelector("#list-items");
function addItem() {
  var inputBox = document.querySelector("#copyTech");
  var item = inputBox.value;

  if (item === "") return alert("field is empty can't save");

  items.push({
    value: item,
    time: new Date().toLocaleDateString("en-US"),
  });

  localStorage.setItem("link-list", JSON.stringify(items));

  listItems();

  inputBox.value = "";
}

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("link-list", JSON.stringify(items));
  listItems();
}

function markAsDone(index) {
  items[index].done = !items[index].done;
  localStorage.setItem("link-list", JSON.stringify(items));
  listItems();
}

// function that generates list of items and populates the html
function listItems() {
  var list = "";

  for (var i = 0; i < items.length; i++) {
    list += `<li  class=${items[i].done ? "done" : ""}>
   
           <p> ${items[i].value}</p>
            <small class='label' onclick='markAsDone(${i})'>
             ${items[i].time}
            </small> 
            <span class='label alert' onclick='deleteItem(${i})'>
            delete
            </span>
            
            <span class='label alert cpbtn' data-clipboard-text="${
              items[i].value
            }">
            copy
            </span>
            </li>`;
  }

  itemsList.innerHTML = list;
  new ClipboardJS(".cpbtn");

  // length check and show
  function linkLength() {
    let length = itemsList.children.length;
    itemsList.parentElement.setAttribute("data-list-length", length);
  }
  linkLength();
}

let saveBtn = document.querySelector("#saveBtn");

saveBtn.addEventListener("click", function () {
  if (copyTech.value.length > 0) {
    // clipboard js
    this.textContent = "saved";
    this.style.color = "#08c18d";
    setTimeout(() => {
      this.textContent = "save";
      this.style.color = "#fff";
    }, 5000);
  }
});

// save data to localStorage
saveBtn.addEventListener("click", addItem);
// function to run when page loads
(function () {
  listItems();
})();

// console.log(localStorage.clear());
