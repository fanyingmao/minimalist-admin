import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getAllAction } from '@/services/action';

export interface IAction{
   type: number;
   title: string;
   module: string;
}
export interface StateType {
  actionList: IAction[];
}

export interface ActionModelType {
  namespace: string;
  state: StateType;
  effects: {
    allAction: Effect;
    runAction: Effect;
  };
  reducers: {
    changeAction: Reducer<StateType>;
  };
}

const Model: ActionModelType = {
  namespace: 'action',
  state: {
    actionList: [],
  },

  effects: {
    *allAction(_, { call, put }) {//3、执行请求接口异步操作
      const response = yield call(getAllAction);
      yield put({
        type: 'changeAction',
        payload: response,
      });
    },
    *runAction({ payload }, { call, put }) {

    }
  },

  reducers: {
    changeAction(state, { payload }) {
      return {
        ...state,
        actionList: payload.data,
      };
    }
  }
}

export default Model;