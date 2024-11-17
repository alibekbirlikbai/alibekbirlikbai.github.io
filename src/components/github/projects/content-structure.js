import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import RightSidebar from '../../sidebars/right-sidebar';
import GithubReadmeProject from './content/alibekbirlikbai';
import PersonalSiteProject from './content/alibekbirlikbai.github.io';
import CharityUxUiProject from './content/charity-ux-ui';
import CloudUrlStorageProject from './content/cloud-url-storage';
import AndroidNewsApiProject from './content/news-api';
import TransactionManagerProject from './content/transaction-manager';

function Content({ currentProject, onUpdateArticles, currentArticles }) {
  const projectNotFound = <div>Контент для проекта не определен</div>
  const [pathPieces, setPathPieces] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  useEffect(() => {
    if (currentProject?.name) {
      const processedPieces = [
        { text: 'projects', url: '/projects' },
        { text: '/', url: null },
        { text: currentProject.name, url: `/projects/${currentProject.name}` }
      ];
      setPathPieces(processedPieces);
    } else {
      setPathPieces([
        { text: 'projects', url: '/projects' }
      ]);
    }
  }, [currentProject]);

  const renderPathPiece = (piece, index) => {
    if (!piece.url) {
      return (
        <span
          key={index}
          className="text-gray-700"
        >
          {piece.text}
        </span>
      );
    }

    return (
      <span key={index}>
        <NavLink
          to={piece.url}
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
          {piece.text}
        </NavLink>
      </span>
    );
  };

  const renderProject = () => {
    if (!currentProject?.name) {
      return (
        <div className="projects-overview">
          <h1>Проекты</h1>
        </div>
      );
    }

    switch (currentProject.name) {
      case 'alibekbirlikbai':
        return <GithubReadmeProject currentProject={currentProject} onUpdateArticles={onUpdateArticles} />;
      case 'alibekbirlikbai.github.io':
        return <PersonalSiteProject currentProject={currentProject} onUpdateArticles={onUpdateArticles} />;
      case 'charity-ux-ui':
        return <CharityUxUiProject currentProject={currentProject} onUpdateArticles={onUpdateArticles} />;
      case 'cloud-url-storage':
        return <CloudUrlStorageProject currentProject={currentProject} onUpdateArticles={onUpdateArticles} />;
      case 'news-api':
        return <AndroidNewsApiProject currentProject={currentProject} onUpdateArticles={onUpdateArticles} />;
      case 'transaction-manager':
        return <TransactionManagerProject currentProject={currentProject} onUpdateArticles={onUpdateArticles} />;
      default:
        return projectNotFound;
    }
  };

  return (
    <main>
      <div className='app-content'>
        {/* <div className='page-uri'>
          {pathPieces.map((piece, index) => renderPathPiece(piece, index))}
        </div> */}

        <div className='page-content'>
          {renderProject()}
          
          {/* {currentProject && (
            <RightSidebar
              currentProject={currentProject}
              allArticles={currentArticles}
            />
          )} */}
        </div>

        <div className='page-footer'>
          <ul>
            <li><a href='https://github.com/alibekbirlikbai'>Github</a></li>
            <li><a href='https://www.linkedin.com/in/alibek-birlikbai'>Linkedin</a></li>
            <li><a href='https://t.me/alibekbirlikbai'>Telegram</a></li>
          </ul>

          <div id="copyright" align="center">
            <div>Alibek Birlikbai & Software Engineer</div>
            <div>© 2024 - {currentYear}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Content;