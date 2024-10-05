import axios from 'axios';
import fetchLastUpdatedTime from './fetch-last-updated-time'
import GITHUB_TOKEN from './GITHUB_TOKEN'

const GIHUB_URL = "https://api.github.com/users/alibekbirlikbai/repos"

export const fetchGithubData = async () => {
    try {
        console.log('Fetching GitHub repositories...'); 
        const response = await axios.get(GIHUB_URL, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}` 
            }
        });
        console.log('GitHub response:', response.data);  
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return []
    }
}

export const fetchProjects = async () => {
    try {
        const projects = await fetchGithubData();

        // // Fetch the last updated time for each project
        // const projectsWithUpdateTimes = await Promise.all(projects.map(async (project) => {
        //     const lastUpdatedTime = await fetchLastUpdatedTime(project.owner.login, project.name);
        //     return {
        //         ...project,
        //         lastUpdatedTime
        //     };
        // }));
        // projectsWithUpdateTimes.sort((a, b) => b.lastUpdatedTime - a.lastUpdatedTime);

        // Sort projects by lastUpdatedTime (most recent first)
        return projects ; 
    } catch (error) {
        console.error('Error fetching projects from GitHub:', error);
        return [];
    }
};

export default fetchProjects;