// SÖKFUNKTION
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", function () {
  const filter = searchInput.value.toLowerCase();

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(filter) ||
      user.username.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter)
  );

  displayUsers(filteredUsers);

