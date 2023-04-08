const body = document.getElementById("clipboard");
let entries = browser.storage.local.get().then( (data) => {
  if (data === null) {
    entries = [];
  } else {
    entries = JSON.stringify(data);
    for (let entry of entries) {
      let div = document.createElement("div");
      div.id = entry.key;
      div.className = "upperDiv";
      body.appendChild(div);

      let quote = document.createElement("button");
      quote.className = "quote";
      quote.setAttribute("real", entry.text);
      let clippedText = entry.text.replaceAll("\n", " ");
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
      citedLink.setAttribute("href", entry.textSource.url);

      let urlImage = document.createElement("img");
      urlImage.src= entry.textSource.favIconUrl;
      citedLink.appendChild(urlImage);
      div.appendChild(citedLink);
    }
  }
})

const getSiteLink = async () => {
  link = await browser.tabs.query({ active: true, currentWindow: true });
  link = link[0];
};

document.getElementById("clear").addEventListener("click", () => {
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
      quote.setAttribute("title", clippedText);
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
  entries.remove(self.id);
  browser.storag.local.set(JSON.parse(entries))
  self.srcElement.parentElement.remove();
};

const copyText = (self) => {
  navigator.clipboard.writeText(self.srcElement.getAttribute("title"));
};

const copyLink = (self) => {
  navigator.clipboard.writeText(self.srcElement.citedLink.innerText);
}