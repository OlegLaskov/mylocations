import React from 'react';
import {FormControl, InputLabel, Select, MenuItem, Input} from '@material-ui/core';

export default ({categories, setCategory, value, isEditForm}) => {
    const categoryList = categories.map(({name}) => <MenuItem key={name} value={name}>{name}</MenuItem> );
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
    let required, fullWidth;
    isEditForm && (required = fullWidth = isEditForm);
    return <FormControl className ="input" required={required} fullWidth={fullWidth} >
        <InputLabel htmlFor="category">Category</InputLabel>
        <Select multiple
            value={value}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
            >
            {categoryList}
        </Select>
    </FormControl>;
}