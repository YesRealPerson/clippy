const body = document.getElementById("clipboard");

let k = window.localStorage.getItem("keys");
k = JSON.parse(k).data;
if(k != null){
  for (let i = 0; i < k.length; i++) {
    let key = k[i];
    let entry = window.localStorage.getItem(key);
    let clippedText = entry.text;
  
    let div = document.createElement("div");
    div.id = key;
    div.className = "upperDiv";
    body.appendChild(div);
  
    let quote = document.createElement("button");
    quote.className = "quote";
    quote.setAttribute("title", clippedText);
    let temp = clippedText.replaceAll("\n", " ");
    quote.innerText = temp;
    quote.addEventListener("click", copyText);
  
    let greater = document.createElement("div");
    greater.className = "poggers";
  
    let close = document.createElement("button");
    close.className = "close";
    close.innerText = "✖";
    close.addEventListener("click", deleteSelf);
    greater.appendChild(close);
  
    let citedLink = document.createElement("a");
    citedLink.className = "link";
    citedLink.setAttribute("href", entry.url);
  
    let urlImage = document.createElement("img");
    urlImage.src = entry.img;
    citedLink.appendChild(urlImage);
  
    greater.appendChild(citedLink);
    div.appendChild(greater);
    div.appendChild(quote);
  }
}

const getSiteLink = async () => {
  link = await browser.tabs.query({ active: true, currentWindow: true });
  link = link[0];
};

document.getElementById("clear").addEventListener("click", () => {
  console.log(window.localStorage);
  body.innerHTML = "";
  window.localStorage.clear();
});

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
      let temp = clippedText.replaceAll("\n", " ");
      quote.innerText = temp;
      quote.addEventListener("click", copyText);

      let greater = document.createElement("div");
      greater.className = "poggers";

      let close = document.createElement("button");
      close.className = "close";
      close.innerText = "✖";
      close.addEventListener("click", deleteSelf);
      greater.appendChild(close);

      let citedLink = document.createElement("a");
      citedLink.className = "link";
      citedLink.setAttribute("href", link.url);

      let urlImage = document.createElement("img");
      urlImage.src = link.favIconUrl;
      citedLink.appendChild(urlImage);

      greater.appendChild(citedLink);
      div.appendChild(greater);
      div.appendChild(quote);

      window.localStorage.setItem(time, JSON.stringify({ text: clippedText, url: link.url, img: link.favIconUrl }));
      let keys = window.localStorage.getItem("keys");
      if (keys != undefined) {
        let temp = JSON.parse(keys);
        temp = temp.data;
        temp.push(time);
        let keys = {
          data: [
            temp
          ]
        }
        window.localStorage.setItem("keys", JSON.stringify(keys));
      } else {
        temp = {
          data: [
            time
          ]
        }
        window.localStorage.setItem("keys", JSON.stringify(temp));
      }
    }
  });
};

const deleteSelf = (self) => {
  window.localStorage.removeItem(self.id);
  self.srcElement.parentElement.parentElement.remove();
};

const copyText = (self) => {
  navigator.clipboard.writeText(self.srcElement.getAttribute("title"));
};

const copyLink = (self) => {
  navigator.clipboard.writeText(self.srcElement.citedLink.innerText);
};
