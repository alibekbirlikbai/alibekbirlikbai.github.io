import Project1 from './github/project-content/project-1';

function Content({ currentProject, onUpdateArticles }) {
  const projectNotFound = <div>Контент для проекта не определен</div>

  if (!currentProject) {
    return projectNotFound;
  }

  const renderProject = () => {
    switch (currentProject.name) {
      case 'alibekbirlikbai':
        return <Project1 currentProject={currentProject} onUpdateArticles={onUpdateArticles} />;
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
