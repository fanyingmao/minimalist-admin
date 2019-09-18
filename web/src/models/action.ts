import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface StateType {
  actionList?: String[];
}

export interface ActionModelType {
  namespace: string;
  state: StateType;
  effects: {
    getAllAction: Effect;
    postRunAction: Effect;
  };
  reducers: {
    changeAction: Reducer<StateType>;
  };
}

const Model: ActionModelType = {
  namespace: 'action',

  state: {
    actionList: []
  },

  effects: {
    *getAllAction(_, { call, put }) {

    },
    *postRunAction({ payload }, { call, put }) {

    }
  },

  reducers: {
    changeAction(state, { payload }) {
      return {
        ...state,
        actionList: payload.actionList,
      };
    }
  }
}

export default Model;