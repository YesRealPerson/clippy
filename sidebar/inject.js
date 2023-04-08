let c = false;
let ctrl = false;
document.addEventListener("keydown", (e) => {
  if (e.key === "Control") {
    ctrl = true;
  }
  if (e.key === "c") {
    c = true;
  }
  console.log(ctrl);
  console.log(c);
  if (ctrl && c) {
    browser.runtime.sendMessage("Clippy", "what").then((result) => {
        console.log("wyhatsijgrosd");
    }).catch((err) => {
        console.log(err);
    });
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Control") {
    ctrl = false;
  }
  if (e.key === "c") {
    c = false;
  }
});