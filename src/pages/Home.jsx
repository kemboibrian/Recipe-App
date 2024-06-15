import Vegan from "../components/Vegan";
import Popular from "../components/Popular";
//import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Popular />
            <Vegan />
        </div>
    )
}

export default Home;