import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

export default withRouter((props) => {
  const path = props.location.pathname.split('/')[1];
  return (
    <BottomNavigation
      value={path}
      showLabels
    >
      <BottomNavigationAction component={Link} to="/locations/" label="Locations" value="locations" icon={<LocationOnIcon />} />
      <BottomNavigationAction component={Link} to="/categories/" label="Categories" value="categories" icon={<BookmarkIcon />} />
    </BottomNavigation>
  );
});