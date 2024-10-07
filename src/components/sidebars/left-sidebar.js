import { NavLink } from 'react-router-dom';

const excludedProjects = [
    'proxy-server',
    'git-polygone',
    'spring-security-polygone',
];

const projectsOrder = [
    'alibekbirlikbai.github.io',
    'alibekbirlikbai',
    'cloud-url-storage',
    'transaction-manager',
    'news-api',
    'charity-ux-ui',
];

function formatDescription(description) {
    if (!description.endsWith(')')) {
        return description;
    }
    
    let lastOpenParenIndex = -1;
    let count = 0;
    
    // Scan from right to left
    for (let i = description.length - 1; i >= 0; i--) {
        if (description[i] === ')') {
            count++;
        } else if (description[i] === '(') {
            count--;
            if (count === 0) {
                lastOpenParenIndex = i;
                break;
            }
        }
    }
    
    if (lastOpenParenIndex === -1) {
        return description;
    }
    
    const content = description.substring(lastOpenParenIndex + 1, description.length - 1);
    const lastInnerParenIndex = content.lastIndexOf('(');
    
    if (lastInnerParenIndex === -1) {
        // No inner parentheses, return as is
        return content;
    }
    
    // Split into text before parentheses and parenthetical content
    const textBeforeParens = content.substring(0, lastInnerParenIndex);
    const parensContent = content.substring(lastInnerParenIndex);
    
    // Make text before parentheses bold

    return (
        <span>
            <>
                {textBeforeParens}
            </>
            <>
                {parensContent}
            </>
        </span>
    );
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
