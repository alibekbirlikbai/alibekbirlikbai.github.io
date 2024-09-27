import Content from '../components/content'
import LeftSidebar from '../components/left-sidebar'
import RightSidebar from '../components/right-sidebar'


import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';


function HomePage() {
    const [project, setProject] = useState([]);
    const [id_links, setLinks] = useState([]);
    const { repo } = useParams();

    useEffect(() => {
        // Reset project and links when the route changes
        setProject('');
        setLinks([]);
      }, [repo]);
    
    return (
        <div className='app-container' id="home-page">
            <LeftSidebar/>

            <Content setProject={setProject} setLinks={setLinks} currentRepo={repo} />

            <RightSidebar project={project} links={id_links} />
        </div>
    );
};
  
export default HomePage;
  