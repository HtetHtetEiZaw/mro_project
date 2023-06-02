import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface EmployeeProps {
   
}
const SearchComponent: React.FC<EmployeeProps> = () => {
    const handleSearch = () => {
        // Perform search functionality here
      };
      return (
        <>
           <TextField sx={{pl:5}}
                    variant="standard"
                    placeholder="ユーザー名を入力してください。"
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleSearch}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
        </>
      )
  

};
export default SearchComponent;