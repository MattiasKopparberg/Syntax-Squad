let allUsers = [];

const workplaces = [
  "Volvo Cars",
  "Spotify",
  "IKEA",
  "Ericsson",
  "H&M",
  "Klarna",
  "Scania",
  "Northvolt",
  "Telia Company",
  "King"
];

function fetchUsers() {
  fetch("https://randomuser.me/api/?results=10")
    .then((response) => response.json())
    .then((data) => {
      allUsers = data.results.map((user, index) => ({
        id: index + 1,
        username: user.login.username,
        name: `${user.name.first} ${user.name.last}`,
        email: `${user.name.first.toLowerCase()}.${user.name.last.toLowerCase()}@gmail.se`,
        address: {
          city: user.location.city
        },
        phone: user.phone,
        picture: user.picture.medium,
        company: {
          name: workplaces[index % workplaces.length]
        }
      }));
      displayUsers(allUsers);
    })
    .catch((error) => console.error("Fel vid hämtning av användare:", error));
}

fetchUsers();

function displayUsers(users) {
  const userContainer = document.querySelector(".user-container");
  userContainer.innerHTML = "";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    userCard.innerHTML = `
      <div class="profile-img-container">
        <img class="profile-img" src="${user.picture}" alt="användarbild" />
      </div>
      <div class="user-info">
        <h3>${user.username}</h3>
        <p>${user.name}</p>
        <p>${user.email}</p>
        <hr>
      </div>
      <button class="see-more-btn">
        Visa mer <img src="./images/Arrows.svg" alt="pil" />
      </button>
      <div class="more-info" style="display: none;">
        <p>Stad: ${user.address.city}</p>
        <p>Telefonnummer: ${user.phone}</p>
        <p>Arbetsplats: ${user.company.name}</p>
      </div>
    `;

    userContainer.appendChild(userCard);

    const userBTN = userCard.querySelector(".see-more-btn");
    const moreInfo = userCard.querySelector(".more-info");

    userBTN.addEventListener("click", (event) => {
      event.stopPropagation();

      const isVisible = moreInfo.style.display === "block";
      moreInfo.style.display = isVisible ? "none" : "block";

      userBTN.innerHTML = `
        ${isVisible ? "Visa mer" : "Visa mindre"} 
        <img src="./images/${isVisible ? "Arrows.svg" : "ArrowUp.svg"}" alt="pil" />
      `;
    });

    userCard.addEventListener("click", () => {
      const allUserCards = document.querySelectorAll(".user-card");
      const profileSection = document.querySelector(".profile-section");
      const isActive = userCard.classList.contains("active");

      allUserCards.forEach((card) => {
        card.classList.remove("active", "inactive");
      });

      if (isActive) {
        profileSection.classList.add("hidden");
      } else {
        allUserCards.forEach((card) => {
          card.classList.add("inactive");
        });

        userCard.classList.add("active");
        userCard.classList.remove("inactive");

        profileSection.classList.remove("hidden");
        loadTodos(user.id);
        displayProfile(user);
      }
    });
  });
}

function displayProfile(user) {
  const profileInfo = document.querySelector(".profile-user-info");
  profileInfo.innerHTML = `
    <img class="profile-img" src="${user.picture}" width="150" alt="användarbild" />
    <h3>${user.username}</h3>
    <hr>
    <p class="bold">${user.name}</p>
    <p class="margin bold">${user.email}</p>
    <p>Stad: ${user.address.city}</p>
    <p>Telefonnummer: ${user.phone}</p>
    <p>Arbetsplats: ${user.company.name}</p>
    <br>
    <hr class="divider">
  `;
}
