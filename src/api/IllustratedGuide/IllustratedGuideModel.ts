// import { FeedbackReq } from '/@/api/model/baseModel';

/**
 *  @description: MemberRank info response
 */
export interface Labelinfo {
  id?: string;
  recordState?: Number;
  createTime?: Number;
  name?: string;
  type?: string;
  parentId?: string;
}

export interface llustratd {
  id?: string;
  recordState?: Number;
  createTime?: Number;
  title?: string;
  score?: Number;
  wikiUrl?: string;
  imagePath?: string;
  iconPath?: string;
  moreImages?: string;
  typee?: string;
  labels?: Array<string>;
  description?: string;
}

/**
 *  @description: MemberRank list response
 */

// export type FeedbackListResp = FeedbackReq<FeedbackInfo>;
