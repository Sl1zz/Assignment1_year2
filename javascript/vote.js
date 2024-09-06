// Initial votes data
let currentVotes = {
    like: 20,
    dislike: 5
};

// Function to update the displayed votes based on the currentVotes object
function updateVoteCounts() {
    document.querySelectorAll(".card").forEach(card => {
        const cardId = card.dataset.cardId;
        const ratings = card.querySelectorAll(".card-vote");
        const likeRating = ratings[0];
        const dislikeRating = ratings[1];

        // Set initial counts
        likeRating.querySelector(".card-vote-count").textContent = currentVotes.like;
        dislikeRating.querySelector(".card-vote-count").textContent = currentVotes.dislike;

        ratings.forEach(rating => {
            const button = rating.querySelector(".card-vote-button");
            const count = rating.querySelector(".card-vote-count");

            button.style.cursor = "pointer"; // Make sure it's clickable

            button.addEventListener("click", () => {
                if (rating.classList.contains("card-vote-selected")) {
                    return;
                }

                // Update the vote counts
                if (rating === likeRating) {
                    currentVotes.like += 1;
                } else {
                    currentVotes.dislike += 1;
                }

                count.textContent = Number(count.textContent) + 1;

                ratings.forEach(otherRating => {
                    if (otherRating.classList.contains("card-vote-selected")) {
                        const otherCount = otherRating.querySelector(".card-vote-count");

                        // Decrement the count for the previously selected vote
                        if (otherRating === likeRating) {
                            currentVotes.like = Math.max(0, currentVotes.like - 1);
                        } else {
                            currentVotes.dislike = Math.max(0, currentVotes.dislike - 1);
                        }

                        otherCount.textContent = Math.max(0, Number(otherCount.textContent) - 1);
                        otherRating.classList.remove("card-vote-selected");
                    }
                });

                rating.classList.add("card-vote-selected");
            });
        });
    });
}

// Call the function to initialize vote counts
updateVoteCounts();