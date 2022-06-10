import { createSelector } from "reselect";



const getUserState = (state)=>state;

const makeSelector = createSelector( getUserState, (state)=>state);


const getStateItem = (state)=>state.item;

const makeSelectorItem = createSelector(getStateItem, (item)=>item)



export {makeSelector, makeSelectorItem};