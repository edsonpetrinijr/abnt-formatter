function changeTheme(oldTheme, newTheme) {
  document.querySelector("body").classList.remove(oldTheme);
  document.querySelector("a").classList.remove(oldTheme);
  document.querySelector("input").classList.remove(oldTheme);
  document
    .getElementById("copyTextToClipboardButton")
    .classList.remove(oldTheme);

  document.querySelector("body").classList.add(newTheme);
  document.querySelector("a").classList.add(newTheme);
  document.querySelector("input").classList.add(newTheme);
  document.getElementById("copyTextToClipboardButton").classList.add(newTheme);

  if (oldTheme === "light") {
    document.getElementById("theme").src = "./images/darkMode/sun.svg";
    document.getElementById("copyTextToClipboardIcon").src =
      "./images/darkMode/clipboard.svg";
  } else {
    document.getElementById("theme").src = "./images/lightMode/moon.svg";
    document.getElementById("copyTextToClipboardIcon").src =
      "./images/lightMode/clipboard.svg";
  }
}

document.getElementById("theme").addEventListener("mouseover", () => {
  chrome.storage.local.get(["newTheme"]).then(({ newTheme }) => {
    if (newTheme === "light") {
      document.getElementById("theme").src =
        "./images/lightMode/moonFilled.svg";
    } else {
      document.getElementById("theme").src = "./images/darkMode/sunFilled.svg";
    }
  });
});

document.getElementById("theme").addEventListener("mouseout", () => {
  chrome.storage.local.get(["newTheme"]).then(({ newTheme }) => {
    if (newTheme === "light") {
      document.getElementById("theme").src = "./images/lightMode/moon.svg";
    } else {
      document.getElementById("theme").src = "./images/darkMode/sun.svg";
    }
  });
});

// Theme
document.getElementById("theme").addEventListener("click", () => {
  const oldTheme = document.querySelector("body").classList.contains("light")
    ? "light"
    : "dark";

  const newTheme = document.querySelector("body").classList.contains("light")
    ? "dark"
    : "light";

  chrome.storage.local.set({ newTheme: newTheme, oldTheme: oldTheme });

  changeTheme(oldTheme, newTheme);
});

// Website Owner Name
document
  .getElementById("websiteOwnerNameInput")
  .addEventListener("input", () => {
    const websiteOwnerName = document.getElementById(
      "websiteOwnerNameInput"
    ).value;

    chrome.storage.local.set({ websiteOwnerName: websiteOwnerName });

    document.getElementById("websiteOwnerName").innerHTML = websiteOwnerName;

    if (websiteOwnerName === "") {
      document.getElementById("websiteOwnerName").innerHTML = "PROPRIETÁRIO";
    }
  });

// Website Link
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  const url = tabs[0].url;

  document.getElementById("websiteLink").innerHTML = url;
  document.getElementById("websiteLink").href = url;
});

// Date
const today = new Date();

const year = today.getFullYear();
const month = today.toLocaleString("pt-br", { month: "long" });
const day = today.getDate();

const formattedDate = String(`${day} de ${month} de ${year}`);
document.getElementById("dateOfAccessOnTheWebsite").innerHTML = formattedDate;

// Copy
async function copyTextToClipboard(textToCopy) {
  const element = document.createElement("textarea");
  element.value = textToCopy;

  document.body.appendChild(element);

  element.select();
  document.execCommand("copy");

  document.body.removeChild(element);
}

window.onload = () => {
  chrome.storage.local
    .get(["oldTheme", "newTheme"])
    .then(({ oldTheme, newTheme }) => {
      changeTheme(oldTheme, newTheme);
    });

  chrome.storage.local.get(["title"]).then(({ title }) => {
    document.getElementById("title").innerHTML = title ? title : "TÍTULO";
  });

  chrome.storage.local.get(["author"]).then(({ author }) => {
    document.getElementById("author").innerHTML = author ? author : "AUTOR";
  });

  chrome.storage.local
    .get(["websiteOwnerName"])
    .then(({ websiteOwnerName }) => {
      document.getElementById("websiteOwnerNameInput").value = websiteOwnerName
        ? websiteOwnerName
        : "";

      document.getElementById("websiteOwnerName").innerHTML = websiteOwnerName
        ? websiteOwnerName
        : "PROPRIETÁRIO";
    });

  document
    .getElementById("copyTextToClipboardButton")
    .addEventListener("click", () =>
      copyTextToClipboard(
        document.getElementById("formattedReference").innerText
      )
    );
};
