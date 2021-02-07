const getMeal = () =>{ 
    let search = document.getElementById('search').value;
    let mainNode = document.getElementById('showItems');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res => res.json())
    .then(data => {data.meals.forEach(meal => {
                
                let mealItemDiv = document.createElement('div');
                mealItemDiv.className = 'col-md-3 item-columns';
                let cardHtml = `
                <div onclick="getIngredientsAndMeasure(${meal.idMeal})"  class="card rounded-3 border-0">
                <img src = "${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title food-title text-center">${meal.strMeal}</h5>
                </div>
                </div>
                `;
                mealItemDiv.innerHTML = cardHtml;
                mainNode.appendChild(mealItemDiv);
            });
        })
    }

document.getElementById('searchButton').addEventListener('click', function(){
    let mainNode = document.getElementById('showItems');
    mainNode.innerText = "";  
    getMeal();

})
