export interface WarehouseInfoVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 仓库名称
   */
  warehouseName: string;

  /**
   * 仓库编码
   */
  warehouseCode: string;

  /**
   * 外部仓库编码
   */
  outerWarehouseCode?: string;

  /**
   * 联系人姓名
   */
  contactorName: string;

  /**
   * 联系人手机号
   */
  contactorMobile: string;

  /**
   * 发货省份
   */
  shippingProvince: string;

  /**
   * 发货城市
   */
  shippingCity: string;

  /**
   * 发货区/县
   */
  shippingDistrict: string;

  /**
   * 发货街道
   */
  shippingStreet: string;

  /**
   * 发货详细地址
   */
  shippingDetail: string;

  /**
   * 退货联系人
   */
  returnName: string;

  /**
   * 退货联系人电话
   */
  returnMobile: string;

  /**
   * 退货省份
   */
  returnProvince: string;

  /**
   * 退货城市
   */
  returnCity: string;

  /**
   * 退货区/县
   */
  returnDistrict: string;

  /**
   * 退货街道
   */
  returnStreet: string;

  /**
   * 退货详细地址
   */
  returnDetail: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;
}

export interface WarehouseInfoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 仓库名称
   */
  warehouseName?: string;

  /**
   * 仓库编码
   */
  warehouseCode?: string;

  /**
   * 外部仓库编码
   */
  outerWarehouseCode?: string;

  shippingRegion?: string[];
  returnRegion?: string[];

  /**
   * 联系人姓名
   */
  contactorName?: string;

  /**
   * 联系人手机号
   */
  contactorMobile?: string;

  /**
   * 发货省份
   */
  shippingProvince?: string;

  /**
   * 发货城市
   */
  shippingCity?: string;

  /**
   * 发货区/县
   */
  shippingDistrict?: string;

  /**
   * 发货街道
   */
  shippingStreet?: string;

  /**
   * 发货详细地址
   */
  shippingDetail?: string;

  /**
   * 退货联系人
   */
  returnName?: string;

  /**
   * 退货联系人电话
   */
  returnMobile?: string;

  /**
   * 退货省份
   */
  returnProvince?: string;

  /**
   * 退货城市
   */
  returnCity?: string;

  /**
   * 退货区/县
   */
  returnDistrict?: string;

  /**
   * 退货街道
   */
  returnStreet?: string;

  /**
   * 退货详细地址
   */
  returnDetail?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface WarehouseInfoQuery extends PageQuery {
  /**
   * 仓库名称
   */
  warehouseName?: string;

  /**
   * 仓库编码
   */
  warehouseCode?: string;

  /**
   * 联系人姓名
   */
  contactorName?: string;

  /**
   * 联系人手机号
   */
  contactorMobile?: string;

  /**
   * 发货省份
   */
  shippingProvince?: string;

  /**
   * 发货城市
   */
  shippingCity?: string;

  /**
   * 发货区/县
   */
  shippingDistrict?: string;

  /**
   * 发货街道
   */
  shippingStreet?: string;

  /**
   * 发货详细地址
   */
  shippingDetail?: string;

  /**
   * 退货联系人
   */
  returnName?: string;

  /**
   * 退货联系人电话
   */
  returnMobile?: string;

  /**
   * 退货省份
   */
  returnProvince?: string;

  /**
   * 退货城市
   */
  returnCity?: string;

  /**
   * 退货区/县
   */
  returnDistrict?: string;

  /**
   * 退货街道
   */
  returnStreet?: string;

  /**
   * 退货详细地址
   */
  returnDetail?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
