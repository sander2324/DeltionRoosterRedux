import axios from 'axios';
import filterAPI from '../helpers/filterAPIdata';
import * as actions from './actionTypes';
import * as mutations from './mutationTypes';

import currentWeekNum from '../helpers/getCurrentWeekNum';

export default {
  [actions.GET_WEEK]: async (context) => {
    const weekData = await axios.get(`https://roosters-api.stormheg.co/api/v1/roster?group=${context.state.group}`).catch((err) => {
      console.log(err);
    });
    context.commit(mutations.UPDATE_WEEK, filterAPI(weekData.data.data,
      context.state.weekNumber));
  },
  [actions.SET_CURRENT_WEEK_NUMBER]: async (context) => {
    context.commit(mutations.UPDATE_WEEK_NUMBER, currentWeekNum());
  },
  [actions.UPDATE_WEEK_NUMBER]: async (context, payload) => {
    context.commit(mutations.UPDATE_WEEK_NUMBER, payload);
    if (context.state.group !== '') context.dispatch(actions.GET_WEEK);
  },
};
