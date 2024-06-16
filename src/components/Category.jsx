
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles,GiSushis } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
//import './Category.css'

const Category = () => {
    return (
        <div className="category-container">
            <NavLink to={'/cuisine/Italian'}>
                <FaPizzaSlice />
                <p>Italian</p>
            </NavLink>
            <NavLink to={'/cuisine/American'}>
                <FaHamburger />
                <p>American</p>
            </NavLink>
            <NavLink to={'/cuisine/Thai'}>
                <GiNoodles />
                <p>Thai</p>
            </NavLink>
            <NavLink to={'/cuisine/Asian'}>
                <GiSushis />
                <p>Asian</p>
            </NavLink>
        </div>
    )
}

export default Category;

