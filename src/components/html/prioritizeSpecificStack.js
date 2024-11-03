const prioritizedStacks = ['open-source', 'university-project', 'api'];

const styles = {
  openSource: {
    backgroundColor: '#785dc8',
  },
  universityProject: {
    backgroundColor: '#2f81f7',
  },
  api: {
    backgroundColor: '#b99402',
  },
};

const PrioritizeSpecificStack = ({ currentProject }) => {
  return (
    <ul className="stack-list">
      {currentProject.topics
        .sort((a, b) => {
          // Get the index of each skill in prioritizedStacks
          const indexA = prioritizedStacks.findIndex(stack => a.includes(stack));
          const indexB = prioritizedStacks.findIndex(stack => b.includes(stack));

          // Items in prioritizedStacks come first in the exact order
          if (indexA !== -1 && indexB !== -1) return indexA - indexB; // Sort according to prioritizedStacks order
          if (indexA !== -1) return -1; // a has priority, so it comes first
          if (indexB !== -1) return 1;  // b has priority, so it comes first
          return 0; // Otherwise, keep the original order
        })
        .map(skill => {
          const isOpenSource = skill === 'open-source';
          const isUniversityProject = skill === 'university-project';
          const isApi = skill.toLowerCase().includes('api');

          return (
            <li
              key={skill}
              style={
                isOpenSource
                  ? styles.openSource
                  : isUniversityProject
                  ? styles.universityProject
                  : isApi
                  ? styles.api
                  : {}
              }
            >
              {(skill.toLowerCase() === 'ci-cd'
                ? 'CI/CD'
                : skill
                    .replace(/-/g, ' ')
                    .replace(/\b\w+/g, word => 
                      word.toLowerCase() === 'api'
                        ? 'API'
                        : word.charAt(0).toUpperCase() + word.slice(1)
                    )
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default PrioritizeSpecificStack;
