import { NavLink } from 'react-router-dom';

const excludedProjects = [
    'spring-backend',
    'proxy-server',
];

const projectsOrder = [
    'alibekbirlikbai',
    'alibekbirlikbai.github.io',
    'news-api',
    'university-bachelor',
    'microservice-expenses',
    'jwt-backend',
    'pastebin-backend',
];

function LeftSidebar({ projects }) {
    const filteredProjects = projects.filter(project => !excludedProjects.includes(project.name));

    const sortedProjects = filteredProjects.sort((a, b) => {
        const indexA = projectsOrder.indexOf(a.name);
        const indexB = projectsOrder.indexOf(b.name);

        // If the project is in the custom order, compare by index
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }

        // If only one of the projects is in the custom order, prioritize that one
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        // If neither project is in the custom order, sort alphabetically by name
        return a.name.localeCompare(b.name);
    });

    return (
        <aside className='sidebar-left'>
            <ul className='sidebar-left__list'>
                {sortedProjects.map(project => (
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
