window.addEventListener("load", () => {
  async function populateData(filePath, userNumber) {
    let response = await fetch(filePath);
    response = response.json();

    response.then((data) => {
      for (let i = 0; i < data.items.length; i++) {
        // create elements
        const userDiv = document.getElementById(userNumber);
        const listItem = document.createElement("li");
        const name = document.createElement("p");
        const image = document.createElement("img");
        const imageArray = data.items[i].images;

        // add data to elements
        name.textContent = data.items[i].name;
        image.src = imageArray[imageArray.length - 1].url;

        // append elements
        userDiv.appendChild(listItem);
        listItem.appendChild(name);
        listItem.appendChild(image);
      }
    });
  }

  populateData("user1.json", "user1");
  populateData("user2.json", "user2");
});
