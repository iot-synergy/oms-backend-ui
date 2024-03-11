import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  FeedbackListReq,
  BaseListResp,
  BaseIDReq,
  BaseDataResp,
  DeviceReq,
} from '/@/api/model/baseModel';
import { DeviceInfo } from './deviceModel'

enum Api {
//   GetQueryLocalDevices = '/device/queryUserDeviceList',
  GetQueryLocalDevices = '/mms-api/device/queryLocalDevices',
  GetMmsapiUpdateDeviceVipSet = '/mms-api/device/updateDeviceVipSet',
//   GetMmsapireplyComment = '/mms-api/admin/replyComment',
}

/**
 * @description: Get member list
 */

export const getQueryLocalDevices = (params: FeedbackListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseListResp<DeviceInfo>>(
    { url: Api.GetQueryLocalDevices, params },
    { errorMessageMode: mode },
  );
};
export const getMmsapiUpdateDeviceVipSet = (params: DeviceReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceInfo>>(
    { url: Api.GetMmsapiUpdateDeviceVipSet, params },
    { errorMessageMode: mode },
  );
};
// export const updateReplyComment = (params: ReplyComment, mode: ErrorMessageMode = 'notice') => {
//   return defHttp.post<BaseDataResp<DeviceInfo>>(
//     { url: Api.GetMmsapireplyComment, params },
//     { errorMessageMode: mode },
//   );
// };