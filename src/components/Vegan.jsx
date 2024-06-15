import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Skeleton } from "@mui/material";

const Vegan = () => {
    const API_KEY = '71ee729777aa439ba75c472c3bca40b4';
    const [vegan, setVegan] = useState([]);

    const getVeganRecipes = async () => {
        const check = localStorage.getItem('vegan');

        if (check) {
            setVegan(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=vegan`);
            const data = await api.json();
            localStorage.setItem('vegan', JSON.stringify(data.recipes));
            console.log(data);
            setVegan(data?.recipes);
        }
    }

    useEffect(() => {
        getVeganRecipes();
    }, []);

    if (vegan.length === 0) {
        const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return (
            <Splide options={{
                perPage: 4,
                pagination: false,
                gap: '2rem'
            }}>
                {number.map((data) => (
                    <SplideSlide key={data}>
                        <Skeleton height={200} width={300} />
                    </SplideSlide>
                ))}
            </Splide>
        )
    }

    return (
        <div className="vegan-container">
            <h1>Vegan Picks</h1>
            <Splide options={{
                perPage: 4,
                pagination: false,
                gap: '2rem',
            }}>
                {vegan.map((recipe) => (
                    <SplideSlide key={recipe.id}>
                        <RecipeCard data={recipe} />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    )
}

export default Vegan;
