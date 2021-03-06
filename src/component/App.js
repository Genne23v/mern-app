import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) => {
    window.onpopstate = handler;
}

class App extends React.Component {
    static PropTypes = {
        initialData: PropTypes.object.isRequired
    };
    state = this.props.initialData;
    componentDidMount() {
        onPopState(event => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        })
    }
    componentWillUnmount() {
        onPopState(null);
    }
    fetchContest = (contestId) => {
        pushState({ currentContestId: contestId }, `/contest/${contestId}`)
        api.fetchContest(contestId).then(contest => {
            this.setState({
                currentContestId: contest._id,
                constests: {
                    ...this.state.constests,
                    [contest._id]: contest
                }
            })
        })
    }
    fetchContestList = () => {
        pushState({
            currentContestId: null
        }, '/');
        api.fetchContestList().then(contests => {
            this.setState({
                currentContestId: null,
                contests
            })
        })
    }
    fetchNames = (nameIds) => {
        if (nameIds.length === 0) {
            return;
        }
        api.fetchNames(nameIds).then(names => {
            this.setState({
                names
            })
        })
    }
    currentContest() {
        return this.state.contests[this.state.currentContestId];
    }
    pageHeader() {
        if (this.state.currentContestId) {
            return this.currentContest().contestName;
        }
        return 'Naming Contests';
    }
    lookupName = (namdId) => {
        if (!this.state.names || !this.state.names[nameId]) {
            return {
                name: '...'
            };
        }
        return this.state.names[nameId];
    };

}