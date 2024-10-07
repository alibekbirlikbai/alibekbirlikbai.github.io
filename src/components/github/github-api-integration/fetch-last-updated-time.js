import axios from 'axios';

export const fetchLastUpdatedTime = async (repoOwner, repoName) => {
    try {
        // Fetch all branches
        console.log(`Fetching branches for ${repoOwner}/${repoName}...`);  // Log the request
        const branchesResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/branches`);
        const branchesData = branchesResponse.data;

        // Fetch the latest commit from each branch
        console.log(`Fetching commits for ${repoOwner}/${repoName}...`);  // Log the request
        const commitPromises = branchesData.map(async (branch) => {
            const commitsResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits?sha=${branch.name}`);
            const commitsData = commitsResponse.data;
            return commitsData.length ? new Date(commitsData[0].commit.committer.date) : new Date(0); // Latest commit date or default
        });

        const commitDates = await Promise.all(commitPromises);
        console.log('Latest commit dates:', commitDates);  // Log the response data
        const latestCommitDate = new Date(Math.max(...commitDates));

        // Fetch pull requests
        const prsResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`);
        const prsData = prsResponse.data;
        const lastPRDate = prsData.length ? new Date(Math.max(...prsData.map(pr => new Date(pr.updated_at)))) : new Date(0);

        // Return the most recent date
        return new Date(Math.max(latestCommitDate, lastPRDate));
    } catch (error) {
        console.error('Error fetching last update time:', error);
        return new Date(0); // Return default date in case of error
    }
};

export default fetchLastUpdatedTime;
