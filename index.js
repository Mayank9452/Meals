// script.js

const mealContainer = document.getElementById('mealContainer');

async function fetchMeals() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        
        const meals = data.meals;
        
        if (meals) {
            meals.forEach(meal => {
                const card = createMealCard(meal);
                mealContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



function createMealCard(meal) {
    console.log(meal)
    const resultCard= document.createElement('div');
    resultCard.className = "myCard";
    const cardImg = document.createElement('img');
    const cardHeading = document.createElement('h5');
    const buttonDiv= document.createElement('div');
    buttonDiv.className = "btnDiv"
    const cardFavButton = document.createElement('button');
    const cardDetailBtn = document.createElement('button');


    cardImg.src = meal.strMealThumb;
    cardImg.style = 'width : 200px; height : 200px';

    cardHeading.innerHTML = meal.strMeal;
    cardHeading.style = 'font-weight : bold; text-align : center; color : white';

    cardDetailBtn.innerHTML = "View Details"

    buttonDiv.appendChild(cardFavButton);
    buttonDiv.appendChild(cardDetailBtn);

    cardFavButton.innerHTML = localStorage.getItem(meal.idMeal) ? 'Remove' : 'Favourite';
    cardFavButton.addEventListener('click', () => handleFavouriteButtonClick(meal));
    function handleFavouriteButtonClick(meal) {
        const isFavourite = localStorage.getItem(meal.idMeal);
        if (isFavourite) {
            localStorage.removeItem(meal.idMeal);
        } else {
            localStorage.setItem(meal.idMeal, JSON.stringify(meal));
            
        }
        updateFavouriteButtonText(meal.idMeal);
    }
    
    function updateFavouriteButtonText(mealId) {
        const favouriteButtons = document.querySelectorAll('.myCard button');
        favouriteButtons.forEach(button => {
            const meal = JSON.parse(button.dataset.meal);
            if (meal.idMeal === mealId) {
                const isFavourite = localStorage.getItem(mealId);
                button.innerHTML = isFavourite ? 'Remove' : 'Favourite';
            }
        });
    }

    cardDetailBtn.addEventListener('click', () => {
        // Store the selected meal data in session storage for access on the view.html page
        sessionStorage.setItem('selectedMeal', JSON.stringify(meal));

        // Navigate to view.html
        window.location.href = 'view.html';
    });

    resultCard.appendChild(cardImg);
    resultCard.appendChild(cardHeading);
    resultCard.appendChild(buttonDiv);
    return resultCard;



    return resultItem;
}
fetchMeals();

// Add a reference to the search input field
const searchInput = document.querySelector('input[name="searchBox"]');

// Add an event listener to the search input
searchInput.addEventListener('input', handleSearch);

// Create a function to handle the search functionality
function handleSearch() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.myCard');

    cards.forEach(card => {
        const mealName = card.querySelector('h5').innerText.toLowerCase();
        if (mealName.includes(searchValue)) {
            card.style.display = 'inline-block';
        } else {
            card.style.display = 'none';
        }
    });
}




