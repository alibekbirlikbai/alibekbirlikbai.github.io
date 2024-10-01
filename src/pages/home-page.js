import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LeftSidebar from '../components/left-sidebar';
import Content from '../components/content'

function HomePage({ projects }) {
    const [allProjects, setAllProjects] = useState([]);
    const { repo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setAllProjects(projects);
    }, [projects]);

    let currentProject = projects.find(p => p.name === repo);

    useEffect(() => {
        if (!currentProject && projects.length > 0) {
            const defaultProject = projects[0];
            navigate(`/projects/${defaultProject.name}`, { replace: true });
        }
    }, [currentProject, projects, navigate]);

    return (
        <div className='app-container' id="home-page">
            <LeftSidebar projects={allProjects} />

            <Content
                currentProject={currentProject}
                key={repo}
            />

            {/* 
            <RightSidebar
                project={currentProject.title}
                links={currentProject.articles || []}  // Assuming `articles` is a field
            /> 
            */}
        </div>
    );
}

export default HomePage;
