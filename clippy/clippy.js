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
const clip = () => {
  navigator.clipboard.readText()
  .then( (clippedText) => {console.log("is this what you currently have clipped?:" + clippedText)} );
}