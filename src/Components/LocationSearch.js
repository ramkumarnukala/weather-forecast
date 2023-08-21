import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { LocationSearching } from "@mui/icons-material";
import styled from "styled-components";

function LocationSearch() {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  //   useEffect(() => {
  //     if (!loading) {
  //       return undefined;
  //     }

  //     (async () => {
  //       await new Promise((resolve) => {
  //         setTimeout(resolve, 3000);
  //       })
  //       .then((reponse) => {
  //         setOptions([{
  //             title: "Tenali"
  //         }]);
  //       });
  //     })();
  //   }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <StyledDiv className={theme}>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 500 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            className={theme}
            variant="standard"
            label="Location Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <LocationSearching sx={{ fontSize: "16px" }} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </StyledDiv>
  );
}

export default LocationSearch;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;

  .light-theme {
    background-color: white !important;
    color: black !important;
    fill: black !important;
    --text-primary: var(--text-primary-light) !important;
    --text-secondary: var(--text-secondary-light) !important;
    --bg-primary: var(--bg-primary-light) !important;
    --bg-secondary: var(--bg-secondary-light) !important;
    border-bottom: 1px solid black;
  }

  .dark-theme {
    background-color:  rgb(34, 34, 34) !important;
    color: white !important;
    fill: white !important;
    --text-primary: var(--text-primary-dark) !important;
    --text-secondary: var(--text-secondary-dark) !important;
    --bg-primary: var(--bg-primary-dark) !important;
    --bg-secondary: var(--bg-secondary-dark) !important;
    border-bottom: 1px solid white;
  }

  .MuiFormLabel-root, .MuiFormLabel-root.Mui-focused, .MuiInputBase-root {
    color: inherit;
  }

  > div > div > div:before, > div > div > div:after {
    border-bottom: inherit;
  }

  > div > div > div:hover {
    border-bottom: 0px;
  }

  svg, .css-i4bv87-MuiSvgIcon-root{
    color: inherit;
    fill: inherit;
  }
`;
