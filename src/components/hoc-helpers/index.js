import React from 'react';
import {DataServiceConsumer} from '../data-service-context';

export const withDataService = () => (Wrapped) => {
    return (props) => {
        return <DataServiceConsumer>
            {
                (dataService) => {
                    return <Wrapped {...props} dataService={dataService}/>;
                }
            }
        </DataServiceConsumer>
    };
};