chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "setTitle",
    title: "Definir como título",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "setAuthor",
    title: "Definir como autor",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "setTitle") {
    chrome.storage.local.set({ title: info.selectionText });
  } else if (info.menuItemId === "setAuthor") {
    const splitName = info.selectionText.split(" ");

    const formattedName = `${splitName[
      splitName.length - 1
    ].toUpperCase()}, ${splitName.slice(0, splitName.length - 1).join(" ")}`;

    chrome.storage.local.set({ author: formattedName });
  }
});
