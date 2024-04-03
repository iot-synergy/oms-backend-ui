import { UploadApiResp } from '/@/api/sys/model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode, UploadFileParams } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseUUIDsReq } from '../model/baseModel';
import { FileListResp, updateFileInfoReq } from './model/fileModel';
import { AxiosProgressEvent } from 'axios';

enum Api {
  uploadFile = '/fms-api/upload',
  GetFileList = '/fms-api/file/list',
  UpdateFileInfo = '/fms-api/file/update',
  SetFileStatus = '/fms-api/file/status',
  DownloadFile = '/fms-api/file/download',
  DeleteFile = '/fms-api/file/delete',
  uploadImage = '/fms-api/cloud_file/upload',
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile<BaseDataResp<UploadApiResp>>(
    {
      url: Api.uploadFile,
      onUploadProgress,
    },
    params,
  );
}

export function uploadImageApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: any) => void,
) {
  return defHttp.uploadFile<BaseDataResp<UploadApiResp>>({
    url: Api.uploadImage, // 上传图片的 API 地址
    onUploadProgress, // 上传进度回调
  }, params);
}

export function uploadImageIconApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: any) => void,
) {
  console.log(1111); 
  console.log(params);
  return defHttp.uploadImageFile<BaseDataResp<UploadApiResp>>({
    url: Api.uploadImage, // 上传图片的 API 地址
    onUploadProgress, // 上传进度回调
  }, params);
}

/**
 * @description: Get file list
 */

export const getFileList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<FileListResp>>(
    { url: Api.GetFileList, params },
    {
      errorMessageMode: mode,
      successMessageMode: 'none',
    },
  );
};

/**
 *  author: ryan
 *  @description: update file info
 */
export const UpdateFileInfo = (params: updateFileInfoReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateFileInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete files
 */
export const deleteFile = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteFile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set file's status
 */
export const setFileStatus = (id: string, status: number, mode: ErrorMessageMode = 'notice') =>
  defHttp.post(
    { url: Api.SetFileStatus, params: { id, status } },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );

/**
 *  author: Ryan Su
 *  @description: download file
 */

export const downloadFile = (id: number, mode: ErrorMessageMode = 'none') =>
  defHttp.get(
    {
      url: Api.DownloadFile + '/' + id,
      responseType: 'blob',
    },
    { errorMessageMode: mode },
  );
