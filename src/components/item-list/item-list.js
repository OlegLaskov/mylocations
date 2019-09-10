import React, { Component } from 'react';
import {withRouter, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {dataLoaded} from '../../actions';
import {withDataService} from '../hoc-helpers';

class ItemList extends Component {

    componentDidMount(){
        const {dataService, dataLoaded} = this.props;
        const data = dataService.getData();
        dataLoaded(data);
        if(!data.categories.length){
            this.props.history.push('/categories/');
        }
    }

    render(){
        const item = this.props.location.pathname.split('/'),
            type = item[1],
            id = item[2];
        let itemList;
        const {data, flags: {groupByCategory, categoryFilter}} = this.props;
        if(data && data[type]){
            let items = data[type];

            if(id && data[type].findIndex((i) => i.name === id) === -1) return <Redirect to={'/' + type + '/'}/>;

            if(type === 'locations'){

                if(categoryFilter.length > 0){
                    items = items.filter(({category}) => category.filter((value) => categoryFilter.indexOf(value) !== -1).length > 0);
                } else {
                    items = [...items];
                }
                if(groupByCategory) {
                    items.sort((a,b) => {
                        if(a.category > b.category) return 1;
                        if(a.category < b.category) return -1;
                        if(a.name > b.name) return 1;
                        if(a.name < b.name) return -1;
                        return 0;
                    })
                }
            }
            itemList = items.map(({name, category}) => {
                let className = id === name ? "list-group-item selected-item " : "list-group-item ";
                const categoryStr = category ? category.join(', ') : null;
                const content = type === 'locations' ? <div className={type}><div>{name}</div>
                    <div>{categoryStr}</div></div> : <div className={type}><div>{name}</div></div>;

                return <Link className="link" key={name} to={encodeURIComponent(name)}>
                    <li className={className}>{content}</li>
                </Link>
            });
        }
        return <div>
            <ul className="list">
                {itemList}
            </ul>
        </div>;        
    }
}

const mapStateToProps = ({ data, flags}) => {
    return { data, flags };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        dataLoaded
    }, dispatch);
}

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(ItemList));
