import Project1 from './github/project-content/project-1';
import Project2 from './github/project-content/project-2';

function Content({ currentProject }) {
  const projectNotFound_html = <div>Контент для проекта не определен</div>

  if (!currentProject) {
    return projectNotFound_html;
  }

  const renderProject = () => {
    switch (currentProject.name) {
      case 'alibekbirlikbai':
        return <Project1 currentProject={currentProject} />;
      case 'project-2':
        return <Project2 currentProject={currentProject} />;
      default:
        return projectNotFound_html;
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
