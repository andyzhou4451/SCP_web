export interface SupplierInfoVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 供应商名称
   */
  supplierName: string;

  /**
   * 供应商编码
   */
  supplierCode: string;

  /**
   * 供应商类型：1-系统互通供应商 2-传统供应商
   */
  supplierType: number;

  /**
   * 联系人
   */
  contactorName: string;

  /**
   * 联系人手机号
   */
  contactorMobile: string;

  /**
   * 供应商地址
   */
  address: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;
}

export interface SupplierInfoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 供应商名称
   */
  supplierName?: string;

  /**
   * 供应商编码
   */
  supplierCode?: string;

  /**
   * 供应商类型：1-系统互通供应商 2-传统供应商
   */
  supplierType?: number;

  /**
   * 联系人
   */
  contactorName?: string;

  /**
   * 联系人手机号
   */
  contactorMobile?: string;

  /**
   * 供应商地址
   */
  address?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
  //仓库
  wareHouseIds?: Array<string | number>;
}

export interface SupplierInfoQuery extends PageQuery {
  /**
   * 供应商名称
   */
  supplierName?: string;

  /**
   * 供应商编码
   */
  supplierCode?: string;

  /**
   * 供应商类型：1-系统互通供应商 2-传统供应商
   */
  supplierType?: number;

  /**
   * 联系人
   */
  contactorName?: string;

  /**
   * 联系人手机号
   */
  contactorMobile?: string;

  /**
   * 供应商地址
   */
  address?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
