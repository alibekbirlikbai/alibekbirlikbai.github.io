import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeftSidebar from '../components/left-sidebar';
import RightSidebar from '../components/right-sidebar';
import Content from '../components/content';
import LoadingSection from '../components/loading-section';

function HomePage({ projects, defaultProject }) {
  const [currentProject, setCurrentProject] = useState(null);
  const [currentArticles, setCurrentArticles] = useState([]);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const { repo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsProjectLoading(true);
    const project = projects.find(p => p.name === repo);
    if (project) {
      setCurrentProject(project);
    } else if (projects.length > 0) {
      navigate(`/projects/${defaultProject}`, { replace: true });
    }
    setIsProjectLoading(false);
  }, [repo, projects, navigate, defaultProject]);

  const handleArticlesUpdate = (articles) => {
    setIsArticlesLoading(true);
    setCurrentArticles(articles);
    setIsArticlesLoading(false);
  };

  return (
    <div className='app-container' id="home-page">
      <LoadingSection isLoading={isProjectLoading}>
        <LeftSidebar projects={projects} />
      </LoadingSection>
      
      <LoadingSection isLoading={isProjectLoading || isArticlesLoading}>
        <Content 
          currentProject={currentProject} 
          onUpdateArticles={handleArticlesUpdate} 
        />
      </LoadingSection>
      
      <LoadingSection isLoading={isArticlesLoading}>
        <RightSidebar
          currentProject={currentProject}
          allArticles={currentArticles}
        />
      </LoadingSection>
    </div>
  );
}

export default HomePage;