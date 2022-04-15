let socket = io(); // opens and connect to socket


//listen for confirmation
socket.on("connect", () => {
  console.log("connected");
});


socket.on("redirect", (roomNumber) => {
  let url = window.location.href;

  window.location.href = url + roomNumber;
});

window.addEventListener("load", () => {
  const joinForm = document.querySelector("#join-form");
  const joinButton = document.querySelector("#join");
  joinButton.addEventListener("click", () => {
    let url = window.location.href;

    window.location.href = url + joinForm.value;
  });
  const createButton = document.querySelector("#create");
  createButton.addEventListener("click", () => {
    const visuals = document.querySelector(
      'input[name="visuals"]:checked'
    ).value;
    const audio = document.querySelector('input[name="audio"]:checked').value;
    socket.emit("createRoom", { visuals, audio });
  });
});
