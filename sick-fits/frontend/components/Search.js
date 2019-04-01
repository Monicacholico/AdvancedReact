import React from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import {ApolloConsumer} from 'react-adopt';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles} from './styles/DropDown';


class AutoComplete extends React.Component {
    render(){
        return(
        <SearchStyles>
            <div>
                <input type="search"/>
                <Dropdown>
                    <p>Items will go here</p>
                </Dropdown>
            </div>
        </SearchStyles>
        );
    }
}

