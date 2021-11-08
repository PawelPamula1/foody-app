import React, { useState, useEffect } from 'react';

const Meal = ({ meal }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=9b076a7b0bf948fa81036292fbaf30e9&includeNutrition=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log('error');
      });
  }, [meal.id]);

  return (
    <article>
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />
      <ul className="instructions">
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>

      <a href={meal.sourceUrl}>Go to Recipe</a>
    </article>
  );
};

export default Meal;
