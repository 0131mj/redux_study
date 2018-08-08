import React, {Component} from 'react';
import Buttons from '../components/Buttons'
import CounterContainer from '../containers/CounterListContainer'

import { connect } from 'react-redux';
import * as actions from '../actions';

import { getRandomColor } from "../utils";

class App extends Component {
    render() {
        const { onCreate, onRemove } = this.props;
        return (
            <div className="App">
                <Buttons
                    onCreate={onCreate}
                    onRemove={onRemove}
                />
                <CounterContainer/>
            </div>
        );
    }
}

const mapToDispatch = (dispatch) => ({
    onCreate: () => dispatch(actions.create(getRandomColor())),
    onRemove:(index) => dispatch(actions.remove(index))
});

export default connect(null, mapToDispatch)(App);