import React, { useState } from 'react';
import MealList from './MealList';

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setCalories(e.target.value);
  };

  const getMealData = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=a856f39567704506a536c685e9afeb95&timeFrame=day&targetCalories=${calories}`
    );

    const data = await response.json();

    if (response.ok) {
      setMealData(data);
    } else {
      setIsError(true);
    }

    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={getMealData}>
        <section className="controls">
          <input
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChange}
          />
        </section>
        <button>Get Daily Meal Plan</button>
      </form>
      {mealData && <MealList mealData={mealData} />}
      {isError && (
        <p className="error">
          My daily points limit on this site has been reached. In order to make
          this app work try tommorrow. Sorry.
        </p>
      )}
    </div>
  );
}

export default App;
