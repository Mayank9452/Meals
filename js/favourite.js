// favourite.js

const favouriteMealContainer = document.getElementById('favouriteMealContainer');

function loadFavouriteMeals() {
    favouriteMealContainer.innerHTML = '';
    
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const meal = JSON.parse(localStorage.getItem(key));

        // Check if the stored data is a valid meal object
            if (meal && meal.idMeal && meal.strMealThumb && meal.strMeal) {
                const card = createFavouriteMealCard(meal);
                favouriteMealContainer.appendChild(card);
            } 
        }

}

function createFavouriteMealCard(meal) {
    // Similar to createMealCard but customize it for favourite.html
    // You can reuse a lot of the existing code
    console.log('Inside Favourite')
    console.log(meal);
    const resultCard= document.createElement('div');
    resultCard.className = "myCard";
    const cardImg = document.createElement('img');
    const cardHeading = document.createElement('h5');
    const buttonDiv= document.createElement('div');
    buttonDiv.className = "btnDiv";
    const cardDetailBtn = document.createElement('button');
    cardDetailBtn.innerHTML = "View Details"
    // ... (set up card properties)
    cardImg.src = meal.strMealThumb;
    cardImg.style = 'width : 200px; height : 200px';

    cardHeading.innerHTML = meal.strMeal;
    cardHeading.style = 'font-weight : bold; text-align : center; color : white';

    // Add a "Remove" button for each favourite card
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove';
    removeButton.addEventListener('click', () => {
        localStorage.removeItem(meal.idMeal);
        loadFavouriteMeals();
    });

    cardDetailBtn.addEventListener('click', () => {
        // Store the selected meal data in session storage for access on the view.html page
        sessionStorage.setItem('selectedMeal', JSON.stringify(meal));

        // Navigate to view.html
        window.location.href = 'view.html';
    });

    buttonDiv.appendChild(removeButton);
    buttonDiv.appendChild(cardDetailBtn);
    resultCard.appendChild(cardImg);
    resultCard.appendChild(cardHeading);
    resultCard.appendChild(buttonDiv);
    return resultCard;
}

loadFavouriteMeals();
