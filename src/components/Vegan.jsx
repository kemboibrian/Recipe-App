import { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Vegan = () => {
  const [vegan, setVegan] = useState([]);

  const getVegan = async () => {
    try {
      const getData = localStorage.getItem("vegan");

      if (getData && getData !== "undefined") {
        setVegan(JSON.parse(getData));
      } else {
        const resp = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&tags=vegan&number=10`
        );
        const data = await resp.json();
        setVegan(data.recipes);
        localStorage.setItem("vegan", JSON.stringify(data.recipes));
      }
    } catch (error) {
      console.error("Error fetching vegan recipes:", error);
    }
  };

  useEffect(() => {
    getVegan();
  }, []);

  if (vegan.length === 0) {
    return (
      <LoadingWrapper>
        <Splide options={{ perPage: 1 }}>
          <SplideSlide>
            <Skeleton height={200} width={300} />
          </SplideSlide>
        </Splide>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <h3>Vegan Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
          breakpoints: {
            767: { perPage: 2 },
            640: { perPage: 1 }
          }
        }}
      >
        {vegan.map(({ title, id, image }) => (
          <SplideSlide key={id}>
            <Card>
              <Link to={`/recipe/${id}`}>
                <img src={image} alt={title} />
                <Gradient />
                <p>{title}</p>
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
`;

const Card = styled.div`
  min-height: 25rem;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
  }

  p {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    text-align: center;
    color: #fff;
    width: 100%;
    font-weight: 600;
    font-size: 1.25rem;
    z-index: 10;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  z-index: 3;
  border-radius: 2rem;
`;

export default Vegan;
