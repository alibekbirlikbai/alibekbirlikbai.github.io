import Project1 from './projects/project-1'
import Project2 from './projects/project-2'

function Content({ setProject, setLinks }) {
    return (
        <main>
            <div className='app-content'>
                {/* Pass setLinks to Project1 so it can update the sidebar */}
                <Project1 setProject={setProject} setLinks={setLinks} />
                {/* <Project2/> */}
            </div>
        </main>
    );
};

export default Content;
