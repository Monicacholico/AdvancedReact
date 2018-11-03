import React, {Component} from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';

const theme = {
    red: '#FF0000',
    black: '#393939',
    grey: '#3a3a3a',
    lightGrey: '#E1E1E1',
    offWhite: 'EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};


const StyledPage = styled.div`
background: white;
color: ${props => props.theme.black};
`;

const Inner = styled.div`
max-width: ${props => props.theme.maxWidth};
margin: 0 auto;
padding: 2rem;
`;


class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    <Header/>
                    {/*<MyButton>*/}
                    {/*Click Me*/}
                    {/*<span className="poop"></span>*/}
                    {/*</MyButton>*/}
                    {this.props.children}
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default Page;