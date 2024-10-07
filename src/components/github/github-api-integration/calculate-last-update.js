import React, { useEffect, useState } from 'react';

import fetchLastUpdatedTime from './fetch-last-updated-time'

const CalculateLastUpdate = ({ currentProject }) => {
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        const updateLastUpdatedTime = async () => {
            const repoOwner = currentProject.owner.login;
            const repoName = currentProject.name;

            try {
                const lastUpdateDate = await fetchLastUpdatedTime(repoOwner, repoName);
                setLastUpdated(getTimeAgo(lastUpdateDate));
            } catch (error) {
                console.error('Error fetching last update time:', error);
            }
        };

        updateLastUpdatedTime();
    }, [currentProject]);

    // Function to format time into a readable format
    const getTimeAgo = (date) => {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
    
        if (seconds < 60) {
            return `${seconds} секунд${seconds === 1 ? 'у' : 'ы'} назад`; // Seconds
        }
    
        let interval = Math.floor(seconds / 31536000); // years
        if (interval === 1) return `${interval} год назад`; // 1 year
        if (interval > 1 && interval < 5) return `${interval} года назад`; // 2-4 years
        if (interval >= 5) return `${interval} лет назад`; // 5+ years
    
        interval = Math.floor(seconds / 2592000); // months
        if (interval === 1) return `${interval} месяц назад`; // 1 month
        if (interval > 1 && interval < 5) return `${interval} месяца назад`; // 2-4 months
        if (interval >= 5) return `${interval} месяцев назад`; // 5+ months
    
        interval = Math.floor(seconds / 86400); // days
        if (interval === 1) return `${interval} день назад`; // 1 day
        if (interval > 1 && interval < 5) return `${interval} дня назад`; // 2-4 days
        if (interval >= 5) return `${interval} дней назад`; // 5+ days
    
        interval = Math.floor(seconds / 3600); // hours
        if (interval === 1) return `${interval} час назад`; // 1 hour
        if (interval >= 2) return `${interval} часов назад`; // 2+ hours

        interval = Math.floor(seconds / 60); // minutes
        if (interval === 1) return `${interval} минуту назад`; // 1 minute
        if (interval > 1 && interval < 5) return `${interval} минуты назад`; // 2-4 minutes
        if (interval >= 5) return `${interval} минут назад`; // 5+ minutes

        return 'только что'
    };
    


    return (
        <span>
            {lastUpdated}
        </span>
    );
};

export default CalculateLastUpdate;
