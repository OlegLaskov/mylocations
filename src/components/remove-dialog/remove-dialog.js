import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {dataSaved} from '../../actions';
import {withDataService} from '../hoc-helpers';
import {Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button} from '@material-ui/core';
import Icon from '../icon';

const RemoveDialog = (props) => {
    
    const {flags: {removing}, data, ind, name, type, onClose, dataSaved, dataService} = props;
    const action = 'Remove', 
        typeString = type.replace(/ies$/,'y').replace(/s$/,''),
        title = action.concat(' ', typeString);
    const onRemove = () => {
        let newData = {...data};
        newData[type] = [...data[type].slice(0, ind), ...data[type].slice(ind + 1)];
        dataService.saveData(newData);
        dataSaved(newData);
        //history.push('/'+type+'/');
    }
    return <Dialog open={removing} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> <Icon action={action} color="secondary"/> {title}</DialogTitle>
            <DialogContent>
                <Typography>
                    Do you really want to remove <span className="bold">{name}</span> {typeString}?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    No
                </Button>
                <Button onClick={onRemove} color="secondary" variant="contained" >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>;
}
const mapStateToProps = ({ data, flags}) => {
    return { data, flags };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        dataSaved
    }, dispatch);
}
export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps)
)(RemoveDialog);
