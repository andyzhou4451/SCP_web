export interface SupplierRuleVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 运营主体ID
   */
  businessId: string | number;

  /**
   * 供应商ID
   */
  supplierId: string | number;

  /**
   * 商品发布渠道规则：0-发布成功手动上架 1-发布成功自动上架
   */
  publishRule: number;

  /**
   * 结算规则：d0/d15/f0/f15 等
   */
  settleRule: string;

  /**
   * SPU编码类型：0-默认 1-自定义 2-外部供应商编码
   */
  spuCodeType: number;

  /**
   * SKU编码类型：0-默认 1-自定义 2-外部供应商编码
   */
  skuCodeType: number;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SupplierRuleForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 运营主体ID
   */
  businessId?: string | number;

  /**
   * 供应商ID
   */
  supplierId?: string | number;

  /**
   * 商品发布渠道规则：0-发布成功手动上架 1-发布成功自动上架
   */
  publishRule?: number;

  /**
   * 结算规则：d0/d15/f0/f15 等
   */
  settleRule?: string;

  /**
   * SPU编码类型：0-默认 1-自定义 2-外部供应商编码
   */
  spuCodeType?: number;

  /**
   * SKU编码类型：0-默认 1-自定义 2-外部供应商编码
   */
  skuCodeType?: number;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SupplierRuleQuery extends PageQuery {

  /**
   * 运营主体ID
   */
  businessId?: string | number;

  /**
   * 供应商ID
   */
  supplierId?: string | number;

  /**
   * 商品发布渠道规则：0-发布成功手动上架 1-发布成功自动上架
   */
  publishRule?: number;

  /**
   * 结算规则：d0/d15/f0/f15 等
   */
  settleRule?: string;

  /**
   * SPU编码类型：0-默认 1-自定义 2-外部供应商编码
   */
  spuCodeType?: number;

  /**
   * SKU编码类型：0-默认 1-自定义 2-外部供应商编码
   */
  skuCodeType?: number;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



