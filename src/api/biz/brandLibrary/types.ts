export interface BrandLibraryVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 品牌ID
   */
  brandId: string | number;
  brandCode: string;
  brandDesc: string;
  /**
   * 品牌名称
   */
  brandName: string;

  /**
   * 状态：1-正常 0-禁用
   */
  status: string;

  /**
   * 备注
   */
  remark: string;
}

export interface BrandLibraryForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 品牌ID
   */
  brandId?: string | number;

  /**
   * 品牌名称
   */
  brandName?: string;
  brandDesc?: string;

  /**
   * 状态：1-正常 0-禁用
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface BrandLibraryQuery extends PageQuery {
  /**
   * 品牌ID
   */
  brandId?: string | number;

  /**
   * 品牌名称
   */
  brandName?: string;
  brandCode?: string;

  /**
   * 状态：1-正常 0-禁用
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
