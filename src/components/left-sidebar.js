import { NavLink } from 'react-router-dom';

const excludedProjects = [
    'proxy-server',
    'git-polygone',
    'spring-security-polygone',
];

const projectsOrder = [
    'alibekbirlikbai',
    'transaction-manager',
    'cloud-url-storage',
    'news-api',
    'charity-ux-ui',
    'alibekbirlikbai.github.io',
];

// Helper function to format description and bold the text in the parentheses
function formatDescription(description) {
    const regex = /(.*)(\([^)]*\))$/; // Regex to match the text inside parentheses
    const match = description.match(regex);

    if (match) {
        return (
            <>
                {match[1]} 
                <br/>
                <strong>
                    {match[2]}
                </strong>
            </>
        );
    }
    
    return description; // Return original description if no parentheses found
}

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
                            {formatDescription(project.description)}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default LeftSidebar;
