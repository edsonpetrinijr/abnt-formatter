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
