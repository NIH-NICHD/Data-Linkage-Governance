
import React, {  } from 'react';
import { List, styled, ListItem, Stack } from '@mui/material';
import { SubdirectoryArrowRight } from '@mui/icons-material';

const CustomListItem = styled(ListItem)(({ theme }) => ({
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
}));

/* 
Creates a bulleted list
    Required props:
        items - a list of items to be displayed in the list
    Optional props: 
        itemModifier - a function that accepts an item and returns a modified version of the item to be displayed
        icon - The icon to use for the list bullets, defaults to the angled arrow
*/
export const BulletedList = ({ items, itemModifier, icon }) => {
    itemModifier = itemModifier ? itemModifier : (item) => {return item};
    icon = icon ? icon :  <SubdirectoryArrowRight fontSize='small' sx={{ color: 'gray' }} />;
    return (
      <List sx={{ listStyleType: 'none', pl: 2, fontStyle: 'italic', marginLeft: '24px', paddingTop: 0, paddingBottom: 0 }}>
        {items.map((item, index) => (
          <CustomListItem key={index} disableGutters sx={{ display: 'list-item', pl: 0 }}>
            <Stack direction ='row' alignItems={'center'}>
              {icon}
              {itemModifier(item)}
            </Stack>
          </CustomListItem>
        ))}
      </List>
    );
  };