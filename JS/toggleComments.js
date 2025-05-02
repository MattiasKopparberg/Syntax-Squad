document.addEventListener('DOMContentLoaded', function () {
    const commentButtons = document.querySelectorAll('.read-comments');
    commentButtons.forEach(button => {
      button.addEventListener('click', function () {
        const commentContainerId = `comments-${button.getAttribute('data-id')}`;
        const commentContainer = document.getElementById(commentContainerId);
        
        // Byt visning av kommentarer
        commentContainer.classList.toggle('hidden');
        
        // Visa endast de första tre kommentarerna
        const comments = commentContainer.querySelectorAll('.comment');
        comments.forEach((comment, index) => {
          if (index >= 3) {
            comment.classList.add('hidden');
          } else {
            comment.classList.remove('hidden');
          }
        });
        
        // Byt knapptext och pil
        if (commentContainer.classList.contains('hidden')) {
          button.innerHTML = 'Read comments <img src="./images/Arrows.svg" alt="arrow" />';
        } else {
          button.innerHTML = 'Hide comments <img src="./images/Arrows.svg" alt="arrow" />';
        }
      });
    });
  });
  