import { NavLink, useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation();  // current route location

    return (
        <nav>
            <div className='navigation'>
                <ul className='navigation__list'>
                    <li className='navigation__item'>
                        {/* Use NavLink to apply active class when the route matches */}
                        <NavLink 
                            to="/projects" 
                            className={({ isActive }) =>
                                isActive || location.pathname.startsWith('/projects') ? 'navigation__link active' : 'navigation__link'
                            }
                            end 
                        >
                            Проекты
                        </NavLink>
                    </li>
                    
                    <li className='navigation__item'>
                        <NavLink 
                            to="/contacts" 
                            className='navigation__link'
                        >
                            Контакты / CV
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
  
export default Navigation;
