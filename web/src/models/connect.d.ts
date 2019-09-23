import { ActionModelType } from "./action";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    action?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  action: ActionModelType;
}

// export interface Route extends MenuDataItem {
//   routes?: Route[];
// }
// /**
//  * @type T: Params matched in dynamic routing
//  */
// export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
//   dispatch?: Dispatch<AnyAction>;
// }
