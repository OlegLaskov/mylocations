import React, { Component } from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addItem, editItem, removeItem, view, setGroupByCategory, setCategoryFilter} from '../../actions';
import {CssBaseline, Typography, Container, Button, FormGroup, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, Input} from '@material-ui/core';
import ItemList from '../item-list';
import BottomBar from '../bottom-bar';
import EditForm from '../edit-form';
import RemoveDialog from '../remove-dialog';
import View from '../view';
import './app.css';

class App extends Component {
    
    render(){
        const path = this.props.location.pathname.split('/'),
            type = path[1],
            id = path[2];
        const {data, flags: {adding, editing, removing, viewing, groupByCategory, categoryFilter}, addItem, 
            editItem, removeItem, view, setGroupByCategory, setCategoryFilter} = this.props;
        let modalWindow = null, filterPanel = null;
        if(data && data.categories && type === 'locations'){
            const categoryList = data.categories.map(({name}) => <MenuItem key={name} value={name}>{name}</MenuItem> );
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
            filterPanel = <div className="filter-panel">
                <Container maxWidth="sm">
                    <FormGroup className="filter-panel-group">
                        <div  className="filter-panel-form locations">
                            <FormControlLabel
                                control={
                                <Checkbox checked={groupByCategory} onChange={() => setGroupByCategory()} color="primary" />
                                }
                                label="Group by category"
                            />
                            <FormControl className ="input">
                                <InputLabel htmlFor="category">Category</InputLabel>
                                <Select multiple
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    name="category"
                                    input={<Input id="select-multiple" />}
                                    MenuProps={MenuProps}
                                    >
                                    {categoryList}
                                </Select>
                            </FormControl>
                        </div>
                    </FormGroup>
                </Container>
            </div>;
        }
        if(viewing){
            let item = {};
            const ind = id ? data[type].findIndex((i) => i.name === id) : null,
                onClose = () => {view(false)};
            if(id) item = data[type][ind];
            modalWindow = <View  ind={ind} item={item} name={id} onClose={onClose} type={type}/>;
        } else if(removing){
            const ind = data[type].findIndex((i) => i.name === id),
                onClose = () => {removeItem(false)};
            modalWindow = <RemoveDialog  ind={ind} name={id} onClose={onClose} type={type}/>;
        } else if(editing || adding){
            let item = {}, 
                ind = -1,
                onClose;
            if(editing){
                item.name = id;
                ind = data[type].findIndex((i) => i.name === item.name);
                onClose = () => {editItem(false)};
                if(type !== 'categories'){
                    item = {...data[type][ind]};
                }
            } else {
                onClose = () => {addItem(false)};
                if(type === 'locations'){
                    item = {...item, category: "", address: "", coordinates: ""};
                } else item.name = "";
            } 
            modalWindow = <EditForm ind={ind} item={item} onClose={onClose} type={type} />;
        }
        return <div className="root">
            <CssBaseline />
            <Container component="header" className="header" maxWidth="sm">
                <Typography variant="h2" component="h1"  className="subtitle">
                    My Locations
                </Typography>
            </Container>
            <div className="bar-actions" >
                <Container className="actions" maxWidth="sm">
                    <Button variant="contained" color="primary" className="btn add" onClick={() => addItem(true)} >
                        + Add
                    </Button>
                    <Button variant="contained" color="primary" className="btn view" onClick={() => view(true)} disabled={!id || type === 'categories'} >
                        View
                    </Button>
                    <Button variant="contained" color="primary" className="btn edit" onClick={() => editItem(true)} disabled={!id} >
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" className="btn remove" onClick={() => removeItem(true)} disabled={!id} >
                        Remove
                    </Button>
                </Container>
                {filterPanel}
            </div>
            <Container component="main" className="main" maxWidth="sm">
                <Route path={"/"} exact render={ () => <Redirect to="/locations/" />} />
                <ItemList />
            </Container>
            <footer className="footer"><BottomBar value="locations" /></footer>
            {modalWindow}
        </div>;
    }
}
const mapStateToProps = ({ data, flags}) => {
    return { data, flags };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addItem, editItem, removeItem, view, setGroupByCategory, setCategoryFilter
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
