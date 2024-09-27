import { Link } from 'react-router-dom';
import { projects } from '../components/github/projects-list';

function LeftSidebar() {
    return (
        <aside className='sidebar-left'>
            <ul className='sidebar-left__list'>
                {projects.map(project => (
                <li key={project.repo} className='sidebar-left__list-item'>
                    <Link to={`/project/${project.repo}`} className='sidebar-left__link'>
                        {project.title}
                    </Link>
                </li>
                ))}
            </ul>
        </aside>
    );
}

export default LeftSidebar;
