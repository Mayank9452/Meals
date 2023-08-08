// view.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the selected meal data from session storage
    const selectedMealData = sessionStorage.getItem('selectedMeal');

    // Check if the data exists and parse it to a JavaScript object
    if (selectedMealData) {
        const selectedMeal = JSON.parse(selectedMealData);
        displayMealDetails(selectedMeal);
    }
});

function displayMealDetails(meal) {
    // Use the meal data to display the details on the view.html page
    const mealDetailsContainer = document.getElementById('mealDetails');

    // Create elements to display the meal details
    const cardImg = document.createElement('img');
    cardImg.className = "mealsImg"
    const cardHeading = document.createElement('h3');
    const cardInstructions = document.createElement('p');

    cardImg.src = meal.strMealThumb;
    // cardImg.style = 'width : 200px; height : 200px';

    cardHeading.textContent = meal.strMeal;
    cardHeading.style = 'font-weight : bold; text-align : center;';

    cardInstructions.textContent = meal.strInstructions;
    cardInstructions.style = 'text-align : center;';

    // Append the elements to the container
    mealDetailsContainer.appendChild(cardImg);
    mealDetailsContainer.appendChild(cardHeading);
    mealDetailsContainer.appendChild(cardInstructions);
}
