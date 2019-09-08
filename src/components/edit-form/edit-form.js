import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {dataSaved} from '../../actions';
import {withDataService} from '../hoc-helpers';
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
    FormControl, InputLabel, Select, MenuItem, FormHelperText} from '@material-ui/core';
import Icon from '../icon';
import Map from '../map';

class EditForm extends Component {
    state = {...this.props.item, isValid: false};
    ind = this.props.ind;
    type = this.props.type;
    typeString = this.type.replace(/ies$/,'y').replace(/s$/,'');

    componentDidMount = () => {
        const {coordinates} = this.state;
        if(!coordinates || !this.coordinatesIsValid(coordinates)) {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
                    const initialCenter = {lat: latitude, lng: longitude};
                    this.setState({initialCenter});
                })
            }
        }
    }

    onClose = () => {this.props.onClose()}

    onKeyUp = ({keyCode}) => {
        if(keyCode === 13) this.onSave();
    }
    onSave = () => {
        const {dataSaved, dataService} = this.props;
        if(!this.state.isValid){
            this.setState({error: "All fields should filled"});
            return;
        }
        let error = this.sameName(this.state.name) || (this.type === 'locations' && this.coordinatesError(this.state.coordinates));
        if(error) {
            this.setState({error});
            return;
        }
        const newData = this.updateData();
        dataService.saveData(newData);
        dataSaved(newData);
    }
    checkValid = (pass) => {
        for(let field in this.state){
            if(field === pass || field === 'isValid' || field === 'error' || field === 'initialCenter') continue;
            if(!this.state[field]) return false;
            if(field === 'coordinates' && this.type === 'locations' && !this.coordinatesIsValid(this.state[field])) return false;
        }
        return true;
    }
    sameName = (name) => {
        const ind = this.props.data[this.type].findIndex((item) => item.name === name);
        const result = ind !== this.ind && ind !== -1;
        const error = result ? `There is already a ${this.typeString} with that name` : null;
        return error;
    }
    updateData = () => {
        const {flags: {editing}} = this.props;
        let newData = {...this.props.data},
            newItem = {...this.state};
        delete newItem.isValid;
        delete newItem.error;
        if(editing){
            newData[this.type] = [...newData[this.type].slice(0, this.ind), newItem, ...newData[this.type].slice(this.ind + 1)];
        } else {
            newData[this.type].push(newItem);
        }
        newData[this.type].length > 1 && newData[this.type].sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        return newData;
    }
    onChange = ({target: {name, value}}) => {
        let isValid = value !== "" && this.checkValid(name);
        let error;
        if(name === 'name') error = this.sameName(value);
        if(name === 'coordinates') {
            error = this.coordinatesError(value);
        }
        this.setState({[name]: value, isValid, error});
    }
    coordinatesFromMap = (lat, lng) => {
        const isValid = this.checkValid('coordinates');
        this.setState({coordinates: lat + ', ' + lng, isValid});
    }
    coordinatesIsValid = (coordinates) => coordinates && coordinates.match(/^ *-?[0-9]+\.?[0-9]* *, *-?[0-9]+\.?[0-9]* *$/);
    coordinatesError = (coordinates) => this.coordinatesIsValid(coordinates) ? null : 'The coordinates is NOT valid';

    renderAdditinalFields = () => {
        const {data} = this.props;
        let additinalFields = null;
        if(this.type === 'locations' && data.categories){
            const categoryList = data.categories.map(({name}) => <MenuItem key={name} value={name}>{name}</MenuItem> );
            const {name, address, coordinates, category, initialCenter} = this.state;
            let marker;
            if(coordinates && this.coordinatesIsValid(coordinates)){
                const coordArray = coordinates.split(',');
                marker = {lat: coordArray[0], lng: coordArray[1]};
            }
            additinalFields = <React.Fragment>
                <FormControl required fullWidth className ="input">
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select 
                        value={category}
                        onChange={this.onChange}
                        name="category"
                        inputProps={{
                            id: 'category',
                        }}
                        >
                        {categoryList}
                    </Select>
                </FormControl>
                <TextField required margin="dense" name="address" label="Address" type="text" fullWidth 
                    onChange={this.onChange} defaultValue={address}
                />
                <TextField required margin="dense" name="coordinates" label="Coordinates" type="text" fullWidth 
                    onChange={this.onChange} value={coordinates}
                />
                <div className="map-edit"><Map name={name} coordinatesFromMap={this.coordinatesFromMap} marker={marker} initialCenter={initialCenter} center={initialCenter} /></div>
            </React.Fragment>;
        }
        return additinalFields;
    }
    render(){
        const {flags: {adding, editing, removing}} = this.props;
        const {error, name, isValid} = this.state;
        const action = removing ? 'Remove' : editing ? 'Edit' : 'Add';
        const title = action.concat(' ', this.typeString);
        const additinalFields = this.renderAdditinalFields();
        return <Dialog open={adding || editing} onClose={this.onClose} aria-labelledby="form-dialog-title" onKeyUp={this.onKeyUp}>
            
            <DialogTitle id="form-dialog-title"> <Icon action={action} color="secondary"/> {title}</DialogTitle>
            <DialogContent>
                <FormHelperText error>{error}</FormHelperText>
                <TextField required autoFocus margin="dense" name="name" label="Name" type="text" fullWidth 
                    onChange={this.onChange} defaultValue={name}
                />
                {additinalFields}
            </DialogContent>
            <DialogActions>
                <Button onClick={this.onClose}>
                    Cancel
                </Button>
                <Button onClick={this.onSave} color="primary" variant="contained" disabled={!isValid} >
                    Save
                </Button>
            </DialogActions>
        </Dialog>;
    }
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
)(EditForm);