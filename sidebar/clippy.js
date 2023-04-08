const body = document.body;

browser.commands.onCommand.addListener((command) => {
  if (command === "_add_text_to_clippy") {
    clip()
  }
});

//Clipping functionality
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
  quote.innerText = clippedText;
  div.appendChild(quote);

  let close = document.createElement("button");
  close.className = "close";
  close.innerHTML = "X";
  close.onclick = `deleteSelf("${time}")`;
  div.appendChild(close);
} );
}

const deleteSelf = async (id) => {
  console.log(id);
}