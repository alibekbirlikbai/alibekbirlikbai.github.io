const prioritizedStacks = ['open-source-contribution', 'university-project'];

const styles = {
    openSource: {
        backgroundColor: '#785dc8',
    },
    universityProject: {
        backgroundColor: '#2f81f7',
    },
  };
  
  const PrioritizeSpecificStack = ({ currentProject }) => {
    return (
      <ul className='stack-list'>
        {currentProject.topics
          .sort((a, b) => {
            const indexA = prioritizedStacks.indexOf(a);
            const indexB = prioritizedStacks.indexOf(b);
            if (indexA !== -1 && indexB === -1) return -1;
            if (indexA === -1 && indexB !== -1) return 1;
            return 0;
          })
          .map(skill => {
            const isOpenSource = skill === 'open-source-contribution';
            const isUniversityProject = skill === 'university-project';
  
            return (
              <li
                key={skill}
                style={
                  isOpenSource
                    ? styles.openSource
                    : isUniversityProject
                    ? styles.universityProject
                    : {}
                }
              >
                {skill
                  .replace(/-/g, ' ')
                  .replace(/\b\w+/g, word =>
                    word.toLowerCase() === 'api'
                      ? 'API'
                      : word.charAt(0).toUpperCase() + word.slice(1)
                  )}
              </li>
            );
          })}
      </ul>
    );
  };
  

export default PrioritizeSpecificStack
