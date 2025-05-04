// ============ USERS ============//

let allUsers = [];

// Hämta användardata
async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    allUsers = data;

    // Vänta på profilbilder
    await fetchProfileImages();

    // Tilldela prfofilbilder till användare
    allUsers.forEach((user, index) => {
      user.profileImage = profileImages[index];
    });

    // Visa användarna
    displayUsers(allUsers);
  } catch (error) {
    console.error("Error fetching users or images:", error);
  }
}

(async () => {
  await fetchUsers();
  await getPostsWithComments();
})();

// ============ PROFILE IMAGES ============//

let profileImages = [];

async function fetchProfileImages() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();
    profileImages = data.results.map((user) => user.picture.large);
  } catch (error) {
    console.error("Fel vid hämtning av av profilbilder:", error);
    return [];
  }
}

// ============ DISPLAY USERS  ============//

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
          src="${user.profileImage}" width="80"
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

    // See more / See less-knapp
    const userBTN = userCard.querySelector(".see-more-btn");
    const moreInfo = userCard.querySelector(".more-info");

    userBTN.addEventListener("click", (event) => {
      event.stopPropagation();

      const isVisible = moreInfo.style.display === "block";
      moreInfo.style.display = isVisible ? "none" : "block";

      userBTN.innerHTML = `
        ${isVisible ? "See more" : "See less"} 
        <img src="./images/${
          isVisible ? "Arrows.svg" : "ArrowsUp.svg"
        }" alt="arrow" />
      `;
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

        // Ta bort filtreraring på inlägg
        const postElements = document.querySelectorAll(".post");
        postElements.forEach((postDiv) => {
          postDiv.style.display = "block";
        });
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
        filterPosts(user.id);
      }
    });
  });
}

// ============ PROFIL SIDA ============//

// Visa profilsida
function displayProfile(user) {
  const profileInfo = document.querySelector(".profile-user-info");
  profileInfo.innerHTML = ""; // Rensa befintlig profilinformation

  profileInfo.innerHTML = `
    <img class="profile-img" src="${user.profileImage}" width="150" alt="user image" />
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
}

// ================ POSTS ================//

let allPosts = [];

//Hämta inlägg och kommentarer
async function getPostsWithComments() {
  try {
    const [postsData, commentsData] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
        res.json()
      ),
    ]);

    // Koppla kommentarer till inlägg baserat på postId
    allPosts = postsData.map((post) => {
      post.comments = commentsData.filter(
        (comment) => comment.postId === post.id
      );
      return post;
    });

    createPostElements(allUsers); // Skapa och visa inläggen och kommentarerna
  } catch (error) {
    console.error("Fel vid hämtning av inlägg eller kommentarer:", error);
  }
}

// Skapa alla inlägg och spara referenser i postElements
function createPostElements(allUsers) {
  const postsContainer = document.querySelector(".post-container");
  postsContainer.innerHTML = ""; // Rensa inlägg vid start

  allPosts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.dataset.userId = post.userId; // Sätt data-attribute för användarens ID

    const user = allUsers.find((user) => user.id === post.userId);
    if (!user) {
      console.warn(`Ingen användare hittad för post.userId: ${post.userId}`);
      return;
    }

    // Begränsa till 3 kommentarer
    const limitedComments = post.comments.slice(0, 3);

    postDiv.innerHTML = `

    <!-- Användar bild och username-->
      <div class="post-user">
        <img src="${user.profileImage}" alt="profile img" width="40"/>
        <h3>${user.username}</h3>
      </div>
        
      <div class="post-content">
        <!-- Post.title-->
        <h4>${post.title}</h4>
        <br>
        <!-- Post.body-->
        <p>${post.body}</p>
        <hr />

        <!-- Read comment button -->
          <button class="read-comments"> 
          Read comments 
          <img src="./images/Arrows.svg" alt="arrow" />
          </button>
      </div>

      <!-- COMMENTS -->
      <div class="comments-container" style="display: none;">
        ${limitedComments
          .map(
            (comment) => `
          <div class="comment">
            <div class="comment-user">
              <img src="./images/chat.svg" alt="comment bubble" />
              <h4>${comment.email}</h4>
            </div>
            <div class="comment-body">
              <p>${comment.body}</p>
            </div>
            <hr />
          </div>
      `
          )
          .join("")}
    </div>
  `;

    postsContainer.appendChild(postDiv);

    // visa/dölja kommentarer
    const readCommentsBtn = postDiv.querySelector(".read-comments");
    const commentsContainer = postDiv.querySelector(".comments-container");

    readCommentsBtn.addEventListener("click", () => {
      const isVisible = commentsContainer.style.display === "block";
      commentsContainer.style.display = isVisible ? "none" : "block";
      readCommentsBtn.innerHTML = `
        ${isVisible ? "Read comments" : "Close Comments"} 
        <img src="./images/${
          isVisible ? "Arrows.svg" : "ArrowsUp.svg"
        }" alt="arrow" />
      `;
    });
  });
}

// Funktion för att visa inlägg för en specifik användare
function filterPosts(userId) {
  const postElements = document.querySelectorAll(".post"); // hämta alla inlägg från DOM
  postElements.forEach((postDiv) => {
    if (postDiv.dataset.userId == userId) {
      postDiv.style.display = "block";
    } else {
      postDiv.style.display = "none";
    }
  });
}