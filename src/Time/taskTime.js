
export const getTimeAgo = (timestamp) =>
{
    const now = Date.now();
    const diff = now - timestamp;
    
    //1000 means millisecond, we convert to second
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

    if (minutes < 1) 
        return "just now";

    if (minutes < 60) 
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    if (hours < 24) 
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    if (days < 7) 
        return `${days} day${days > 1 ? 's' : ''} ago`;

    if (weeks < 4) 
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    
    return `${months} month${months > 1 ? 's' : ''} ago`;
};

export const getTimeLabel = (props) => {
    if (props.status === 'todo') 
    {
        return `Created ${getTimeAgo(props.createdAt)}`;
    } 
    else if (props.status === 'doing') 
    {
        return `Started ${getTimeAgo(props.startedAt)}`;
    } 
    else if (props.status === 'done') 
    {
        return `Completed ${getTimeAgo(props.completedAt)}`;
    }
    return '';
};