browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
    myWindowId = windowInfo.id;
  });

  browser.commands.onCommand.addListener((command) => {
    if (command === "_add_text_to_clippy") {
      clip()
      .then(console.log("Command is running 👍"))
    }
  });

  //Clipping functionality
const clip = async () => {
  await navigator.clipboard.readText()
  .then( async (clippedText) => {
    let time = await new Date();
    let div = document.createElement("div");
    div.id = await Date.now();
    div.className = "upperDiv"
    document.body.appendChild(div)
    let quote = document.createElement("button")
    quote.className = "quote"
    quote.innerText = clippedText;
    div.appendChild(quote);
    let close = document.createElement("button")
    close.className = "close"
    close.innerHTML = "X";
    div.appendChild(close);
  } );
}