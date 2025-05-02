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
}

// ---------------------------------------- //
// ------------------ POSTS -----------------//

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

  console.log(allPosts);

  allPosts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.dataset.userId = post.userId; // Sätt data-attribute för användarens ID

    const user = allUsers.find((user) => user.id === post.userId);

    // Begränsa till 3 kommentarer
    const limitedComments = post.comments.slice(0, 3);

    postDiv.innerHTML = `

    <!-- Användar bild och username-->
      <div class="post-user">
        <img src="./images/Ellipse 3.svg" alt="profile img" width="40"/>
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

getPostsWithComments();
