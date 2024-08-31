import { usePathname, useRouter } from 'next/navigation';
import styles from './ForumSearchbar.module.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const ForumSearchbar = ({searchQuery, getDiscussions, handleChange}) =>
{
    const pathname = usePathname();
    const router = useRouter();

    const handleFilterChange = () => 
    {
        const filteredQuery = Object.fromEntries(Object.entries(searchQuery).filter(([key,value]) => value?.trim() !== ''));
        const newURL = new URLSearchParams(filteredQuery);
        const queryURL = `${pathname}?${newURL.toString()}`
        router.push(queryURL);
        getDiscussions(`/api/forum?${newURL.toString()}`)
    };

    const handleClear = () =>
    {
        router.push(pathname)
        getDiscussions('/api/forum')
    }

    return(
        <div className={styles.container}>
            <TextField
                size='small' variant='outlined' label="Search"
                color='grey' className={styles.input} 
                value={searchQuery.search} name="search" 
                onChange={(e)=> handleChange('search', e.target.value)}
            />
            <FormControl fullWidth>
                <InputLabel size='small' color='grey'>Discussions</InputLabel>
                <Select size='small' color='grey'  name="order"value={searchQuery.order} 
                    onChange={(e)=> handleChange('order', e.target.value)}>
                    <MenuItem value="" disabled>Discussions</MenuItem>
                    <MenuItem value="dec">New to old</MenuItem>
                    <MenuItem value="asc">Old to new</MenuItem>
                </Select>
            </FormControl>

            <button className={styles.clear} onClick={handleFilterChange}>Search</button>  
            <button className={styles.clear} onClick={handleClear}>Clear</button>        
        </div>
    )
}

export default ForumSearchbar