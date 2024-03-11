// import { FeedbackReq } from '/@/api/model/baseModel';

/**
 *  @description: MemberRank info response
 */
export interface DeviceInfo {
  addxld?: string;
  serialNumber?: string;
  activated?: string;
  activatedTime?: string;
  deviceName?: string;
  deviceNetType?: number;
  deviceStatus?: number;
  deviceVipLevel?: number;
  firmwareld?: string;
  firmwareStatus?: number;
  icon?: string;
  macAddress?: string;
  online?: number;
  personDetect?: number;
  supportBirdVip?: boolean;
}

/**
 *  @description: MemberRank list response
 */

// export type FeedbackListResp = FeedbackReq<FeedbackInfo>;
