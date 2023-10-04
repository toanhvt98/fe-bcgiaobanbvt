import { useFormContext, Controller } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import { useEffect } from "react";

function FKRadioGroup({ name, options, getOptionLabel,selectedGroup, onSelectGroup,...other }) {
  const { control,setValue } = useFormContext();
  useEffect(() => {
    if (selectedGroup && selectedGroup !== name) {
      setValue(name, null);
    }
  }, [selectedGroup, name, setValue]);
  
  const handleSelect = () => {
    if (onSelectGroup) onSelectGroup();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

export default FKRadioGroup;