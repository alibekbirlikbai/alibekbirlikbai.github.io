import GithubReadmeProject from './content/alibekbirlikbai';
import PersonalSiteProject from './content/alibekbirlikbai.github.io';
import CharityUxUiProject from './content/charity-ux-ui';
import CloudUrlStorageProject from './content/cloud-url-storage';
import AndroidNewsApiProject from './content/news-api';
import TransactionManagerProject from './content/transaction-manager';

function Content({ currentProject, onUpdateArticles }) {
  const projectNotFound = <div>Контент для проекта не определен</div>

  if (!currentProject) {
    return projectNotFound;
  }

  const renderProject = () => {
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
        {renderProject()}
      </div>
    </main>
  );
}

export default Content;
