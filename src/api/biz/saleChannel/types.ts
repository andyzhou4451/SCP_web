export interface SaleChannelVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 渠道名称
   */
  channelName: string;

  /**
   * 渠道图标URL
   */
  channelImage: string;

  /**
   * 渠道图标URLUrl
   */
  channelImageUrl: string;
  /**
   * 渠道编码
   */
  channelCode: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SaleChannelForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 渠道名称
   */
  channelName?: string;

  /**
   * 渠道图标URL
   */
  channelImage?: string;

  /**
   * 渠道编码
   */
  channelCode?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SaleChannelQuery extends PageQuery {

  /**
   * 渠道名称
   */
  channelName?: string;

  /**
   * 渠道图标URL
   */
  channelImage?: string;

  /**
   * 渠道编码
   */
  channelCode?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



