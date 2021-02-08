

const getMeal = () =>{ 
    let search = document.getElementById('search').value;
    let mainNode = document.getElementById('showItems');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res => res.json())
    .then(data => {data.meals.forEach(meal => {
                
                let mealItemsDiv = document.createElement('div');
                mealItemsDiv.className = 'col-md-3 item-columns';
                let cardHtml = `
                <div onclick="getMealElement(${meal.idMeal})"  class="card rounded-3 border-0">
                <img src = "${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="text-center">${meal.strMeal}</h5>
                </div>`;

                mealItemsDiv.innerHTML = cardHtml;
                mainNode.appendChild(mealItemsDiv);
            });
        })
    }

document.getElementById('searchButton').addEventListener('click', function(){
    let mainNode = document.getElementById('showItems');
    mainNode.innerText = "";  
    getMeal();

})


         // Show Meals Ingredient

const getMealElement = meals => {
    document.getElementById('show-ingredient').innerText = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        const mealItem = data.meals[0] ;
        const keys = Object.keys(mealItem);

        const itemsArray = [];
        const measureArray = [];
        keys.forEach(key => {
            if (key.startsWith('strIngredient') && mealItem[key] != "" && mealItem[key] != null ) {
                itemsArray.push(mealItem[key])
            }
        });
        
        keys.forEach(key => { 
            if (key.startsWith('strMeasure') && mealItem[key] != "" && mealItem[key] != null && mealItem[key] != " " ) {
                measureArray.push(mealItem[key])
            }
        });

        const showIngredients = document.getElementById('show-ingredient');
        const ingredientItem = document.createElement('div')

        const card = `
        <div class="row d-flex justify-content-centerd-flex justify-content-center">
              <div class="col-md-6 ingDiv">
                  <div class="ing-image">
                    <img src="${meal.strMealThumb}" width="100%" alt="">
                  </div>
                  <h2>${meal.strMeal}</h2><br>
                  <h5 >Ingredients</h5><br>
                  <div id="ingredient">
                  </div> 
              </div>
        </div>
        `
        ingredientItem.innerHTML = card;
        showIngredients.appendChild(ingredientItem);

        const ingredientList = document.getElementById('ingredient');
        let allItems = ``;

        itemsArray.forEach((ingredient , index) => {
            const measure = measureArray[index];
            allItems += `
            <li> ${measure} ${ingredient}</li>
            `     
        });
        ingredientList.innerHTML = allItems;   

        
    })
}


