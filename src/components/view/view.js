import React from 'react';
import {connect} from 'react-redux';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Paper, Tabs, Tab, Box} from '@material-ui/core';
import Map from '../map';

const TabPanel = (props) => {
    const { children, value, index } = props;
    return <div  role="tabpanel" hidden={value !== index} className="tab"
            id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
        {children}
    </div>
}
const tabProps = (index) => {
    return {
        id: `tab-${index}`,
        'area-controls': `tabpanel-${index}`
    };
}

const getPositionFromString = (coordinates) => {
    const coordArray = coordinates.split(',');
    return {lat: coordArray[0], lng: coordArray[1]}
}

const View = (props) => {
    const {flags: {viewing}, data, item, name, onClose} = props;

    const marker = data.locations.map(({coordinates, name}) => {
        const position = getPositionFromString(coordinates);
        return {name, position};
    })

    const [value, setValue] = React.useState(0);
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    const initialCenter = getPositionFromString(item.coordinates);
    
    const Details = () => {
        return <Box p={3}>
                <Typography>{item.name}</Typography>
                <Typography>{item.category}</Typography>
                <Typography>{item.address}</Typography>
                <Typography>{item.coordinates}</Typography>
        </Box>;
    }
    const ViewMap = () => {
        return <div className="map-edit">
            <Map name={name} initialCenter={initialCenter} marker={marker} viewing={true} />
        </div>;
    }

    return <Dialog open={viewing} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle >View locations</DialogTitle>
        <DialogContent>
            <Paper className="view-tab">
                <Tabs indicatorColor="primary" textColor="primary" centered
                        value={value} onChange={handleChange} aria-label="tabs">
                    <Tab label="Details" {...tabProps(0)} />
                    <Tab label="Map" {...tabProps(1)} />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <Details/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ViewMap/>
            </TabPanel>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                Close
            </Button>
        </DialogActions>
    </Dialog>
}
const mapStateToProps = ({ data, flags}) => {
    return { data, flags };
};
export default connect(mapStateToProps)(View);
