let allUsers = [];

const userImages = [
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/men/81.jpg",
  "https://randomuser.me/api/portraits/women/7.jpg",
  "https://randomuser.me/api/portraits/men/89.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/63.jpg",
  "https://randomuser.me/api/portraits/men/48.jpg",
  "https://randomuser.me/api/portraits/women/49.jpg"
];

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      allUsers = data;
      displayUsers(allUsers);
    })
    .catch((error) => console.error("Error fetching users:", error));
}

fetchUsers();

function displayUsers(users) {
  const userContainer = document.querySelector(".user-container");
  userContainer.innerHTML = "";

  users.forEach((user, index) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    const userImage = userImages[index] || "./images/Ellipse 3.svg";

    userCard.innerHTML = `
      <div class="profile-img-container">
        <img
          class="profile-img"
          src="${userImage}"
          alt="user image"
          width="75"
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
        displayProfile(user, index);
      }
    });
  });
}

function displayProfile(user, index) {
  const profileInfo = document.querySelector(".profile-user-info");
  profileInfo.innerHTML = "";

  const userImage = userImages[index] || "./images/Ellipse 3.svg";

  profileInfo.innerHTML = `
    <img class="profile-img" src="${userImage}" width="120" alt="user image" />
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

    allPosts = postsData.map((post) => {
      post.comments = commentsData.filter(
        (comment) => comment.postId === post.id
      );
      return post;
    });

    createPostElements(allUsers);
  } catch (error) {
    console.error("Fel vid hämtning av inlägg eller kommentarer:", error);
  }
}

function createPostElements(allUsers) {
  const postsContainer = document.querySelector(".post-container");
  postsContainer.innerHTML = "";

  allPosts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.dataset.userId = post.userId;

    const user = allUsers.find((user) => user.id === post.userId);
    const userImage = userImages[user.id - 1] || "./images/Ellipse 3.svg";

    const limitedComments = post.comments.slice(0, 3);

    postDiv.innerHTML = `
      <div class="post-user">
        <img src="${userImage}" alt="profile img" width="36"/>
        <h3>${user.username}</h3>
      </div>
        
      <div class="post-content">
        <h4>${post.title}</h4>
        <br>
        <p>${post.body}</p>
        <hr />
        <button class="read-comments"> 
          Read comments 
          <img src="./images/Arrows.svg" alt="arrow" />
        </button>
      </div>

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
