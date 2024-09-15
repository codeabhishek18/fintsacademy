const options = { year: 'numeric', month: 'long', day: 'numeric' };

export const FormatTime = (date) =>
{
    const currentDate = new Date();
    const compareDate = new Date(date);

    if(currentDate.getFullYear() - compareDate.getFullYear() < 1)
    {
        if(currentDate.getMonth()- compareDate.getMonth() < 1)
        {
            if((currentDate.getDate() - compareDate.getDate()) < 1)
            {
                if(currentDate.getHours() - compareDate.getHours() < 1)
                {
                    if(currentDate.getMinutes() - compareDate.getMinutes() < 1)
                        return 'Just now'
                    else if(currentDate.getMinutes() - compareDate.getMinutes() === 1)
                        return currentDate.getMinutes() - compareDate.getMinutes() +' minute ago'
                    else
                        return currentDate.getMinutes() - compareDate.getMinutes() +' minutes ago'
                }
                else if(currentDate.getHours() - compareDate.getHours() === 1)
                    return currentDate.getHours() - compareDate.getHours() +' hour ago'
                else
                    return currentDate.getHours() - compareDate.getHours() +' hours ago'  
            }
            else if(currentDate.getDate() - compareDate.getDate() === 1)
                return currentDate.getDate() - compareDate.getDate() +' day ago'
            else if(currentDate.getDate() - compareDate.getDate() >=  14)
                return Math.floor((currentDate.getDate() - compareDate.getDate())/7) + 'weeks ago'
            else if(currentDate.getDate() - compareDate.getDate() >=  7)
                return Math.floor((currentDate.getDate() - compareDate.getDate())/7) + 'week ago'
            else
                return currentDate.getDate() - compareDate.getDate() +' days ago'
        }
        else if(currentDate.getMonth()- compareDate.getMonth() === 1)
            return currentDate.getMonth() - compareDate.getMonth() +' month ago'
        else
            return currentDate.getMonth() - compareDate.getMonth() +' months ago'
    }
    else if(currentDate.getFullYear() - compareDate.getFullYear() === 1)
        return currentDate.getFullYear() - compareDate.getFullYear() +' year ago'
    else
        return currentDate.getFullYear() - compareDate.getFullYear() +' years ago'
}