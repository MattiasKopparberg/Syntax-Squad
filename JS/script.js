// DOM-element där vi ska lägga in användarkorten
const userContainer = document.querySelector('.user-container');

// Funktion för att skapa användarkort
function createUserCard(user) {
  const card = document.createElement('div');
  card.classList.add('user-card');

  // Profilbild (Bilal's jobb)
  const profileImgContainer = document.createElement('div');
  profileImgContainer.classList.add('profile-img-container');

  const profileImg = document.createElement('img');
  profileImg.classList.add('profile-img');
  profileImg.src = user.picture.large;
  profileImg.alt = 'User profile picture';

  profileImgContainer.appendChild(profileImg);

  // Användarinfo
  const userInfo = document.createElement('div');
  userInfo.classList.add('user-info');
  userInfo.innerHTML = `
    <h3>${user.login.username}</h3>
    <p>${user.name.first} ${user.name.last}</p>
    <p>${user.email}</p>
    <hr />
  `;

  // "See more" knappen
  const seeMoreBtn = document.createElement('button');
  seeMoreBtn.classList.add('see-more-btn');
  seeMoreBtn.innerHTML = `See more <img src="./images/Arrows.svg" alt="arrow" />`;

  // Mer info (gömd från början)
  const moreInfo = document.createElement('div');
  moreInfo.classList.add('more-info');
  moreInfo.innerHTML = `
    <p>City: ${user.location.city}</p>
    <p>Phone: ${user.phone}</p>
    <p>Company: ${user.location.timezone.description}</p>
  `;

  // Toggle "see more"
  seeMoreBtn.addEventListener('click', () => {
    moreInfo.classList.toggle('hidden');
  });

  // Bygg ihop kortet
  card.appendChild(profileImgContainer);
  card.appendChild(userInfo);
  card.appendChild(seeMoreBtn);
  card.appendChild(moreInfo);

  return card;
}

// 10 användare och skapa kort
fetch('https://randomuser.me/api/?results=10')
  .then(res => res.json())
  .then(data => {
    const users = data.results;
    users.forEach(user => {
      const userCard = createUserCard(user);
      userContainer.appendChild(userCard);
    });
  })
  .catch(err => console.error('Något gick fel:', err));
