import './sass/App.sass'
import './sass/contacts-page.sass'
import './sass/navigation.sass'
import './sass/sidebars.sass'
import './sass/projects.sass'

import Header from './components/navigation'
import Content from './components/content'
import HomePage from './pages/home-page'
import ContactsPage from './pages/contacts-page'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { projects } from './components/github/projects-list'

function App() {

  return (
    <Router>
      <div className="App">
        <Header/>

        <Routes>
          <Route 
            path='/' 
            element={<Navigate to={`/projects/${projects[0].repo}`} />} 
          />
          <Route 
            path='/contacts'
            element={<ContactsPage/>}
          />
          <Route 
            path="/projects/:repo" 
            element={<HomePage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
