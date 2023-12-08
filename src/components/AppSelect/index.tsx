import { MenuItem, Select } from "@mui/material"
import { appSelectType } from "./types"

export const AppSelect = ({ id, placeholder, value, error, onChange, options = [], multiple=false, variant, className}: appSelectType) => {
  return(
    <Select
      id={id}
      className={`select ${className}`}
      classes={{ icon: 'icon'}}
      inputProps={{ className: 'input' }}
      displayEmpty
      variant={variant}
      multiple={multiple}
      value={value}
      error={error}
      onChange={onChange}
    >
      {placeholder && <MenuItem value="" disabled className="menu-item">
        {placeholder}
      </MenuItem>}
      {options.map((opt, index) => <MenuItem
          className="menu-item"
          key={index}
          value={opt}
          classes={{ selected: 'selected' }}
        >
          {opt}
        </MenuItem>)}
    </Select>
  )
}