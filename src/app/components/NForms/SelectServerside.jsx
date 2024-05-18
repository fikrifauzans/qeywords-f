import { useState, useEffect, Fragment } from 'react';
import { Autocomplete, CircularProgress, styled, TextField } from '@mui/material';
import { GET_SERVER } from 'app/server/Api';
import toaster, { TOASTER_ERROR } from 'app/helpers/functions/Toaster';

const AutoComplete = styled(Autocomplete)(() => ({ width: '100%' }));

export default function SelectServerside({
    onChange, getOptionLabel, value, label, error, helperText, onClear, params = {}, api = 'base/base-crud'
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const loading = open && options.length === 0;
    const onOpen = async () => {
        setOpen(true)
        GET_SERVER(api, params, async (response) => setOptions(response.data.data), (err) => {
            toaster('Error fetching API', TOASTER_ERROR)
        })
    }
    const onInputChange = (event, v, reeason) => {
        if (reeason === 'clear') onClear()
        else onChange(value)
    }


    return (
        <AutoComplete
            open={open}
            options={options}
            loading={loading}
            id="asynchronous-demo"
            value={value}
            onOpen={onOpen}
            onClose={() => setOpen(false)}
            onChange={(evt, v) => onChange(v)}
            onInputChange={onInputChange}
            getOptionLabel={getOptionLabel}
            clearOnBlur={true}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={helperText}
                    fullWidth
                    variant="outlined"
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        )
                    }}
                />
            )}
        />
    );
}
