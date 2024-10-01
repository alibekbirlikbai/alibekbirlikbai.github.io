import fetchGithubData from './github-api-integration'

export const fetchProjects = async () => {
    try {
        return await fetchGithubData();
    } catch (error) {
        console.error('Error fetching projects from GitHub:', error);
        return [];
    }
};

export default fetchProjects;