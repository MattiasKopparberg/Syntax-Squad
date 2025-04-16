function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      const userList = document.querySelector(".user-container");

      userList.innerHTML = "";

      data.forEach((user) => {
        const userDiv = document.createElement("article");
        userDiv.classList.add("user-card");

        userDiv.innerHTML = `
            <div class="user-card">
            <!-- Profilbild ( Hämtas via API )  -->
            <!-- Bilal -->
            <div class="profile-img-container">
            <!-- Element att skapa med JS : "img"  profile.img-->
            <img
                class="profile-img"
                src="./images/Ellipse 3.svg"
                alt="user image"
            />
            </div>

            <!-- Mattias -->
            <!-- User info ( Hämtas via API )  -->
            <div class="user-info">
            <h3>${user.username}</h3>
            <p>${user.name}</p>
            <p>${user.email}</p>
            <button class="see-more-btn">
                See more <img src="./images/Arrows.svg" alt="arrow" />
            </button>
            <div class="more-info" style="display: none;">
                <p>${user.address.city}</p>
                <p>${user.phone}</p>
                <p>${user.company.name}</p>
            </div>
        `;

        const btn = userDiv.querySelector(".see-more-btn");
        const moreInfo = userDiv.querySelector(".more-info");
        btn.addEventListener("click", () => {
          moreInfo.style.display =
            moreInfo.style.display === "none" ? "block" : "none";
        });

        userList.appendChild(userDiv);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
}

fetchUsers();
