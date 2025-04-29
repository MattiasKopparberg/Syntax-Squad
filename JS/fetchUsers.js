let allUsers = [];

function fetchUsers() {
  // FETCHUSERS EGEN FUNKTION
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      allUsers = data;
      displayUsers(allUsers);
    })
    .catch((error) => console.error("Error fetching users:", error));
}

fetchUsers();

// NY FUNKTION DISPLAYUSERS

function displayUsers(users) {
  const userContainer = document.querySelector(".user-container");
  userContainer.innerHTML = "";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    userCard.innerHTML = `
        <div class="profile-img-container">
            <img
            class="profile-img"
            src="./images/Ellipse 3.svg"
            alt="user image"
            />
        </div>
        <div class="user-info">
            <h3>${user.username}</h3>
            <p>${user.name}</p>
            <p>${user.email}</p>
            <hr>
        </div>
        <button class="see-more-btn">
            See more <img src="./images/Arrows.svg" alt="arrow" />
        </button>
        <div class="more-info" style="display: none;">
            <p>Address: ${user.address.city}</p>
            <p>Phone number: ${user.phone}</p>
            <p>Workplace: ${user.company.name}</p>
        </div>
        `;

    userContainer.appendChild(userCard);

    // See more
    const userBTN = userCard.querySelector(".see-more-btn");
    const moreInfo = userCard.querySelector(".more-info");

    userBTN.addEventListener("click", (event) => {
      event.stopPropagation();
      moreInfo.style.display =
        moreInfo.style.display === "none" ? "block" : "none";
    });

    // set user card to active - inactive
    userCard.addEventListener("click", () => {
      const allUserCards = document.querySelectorAll(".user-card");
      const profileSection = document.querySelector(".profile-section");
      const isActive = userCard.classList.contains("active");

      // Rensa alla kort
      allUserCards.forEach((card) => {
        card.classList.remove("active", "inactive");
      });

      if (isActive) {
        // Om kortet redan är aktivt: göm profile-section
        profileSection.classList.add("hidden");
      } else {
        // Sätt alla kort till inactive
        allUserCards.forEach((card) => {
          card.classList.add("inactive");
        });

        // Aktivera det klickade kortet
        userCard.classList.add("active");
        userCard.classList.remove("inactive");

        // Visa profile-section när ett kort klickas
        profileSection.classList.remove("hidden");
        loadTodos(user.id);
        displayProfile(user);
      }
    });
  });
}

// Visa profilsida
function displayProfile(user) {
  const profileInfo = document.querySelector(".profile-user-info");
  profileInfo.innerHTML = ""; // Rensa befintlig profilinformation

  profileInfo.innerHTML = `
    <img class="profile-img" src="./images/Ellipse 3.svg" width="150" alt="user image" />
 
    <h3>${user.username}</h3>
    <hr>
    <p class="bold">${user.name}</p>
    <p class="margin bold">${user.email}</p>
    <p>Address: ${user.address.city}</p>
    <p>Phone number: ${user.phone}</p>
    <p>Workplace: ${user.company.name}</p>
    </br>
    <hr class="divider">
  `;

  profileInfo.appendChild(userProfile);
}
