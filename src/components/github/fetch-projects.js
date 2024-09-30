import fetchGithubData from './github-api-integration'

export const fetchProjects = async () => {
    try {
        const response = await fetchGithubData();
        const projects = response.map(repo => ({
            repo: repo.name,
            title: repo.description || '',
        }));
        return projects;
    } catch (error) {
        console.error('Error fetching projects from GitHub:', error);
        return [];
    }
};

export default fetchProjects;