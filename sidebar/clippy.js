const { CLIENT_RENEG_WINDOW } = require("tls");

const body = document.body;
let link = "";

browser.commands.onCommand.addListener(async (command) => {
  if (command === "_add_text_to_clippy") {
    await clip()
  }
});

//Clipping functionality
const getSiteLink = async () => {
  link = await browser.tabs.query({active: true, currentWindow: true}).url;
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
  close.innerText = "x";
  close.addEventListener("click",deleteSelf);
  div.appendChild(close);

  let citedLink = document.createElement("button");
  citedLink.className = "link";
  citedLink.innerText = link;
  citedLink.addEventListener("click",copyLink);
  div.appendChild(citedLink);

  console.log(browser.tabs)
} );
}

const deleteSelf = (self) => {
  self.srcElement.parentElement.remove();
}

const copyText = (self) => {
  navigator.clipboard.writeText(self.srcElement.getAttribute("real"));
}

const copyLink = (self) => {
  navigator.clipboard.writeText(self.srcElement.citedLink.innerText);
}