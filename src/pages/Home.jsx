import Vegan from "../components/Vegan";
import Popular from "../components/Popular";

const Home = () => {
    return (
        <div className="home-container">
            <Popular />
            <Vegan />
        </div>
    )
}

export default Home;