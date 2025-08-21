export interface ShoppeInfoVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 所属渠道ID
   */
  shoppeChannelId: string | number;

  /**
   * 店铺名称
   */
  shoppeName: string;

  /**
   * 店铺编码
   */
  shoppeCode: string;

  /**
   * 店铺密文
   */
  shoppeSecret: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;
}

export interface ShoppeInfoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 所属渠道ID
   */
  shoppeChannelId?: string | number;

  /**
   * 店铺名称
   */
  shoppeName?: string;

  /**
   * 店铺编码
   */
  shoppeCode?: string;

  /**
   * 店铺密文
   */
  shoppeSecret?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface ShoppeInfoQuery extends PageQuery {
  /**
   * 所属渠道ID
   */
  shoppeChannelId?: string | number;

  /**
   * 店铺名称
   */
  shoppeName?: string;

  /**
   * 店铺编码
   */
  shoppeCode?: string;

  /**
   * 店铺密文
   */
  shoppeSecret?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
