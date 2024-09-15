export const formatChatTime = (date) =>
{
    const currentDate = new Date();
    const compareDate = new Date(date);

   
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
        return 'Yesterday'
    else if(currentDate.getDate() - compareDate.getDate() >= 7)
        return compareDate.getDate() +'/' +compareDate.getMonth() +'/' +compareDate.getFullYear();
    else
        return compareDate.getDay() +' days ago';
    
}