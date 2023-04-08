const body = document.body;
let link = "";

browser.commands.onCommand.addListener((command) => {
  if (command === "_add_text_to_clippy") {
    clip()
  }
});

//Clipping functionality
const getSiteLink = async () => {
  link = await browser.tabs.query({active: true, currentWindow: true});
}

const clip = async () => {
await navigator.clipboard.readText()
.then( async (clippedText) => {
  let time = await Date.now();

  let div = document.createElement("div");
  div.id = time;
  div.className = "upperDiv";
  document.body.appendChild(div);

  let quote = document.createElement("button");
  quote.className = "quote";
  quote.setAttribute("real",clippedText)
  clippedText = clippedText.replace("\n"," ");
  quote.innerText = clippedText;
  quote.addEventListener("click",copyText);
  div.appendChild(quote);

  let close = document.createElement("button");
  close.className = "close";
  close.innerHTML = "x";
  close.addEventListener("click",deleteSelf);
  div.appendChild(close);

  console.log(browser.tabs)
} );
}

const deleteSelf = (self) => {
  self.srcElement.parentElement.remove();
}

const copyText = (self) => {
  navigator.clipboard.writeText(self.srcElement.getAttribute("real"));
}