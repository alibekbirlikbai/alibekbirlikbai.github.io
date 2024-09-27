import Project1 from './github/projects/project-1'
import Project2 from './github/projects/project-2'

function Content({ setProject, setLinks, currentRepo }) {
    const renderProject = () => {
        switch (currentRepo) {
          case 'project-1':
            return <Project1 setProject={setProject} setLinks={setLinks} />;
          case 'project-2':
            return <Project2 setProject={setProject} setLinks={setLinks} />;
          default:
            return <Project1 setProject={setProject} setLinks={setLinks} />;
        }
      };
    
    return (
        <main>
            <div className='app-content'>
                {renderProject()}
            </div>
        </main>
    );
};

export default Content;
