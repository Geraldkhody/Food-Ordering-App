import React, { useEffect, useState } from "react";
import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(" http://localhost:5000/Meals");
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(
          `Ooop something happen ${response.status}(${response.statusText}) `
        );
      }

      const data = await response.json();

      setMeals(data);
      setIsLoading(false);
    };
    fetchMeals().catch((err) => {
      console.log(err);
      setHttpError(err.message);
    });
  }, []);

  /* 
  Checking if there is an error then then will return this JSX code so that 
  the rest of the code will not run because of the return in the if statement
  */
  if (httpError) {
    return (
      <section className={style.meals}>
        <Card>
          <p className={style.loading}>
            <strong>{httpError}</strong>
          </p>
        </Card>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={style.meals}>
      <Card>
        {!isLoading && <ul>{mealsList}</ul>}
        {isLoading && <p className={style.loading}>Loading...</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
