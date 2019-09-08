import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default (props) => {
    const {action} = props;
    let path;
    switch(action){
        case 'Add':
            path = <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>;
            break;
        case 'Edit':
            path = <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>;
            break;
        case 'Remove':
            path = <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>;
            break;
        default:
            path = <path d=""/>;
    }
    return (
        <SvgIcon {...props}>
            {path}
        </SvgIcon>
    );
  }
