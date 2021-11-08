import React, { useState } from 'react';
import MealList from './MealList';

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  const handleChange = (e) => {
    setCalories(e.target.value);
  };

  const getMealData = () => {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=9b076a7b0bf948fa81036292fbaf30e9&timeFrame=day&targetCalories=${calories}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMealData(data);
      })
      .catch(() => {
        console.log('error');
      });
  };

  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
      </section>
      <button onClick={getMealData}>Get Daily Meal Plan</button>
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default App;
