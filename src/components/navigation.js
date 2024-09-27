import { NavLink } from 'react-router-dom';  // Import NavLink for active link styling

function Navigation() {
    return (
        <nav>
            <div className='navigation'>
                <ul className='navigation__list'>
                    <li className='navigation__item'>
                        {/* Use NavLink to apply active class when the route matches */}
                        <NavLink 
                            to="/" 
                            className='navigation__link'
                            end // Ensures the root path is only active on the home page
                        >
                            Docs
                        </NavLink>
                    </li>
                    
                    <li className='navigation__item'>
                        <NavLink 
                            to="/contacts" 
                            className='navigation__link'
                        >
                            Контакты
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
  
export default Navigation;
