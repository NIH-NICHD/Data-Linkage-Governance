import React, { useContext } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, IconButton, TextField, Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

import glossaryData from './glossary.json';
import { VizContext } from '../reducer/VizContextProvider';
import { actionTypes } from '../reducer/reducer';

const extractLink = (definition) => {
  const linkRegex = /\(modified from source: (https?:\/\/[^\s]+)\)|\(source: (https?:\/\/[^\s]+)\)/;
  const match = definition.match(linkRegex);
  if (match) {
    return { text: definition.replace(linkRegex, ''), link: match[1] };
  }
  return { text: definition, link: null };
};

const Glossary = () => {
  const [state, dispatch] = useContext(VizContext);

  const handleSearchChange = (event) => {
    dispatch({
      type: actionTypes.updateGlossary,
      searchValue: event.target.value
    })
  };

  const filteredGlossaryData = glossaryData.filter((term) =>
    term.label.toLowerCase().includes(state.glossarySearch.toLowerCase())
  );

  if(filteredGlossaryData.length === 0) {
    filteredGlossaryData.push({label: 'Nothing found', definition: ''});
  }
  return (
    <Container>
      <Typography variant="h4">
        Glossary 
      </Typography>
      <Typography varient="p" gutterBottom>
      <span style={{color: 'gray'}}>Taken from the Schema Data Dictionary Version 4</span>
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={state.glossarySearch}
        onChange={handleSearchChange}
      />
      <List>
        {filteredGlossaryData.map((term, index) => {
          const { text, link } = extractLink(term.definition);
          return (
            <Paper key={index} style={{ padding: '16px', marginBottom: '16px', position: 'relative' }}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box>
                      {term.label}
                      {link && (
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          style={{ marginLeft: '8px' }}
                        >
                          (modified from source)
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                  }
                />
                {link && (
                  <IconButton
                    edge="end"
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ position: 'absolute', top: '8px', right: '8px' }}
                  >
                    <LinkIcon />
                  </IconButton>
                )}
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </Container>
  );
};

export default Glossary;
