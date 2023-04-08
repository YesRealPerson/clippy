const body = document.body;
// let c = false;
// let ctrl = false;
// let link;
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Control") {
//     ctrl = true;
//   }
//   if (e.key === "c") {
//     c = true;
//   }
//   console.log(ctrl);
//   console.log(c);
//   if (ctrl && c) {
//     getSiteLink();
//   }
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === "Control") {
//     ctrl = false;
//   }
//   if (e.key === "c") {
//     c = false;
//   }
// });

// const getSiteLink = async () => {
//   link = await browser.tabs.query({ active: true, currentWindow: true });
//   console.log(link);
// };

browser.runtime.onMessage.addListener(console.log("what"));

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
      document.body.appendChild(div);

      let quote = document.createElement("button");
      quote.className = "quote";
      quote.setAttribute("real", clippedText);
      clippedText = clippedText.replace("\n", " ");
      quote.innerText = clippedText;
      quote.addEventListener("click", copyText);
      div.appendChild(quote);

      let close = document.createElement("button");
      close.className = "close";
      close.innerText = "✖";
      close.addEventListener("click", deleteSelf);
      div.appendChild(close);

      // let citedLink = document.createElement("button");
      // citedLink.className = "link";
      // console.log(link);
      // citedLink.innerText = link;
      // citedLink.addEventListener("click", copyLink);
      // div.appendChild(citedLink);
    }
  });
};

const deleteSelf = (self) => {
  self.srcElement.parentElement.remove();
};

const copyText = (self) => {
  navigator.clipboard.writeText(self.srcElement.getAttribute("real"));
};

// const copyLink = (self) => {
//   navigator.clipboard.writeText(self.srcElement.citedLink.innerText);
// }