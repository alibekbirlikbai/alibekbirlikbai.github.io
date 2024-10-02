import { useEffect, useState } from 'react';

const generalExcludedTitles = new Set([
    'test pr',
])

function PullRequestList({ currentProject, excudedTitles = [] }) {
    const [pullRequests, setPullRequests] = useState([]);

    useEffect(() => {
        const fetchPullRequests = async () => {
            if (!currentProject) return;

            const repoOwner = currentProject.owner.login; 
            const repoName = currentProject.name;

            try {
                const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`);
                const data = await response.json();

                const allExcludedTitles = [
                    ...excudedTitles,
                    ...Array.from(generalExcludedTitles)
                ]

                const filteredPullRequests = data.filter(pr => 
                    (pr.state === 'open' || (pr.state === 'closed' && pr.merged_at !== null)) 
                    &&
                    !allExcludedTitles.some(excludedTitle => 
                        pr.title.toLowerCase().includes(excludedTitle.toLowerCase())
                    )
                )
                // .sort(lsmdvsmvkl)

                setPullRequests(filteredPullRequests); 
            } catch (error) {
                console.error("Error fetching pull requests:", error);
            }
        };

        fetchPullRequests();
    }, [currentProject]);

    return (
        <ul className='pull-request-list'>

            {pullRequests.map(pr => (                
                <li key={pr.id} className='pull-request-list__item'>
                    <a href={pr.html_url} target='_blank' rel='noopener noreferrer'>
                        {pr.title}
                    </a>

                    &nbsp;({pr.merged_at ? `☑️merged` : `✅${pr.state}`})
                </li>
            ))}

        </ul>
    );
}

export default PullRequestList;
