import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseUUIDReq,
  BaseListResp,
  LabelReq,
  BaseDataResp,
  DeviceReq,
} from '/@/api/model/baseModel';
import { Labelinfo,llustratd } from './IllustratedGuideModel'

enum Api {
  GetillustrationList = '/bird-api/illustration/list',
  GetillustrationCreate = '/bird-api/illustration/create',
  GetillustrationUpdate = '/bird-api/illustration/update',
  GetillustrationDelete = '/bird-api/illustration/delete',
  GetillustrationPublish = '/bird-api/illustration/publish',
  // 标签
  GetlabelList = '/bird-api/label/list',
  GetlabelCreate = '/bird-api/label/create',
  GetlabelUpdate = '/bird-api/label/update',
  DeleteLable = '/bird-api/label/delete'
}

/**
 * @description: Get member list
 */

export const getillustrationList = (params: {}, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseListResp<llustratd>>(
    { url: Api.GetillustrationList, params },
    { errorMessageMode: mode },
  );
};

export const getillustrationCreate = (params: {}, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseListResp<llustratd>>(
    { url: Api.GetillustrationCreate, params },
    { errorMessageMode: mode },
  );
};
export const getillustrationUpdate = (params: {}, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseListResp<llustratd>>(
    { url: Api.GetillustrationUpdate, params },
    { errorMessageMode: mode },
  );
};
export const getillustrationDelete = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseListResp<llustratd>>(
    { url: Api.GetillustrationDelete, params },
    { errorMessageMode: mode },
  );
};
export const getillustrationPublish = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseListResp<llustratd>>(
    { url: Api.GetillustrationPublish, params },
    { errorMessageMode: mode },
  );
};
// 标签
export const getlabelList = (params: DeviceReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<Labelinfo>>(
    { url: Api.GetlabelList, params },
    { errorMessageMode: mode },
  );
};
export const getlabelCreate = (params: LabelReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<Labelinfo>>(
    { url: Api.GetlabelCreate, params },
    { errorMessageMode: mode },
  );
};
export const getlabelUpdate = (params: LabelReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<Labelinfo>>(
    { url: Api.GetlabelUpdate, params },
    { errorMessageMode: mode },
  );
};
export const deleteLable = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<Labelinfo>>(
    { url: Api.DeleteLable, params },
    { errorMessageMode: mode },
  );
};