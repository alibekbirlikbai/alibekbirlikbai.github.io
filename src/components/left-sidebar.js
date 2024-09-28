import { Link, NavLink } from 'react-router-dom';
import { projects } from '../components/github/projects-list';

function LeftSidebar() {
    return (
        <aside className='sidebar-left'>
            <ul className='sidebar-left__list'>
                {projects.map(project => (
                <li key={project.repo} className='sidebar-left__list-item'>
                    <NavLink to={`/projects/${project.repo}`} className='sidebar-left__link'>
                        {project.title}
                    </NavLink>
                </li>
                ))}
            </ul>
        </aside>
    );
}

export default LeftSidebar;
