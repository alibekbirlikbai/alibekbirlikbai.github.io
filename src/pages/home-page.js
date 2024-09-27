import Content from '../components/content'
import LeftSidebar from '../components/left-sidebar'
import RightSidebar from '../components/right-sidebar'

import { useState } from 'react';

function HomePage() {
    const [project, setProject] = useState([]);
    const [links, setLinks] = useState([]);  // State to store sidebar links

    return (
        <div className='app-container' id="home-page">
            <LeftSidebar/>

            <Content setProject={setProject} setLinks={setLinks} />

            <RightSidebar project={project} links={links} />
        </div>
    );
};
  
export default HomePage;
  