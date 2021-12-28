// close text
let closeBtn = document.querySelector(".closeBtn");
let closeInp = document.querySelector(".closeInp");
function closeUp() {
  if (closeInp.value.length > 0) {
    closeBtn.style.display = "block";
  } else {
    closeBtn.style.display = "none";
  }
 
}
closeUp();
closeInp.addEventListener("input", closeUp);
closeBtn.addEventListener("click", function () {
  closeInp.value = "";
  this.style.display = "none";
});

// copy text
let copyBtn = document.querySelector("#copyBtn");
let copyTech = document.querySelector("#copyTech");
copyBtn.addEventListener("click", function () {
  if (copyTech.value === "") return alert("field is empty can't copy");

  if (copyTech.value.length > 0) {
    // clipboard js
    new ClipboardJS(".copyController button");
    this.textContent = "copied";
    this.style.color = "#08c18d";
    setTimeout(() => {
      this.textContent = "copy";
      this.style.color = "#fff";
    }, 5000);
  }
});
