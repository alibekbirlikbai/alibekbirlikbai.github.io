import Content from '../components/content'
import LeftSidebar from '../components/left-sidebar'
import RightSidebar from '../components/right-sidebar'


import { useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { projects } from '../components/github/projects-list';

function HomePage() {
    const [project, setProject] = useState('');
    const [id_links, setLinks] = useState([]);
    const [is_loading, set_is_loading] = useState(true);
    const { repo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Reload the page if the repo has changed (force page refresh)
        if (repo && !is_loading) {
          window.location.href = `/projects/${repo}`;
          return;
        }

        set_is_loading(true);
        let currentProject;
    
        if (repo) {
          currentProject = projects.find(p => p.repo === repo);
        } else {
          currentProject = projects[0];
          navigate(`/projects/${currentProject.repo}`, { replace: true });
        }
    
        if (currentProject) {
          setProject(currentProject.title);
          setLinks(currentProject.articles);
        } else {
          setProject('Project Not Found');
          setLinks([]);
        }
    
        set_is_loading(false);
      }, [repo, navigate]);
    
      if (is_loading) {
        return <div>Loading...</div>;
      }
    
    return (
        <div className='app-container' id="home-page">
            <LeftSidebar/>

            <Content 
              setProject={setProject} 
              setLinks={setLinks} 
              currentRepo={repo} 
              projectTitle={project} 
              key={repo}
            />

            <RightSidebar 
              project={project} 
              links={id_links} 
            />
        </div>
    );
};
  
export default HomePage;
  