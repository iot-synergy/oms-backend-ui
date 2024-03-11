import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  FeedbackListReq,
  BaseListResp,
  BaseIDReq,
  BaseDataResp,
  ReplyComment,
} from '/@/api/model/baseModel';
import { FeedbackInfo } from './feedbackModel';

enum Api {
  GetMmsapiCommentList = '/mms-api/admin/CommentList',
  GetMmsapiCommentDetail = '/mms-api/admin/commentDetail',
  GetMmsapireplyComment = '/mms-api/admin/replyComment',
}

/**
 * @description: Get member list
 */

export const getMmsapiCommentList = (params: FeedbackListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseListResp<FeedbackInfo>>(
    { url: Api.GetMmsapiCommentList, params },
    { errorMessageMode: mode },
  );
};
export const getMmsapicommentDetail = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<FeedbackInfo>>(
    { url: Api.GetMmsapiCommentDetail, params },
    { errorMessageMode: mode },
  );
};
export const updateReplyComment = (params: ReplyComment, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<FeedbackInfo>>(
    { url: Api.GetMmsapireplyComment, params },
    { errorMessageMode: mode },
  );
};