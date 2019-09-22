import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getAllAction, postRunAction } from '@/services/action';

export interface IAction{
   type: number;
   title: string;
   module: string;
}
export interface StateType {
  actionList?: IAction[];
  result?: string;
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
    changeResult: Reducer<StateType>;
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
      const response = yield call(postRunAction,payload);
      yield put({
        type: 'changeResult',
        payload: response,
      });
    }
  },

  reducers: {
    changeAction(state, { payload }) {
      return {
        ...state,
        actionList: payload.data,
      };
    },
    changeResult(state, { payload }) {
      return {
        ...state,
        result: payload.data,
      };
    }
  }
}

export default Model;