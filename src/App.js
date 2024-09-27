import './sass/App.sass'
import './sass/header.sass'
import './sass/sidebars.sass'
import './sass/projects.sass'
import Header from './components/html/header'
import Content from './components/html/content'
import SidebarLeft from './components/html/sidebar-left'
import SidebarRight from './components/html/sidebar-right'

import { useState } from 'react';

function App() {
  const [links, setLinks] = useState([]);  // State to store sidebar links

  return (
    <div className="App">
      <Header/>

      <div className='app-container'>
        <SidebarLeft/>

        {/* Pass setLinks to Content so projects can update the sidebar */}
        <Content setLinks={setLinks} />

        {/* Pass links to SidebarRight to dynamically render the section links */}
        <SidebarRight links={links} />
      </div>
    </div>
  );
}

export default App;
