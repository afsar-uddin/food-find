const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    // clear data
    searchField.value = '';
    if (searchValue == '') {
        noResultFound();
    } else {
        // load data
        const url = `https:www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`

        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResults(data.meals);
        } catch (error) {
            noResultFound();
        }
    }
}

const displaySearchResults = meals => {
    const searchResult = document.getElementById('search-results');

    searchResult.textContent = '';


    if (meals == null) {
        noResultFound()
    }
    meals.forEach(meal => {

        const div = document.createElement('div')
        div.classList.add('single-item')

        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})">
                <img src="${meal.strMealThumb}" />
                <h3>${meal.strMeal}</h3>
                <p>${meal.strInstructions.slice(0, 150)}</p>
                <button>View Detail</button>
            </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetail = async mealID => {
    document.getElementById('remove').style.display = 'block'
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        displayMealDetail(data.meals[0])
    } catch (error) {
        noResultFound();
    }
}

const displayMealDetail = meal => {
    const searchdetail = document.getElementById('search-detail');
    searchdetail.classList.add('popup');
    searchdetail.style.display = 'block';
    document.body.classList.add('hidden')


    // searchdetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('single-item-detail');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" />
        <h3>${meal.strMeal}</h3>
        <p>${meal.strInstructions.slice(0, 600)}</p>
    `;
    searchdetail.appendChild(div);
}

const noResultFound = () => {
    const searchResult = document.getElementById('search-results');
    // const searchDetail = document.getElementById('search-detail');
    searchResult.textContent = '';
    // searchDetail.textContent = '';
    const h2 = document.createElement('h2');
    h2.classList.add('error')
    h2.innerText = 'No result found, Please search again...';
    searchResult.appendChild(h2)
}

document.getElementById('remove').addEventListener('click', function () {
    const searchPopUp = document.getElementById('search-detail');
    searchPopUp.style.display = 'none';
    const singleItemDetail = document.querySelector('single-item-detail');
    searchPopUp.textContent = singleItemDetail;
    document.body.classList.remove('hidden');
    this.style.display = 'none'
});

// pre-loader
const preload = () => {
    document.getElementById('loaded').style.display = 'none'
}