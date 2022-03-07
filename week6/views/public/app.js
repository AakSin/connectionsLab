window.addEventListener("load", () => {
  const genreInput = document.getElementById("genre-input");
  genreInput.addEventListener("change", (e) => {
    const url = `?genre=${e.target.value}`;
    window.location.href = url;
  });
});
