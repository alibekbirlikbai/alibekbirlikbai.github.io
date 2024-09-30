import './sass/App.sass';
import './sass/contacts-page.sass';
import './sass/navigation.sass';
import './sass/sidebars.sass';
import './sass/projects.sass';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/navigation';
import HomePage from './pages/home-page';
import ContactsPage from './pages/contacts-page';

import { fetchGithubData } from './components/github/github-api-integration';

function App() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);

      // Fetch the data from GitHub
      const fetchedProjects = await fetchGithubData();
      // console.log(fetchedProjects);  // Log the fetched projects data
      // console.log(fetchedProjects[0].name);  // Log the fetched projects data

      // Set the fetched projects in state
      setProjects(fetchedProjects);
      setIsLoading(false);
    };

    loadProjects();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if there are projects before setting defaultProject
  const defaultProject = projects.length > 0 ? projects[0].name : null;

  return (
    <Router>
      <div className="App">
        <Header/>

        <Routes>
          {/* Only navigate if defaultProject is defined */}
          <Route 
            path='/' 
            element={
              defaultProject 
                ? <Navigate to={`/projects/${defaultProject}`} />
                : <div>No public repos found on GitHub</div>
            }
          />
          <Route 
            path='/contacts'
            element={<ContactsPage/>}
          />
          <Route 
            path="/projects/:repo" 
            element={<HomePage projects={projects}/>} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
