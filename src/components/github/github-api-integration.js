import axios from "axios"

const GIHUB_URL = "https://api.github.com/users/alibekbirlikbai/repos"

export const fetchGithubData = async () => {
    try {
        const response = await axios.get(GIHUB_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return []
    }
}

export default fetchGithubData;