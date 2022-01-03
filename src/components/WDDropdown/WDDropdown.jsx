import './WDDropdown.scss';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, Category, theme) {
  return {
    fontWeight:
      Category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function WDDropdown({ selectedItems, handleChange, menuItems, title }) {
  const theme = useTheme();
  return <div className="wd-admin-dropdown">
    <FormControl sx={{ width: '100%' }} margin="normal">
      <Autocomplete
        multiple
        id="tags-outlined"
        options={menuItems}
        getOptionLabel={(option) => option.name}
        value={selectedItems}
        onChange={handleChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label={title}
            placeholder={title}
          />
        )}
      />
    </FormControl>
  </div>
}
