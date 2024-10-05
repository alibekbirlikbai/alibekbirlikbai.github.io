import './sass/App.sass';
import './sass/contacts-page.sass';
import './sass/navigation.sass';
import './sass/sidebars.sass';
import './sass/projects.sass';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './pages/navigation';
import HomePage from './pages/home-page';
import ContactsPage from './pages/contacts-page';

import { fetchGithubData } from './components/github/github-api-integration/fetch-projects';

function App() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchGithubData();
      
      // console.log(fetchedProjects);  // Log the fetched projects data
      // console.log(fetchedProjects[0].name);  // Log the fetched projects data

      setProjects(fetchedProjects);
      setIsLoading(false); 
    };

    loadProjects();
  }, []);

  const defaultProject = projects.length > 0 ? projects[0].name : null;

  // Render a loading state until projects are fetched
  if (isLoading) {
    return <div>Loading projects...</div>;  // You can replace this with a spinner component if needed
  }

  return (
    <Router>
      <div className="App">
        <Header/>

        <Routes>
          <Route 
            path='/' 
            element={
              defaultProject 
                ? <Navigate to={`/projects/${defaultProject}`} />
                : <div> Превышен лимит запросов Github API </div>
            }
          />
          <Route 
            path='/contacts'
            element={<ContactsPage/>}
          />
          <Route 
            path="/projects/:repo" 
            element={<HomePage projects={projects} defaultProject={defaultProject}/>} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
