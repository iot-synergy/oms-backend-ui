// import { FeedbackReq } from '/@/api/model/baseModel';

/**
 *  @description: MemberRank info response
 */
export interface FeedbackInfo {
  id?: number;
  title?: string;
  content?: string;
  memberId?: string;
  createTime?: number;
  updateTime?: number;
  reply?: object[];
}

/**
 *  @description: MemberRank list response
 */

// export type FeedbackListResp = FeedbackReq<FeedbackInfo>;
