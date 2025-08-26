export interface SupplierBrandRelVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 运营主体ID
   */
  businessId: string | number;

  /**
   * 店铺/专柜ID
   */
  shoppeId: string | number;

  /**
   * 商品中心品牌ID
   */
  brandId: string | number;

  /**
   * 商品中心品牌名称
   */
  className: string;

  /**
   * 供应商ID
   */
  supplierId: string | number;

  /**
   * 供应商名称
   */
  supplierName: string;
  brandCode?: string;

  /**
   * 供应商品牌编码
   */
  supplierBrandCode: string | number;

  /**
   * 供应商品牌名称
   */
  supplierBrandName: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;
}

export interface SupplierBrandRelForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 运营主体ID
   */
  businessId?: string | number;

  /**
   * 店铺/专柜ID
   */
  shoppeId?: string | number;

  /**
   * 商品中心品牌ID
   */
  brandId?: string | number;

  /**
   * 商品中心品牌名称
   */
  className?: string;

  /**
   * 供应商ID
   */
  supplierId?: string | number;

  /**
   * 供应商名称
   */
  supplierName?: string;

  /**
   * 供应商品牌编码
   */
  supplierBrandCode?: string | number;

  /**
   * 供应商品牌名称
   */
  supplierBrandName?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface SupplierBrandRelQuery extends PageQuery {
  /**
   * 运营主体ID
   */
  businessId?: string | number;

  /**
   * 店铺/专柜ID
   */
  shoppeId?: string | number;

  /**
   * 商品中心品牌ID
   */
  brandId?: string | number;

  /**
   * 商品中心品牌名称
   */
  className?: string;

  /**
   * 供应商ID
   */
  supplierId?: string | number;

  /**
   * 供应商名称
   */
  supplierName?: string;

  /**
   * 供应商品牌编码
   */
  supplierBrandCode?: string | number;

  /**
   * 供应商品牌名称
   */
  supplierBrandName?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;
  params?: {
    /** 精确：品牌编码（商品中心）或 供应商编码（二选一匹配） */
    brandCode?: string;
    /** 是否匹配：1已匹配 0未匹配 */
    isMatched?: '0' | '1';
  };
}



