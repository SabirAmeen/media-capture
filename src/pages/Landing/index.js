import React from 'react';
import Paper from '@material-ui/core/Paper';
import UserMedia from './components/UserMedia';
import { Header } from '../../styles/commonStyles'
import LandingStyled from './styled';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <LandingStyled>
                <Header>Media capture in HTML</Header>
                <LandingStyled.Content>
                    <Paper>
                        <UserMedia />
                    </Paper>
                </LandingStyled.Content>
            </LandingStyled>
        )
    }
}