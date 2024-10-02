import { useParams, useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import LeftSidebar from '../components/left-sidebar';
import RightSidebar from '../components/right-sidebar';
import Content from '../components/content';

function HomePage({ projects, defaultProject }) {
    const [allProjects, setAllProjects] = useState([]);
    const [currentArticles, setCurrentArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { repo } = useParams();
    const navigate = useNavigate();

    let currentProject = projects.find(p => p.name === repo);

    useEffect(() => {
        setAllProjects(projects);
    }, [projects]);

    useEffect(() => {
        if (!currentProject && projects.length > 0) {
            navigate(`/projects/${defaultProject.name}`, { replace: true });
        }

        // Reload the page if the repo has changed (force page refresh)
        if (repo && !isLoading) {
            window.location.href = `/projects/${repo}`;
            return;
        }
        setIsLoading(true);

        setIsLoading(false);
            
    }, [currentProject, projects, navigate, repo]);

    const handleArticlesUpdate = (articles) => {
        setCurrentArticles(articles);
    };

    return (
        <div className='app-container' id="home-page">
            <LeftSidebar projects={allProjects} />
            
            <Content currentProject={currentProject} onUpdateArticles={handleArticlesUpdate} />

            <RightSidebar
                currentProject={currentProject}
                allArticles={currentArticles} 
            />
        </div>
    );
}

export default HomePage;
