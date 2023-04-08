const body = document.getElementById("clipboard");

const getSiteLink = async () => {
  link = await browser.tabs.query({ active: true, currentWindow: true });
  link = link[0];
};

document.getElementById("clear").addEventListener("onclick", (e) => {
  console.log("what");
  body.innerHTML = "";
})

browser.runtime.onMessage.addListener(getSiteLink);

browser.commands.onCommand.addListener((command) => {
  if (command === "_add_text_to_clippy") {
    clip();
  }
});

//Clipping functionality
const clip = async () => {
  await navigator.clipboard.readText().then(async (clippedText) => {
    if (clippedText != "") {
      let time = await Date.now();

      let div = document.createElement("div");
      div.id = time;
      div.className = "upperDiv";
      body.appendChild(div);

      let quote = document.createElement("button");
      quote.className = "quote";
      quote.setAttribute("real", clippedText);
      clippedText = clippedText.replaceAll("\n", " ");
      console.log(clippedText);
      quote.innerText = clippedText;
      quote.addEventListener("click", copyText);
      div.appendChild(quote);

      let close = document.createElement("button");
      close.className = "close";
      close.innerText = "✖";
      close.addEventListener("click", deleteSelf);
      div.appendChild(close);

      let citedLink = document.createElement("a");
      citedLink.className = "link";
      citedLink.setAttribute("href", link.url);

      let urlImage = document.createElement("img");
      urlImage.src= link.favIconUrl;
      citedLink.appendChild(urlImage);

      div.appendChild(citedLink);
    }
  });
};

const deleteSelf = (self) => {
  self.srcElement.parentElement.remove();
};

const copyText = (self) => {
  navigator.clipboard.writeText(self.srcElement.getAttribute("real"));
};

const copyLink = (self) => {
  navigator.clipboard.writeText(self.srcElement.citedLink.innerText);
}