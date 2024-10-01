import { NavLink } from 'react-router-dom';

function LeftSidebar({ projects }) {
    return (
        <aside className='sidebar-left'>
            <ul className='sidebar-left__list'>
                {projects.map(project => (
                    <li key={project.name} className='sidebar-left__list-item'>
                        <NavLink to={`/projects/${project.name}`} className='sidebar-left__link'>
                            {project.description}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default LeftSidebar;
