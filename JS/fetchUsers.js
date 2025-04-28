let allUsers = [];

function fetchUsers() { // FETCHUSERS EGEN FUNKTION
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
        allUsers = data;
        displayUsers(allUsers);
    })
    .catch((error) => console.error("Error fetching users:", error));
}

function displayUsers(users) { // NY FUNKTION DISPLAYUSERS
    const userList = document.querySelector(".user-container");
    userList.innerHTML = "";

    users.forEach((user) => {
        const userDiv = document.createElement("article");
        userDiv.classList.add("user-card");
        userDiv.innerHTML = `
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
    
        userList.appendChild(userDiv);
    
        const userBTN = userDiv.querySelector(".see-more-btn");
        const profileImg = userDiv.querySelector(".profile-img-container");
        const moreInfo = userDiv.querySelector(".more-info");
    
        userBTN.addEventListener("click", (event) => {
        event.stopPropagation();
        moreInfo.style.display = 
        moreInfo.style.display === "none" ? "block" : "none";
        });
    
        userDiv.addEventListener("click", () => {
        const allUserCards = document.querySelectorAll(".user-card");
        const isActive = userDiv.classList.contains("active");
    
        if (isActive) {
            allUserCards.forEach((card) => {
            card.classList.remove("active", "inactive");
            card.querySelector(".profile-img-container").classList.remove("active", "inactive");
            card.querySelector(".see-more-btn").classList.remove("active", "inactive");
            });
        } else {
            allUserCards.forEach((card) => {
            card.classList.remove("active");
            card.classList.add("inactive");
    
            card.querySelector(".profile-img-container").classList.remove("active");
            card.querySelector(".profile-img-container").classList.add("inactive");
    
            card.querySelector(".see-more-btn").classList.remove("active");
            card.querySelector(".see-more-btn").classList.add("inactive");
            });
    
            userDiv.classList.add("active");
            userDiv.classList.remove("inactive");
    
            profileImg.classList.add("active");
            profileImg.classList.remove("inactive");
    
            userBTN.classList.add("active");
            userBTN.classList.remove("inactive");
        }
        });
    });
    }    

// SÖKFUNKTION
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
const filter = searchInput.value.toLowerCase();

const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(filter) ||
    user.username.toLowerCase().includes(filter) ||
    user.email.toLowerCase().includes(filter)
);

displayUsers(filteredUsers);
});

fetchUsers();
