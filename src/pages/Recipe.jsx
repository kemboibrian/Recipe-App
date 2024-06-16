import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../assets/API_KEY";
import { Button, Skeleton } from "@mui/material";

const Recipe = () => {
  const { name } = useParams();
  const [details, setDetails] = useState();
  const [active, setActive] = useState("summary");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${name}/information?apiKey=${API_KEY}`
        );
        if (response.ok) {
          const detailsData = await response.json();
          setDetails(detailsData);
        } else {
          throw new Error("Failed to fetch recipe details");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();

  }, [name]);

  const handleClick = (status) => {
    setActive(status);
  };

  if (!details) {
    return (
      <div className="recipe-shimmer-container">
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} animation="wave" />
        <Skeleton variant="rectangular" animation="wave" height={300} width={500} />
        <div className="btn-shimmer-right">
          {[1, 2, 3].map((key) => (
            <Skeleton key={key} variant="rounded" animation="wave" height={35} width={120} />
          ))}
        </div>
        <div className="shimmer-content-right">
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} variant="text" sx={{ fontSize: "1.5rem" }} animation="wave" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-container-main">
      <h1>{details.title}</h1>
      <div className="recipe-container">
        <div className="recipe-container-left">
          <img src={details.image} className="recipe-imgs" alt={details.title} />
        </div>
        <div className="recipe-container-right">
          <div className="btn-container">
            {["summary", "ingredients", "steps"].map((status) => (
              <Button
                key={status}
                variant="contained"
                onClick={() => handleClick(status)}
                disabled={active === status}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
          {active === "summary" && (
            <div className="recipe-right-main">
              <div className="summary">
                <h2>Summary</h2>
                <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              </div>
              <div className="instructions">
                <h2>Instructions</h2>
                <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
              </div>
            </div>
          )}
          {active === "ingredients" &&
            details.extendedIngredients.map((ingredient, index) => (
              <div className="ingredient-bar" key={index}>
                <h3 className="ingredients-h3">
                  <p>{ingredient.name}</p>
                  <p> {ingredient.amount} grams</p>
                </h3>
              </div>
            ))}
          {active === "steps" && (
            <div className="steps">
              <h2>Steps</h2>
              {details.analyzedInstructions[0]?.steps.map((step, index) => (
                <div className="step" key={index}>
                  <h3>Step - {step.number}</h3>
                  <p>{step.step}</p>
                  <h4>Ingredients - {step.ingredients[0]?.name}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
