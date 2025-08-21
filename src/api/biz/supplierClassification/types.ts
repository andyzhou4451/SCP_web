export interface SupplierClassificationVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 运营主体ID
   */
  tenantId: string | number;

  /**
   * 商品中心三级分类名称
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

  /**
   * 供应商三级分类ID
   */
  supplierClassId: string | number;

  /**
   * 供应商三级分类名称
   */
  supplierClassName: string;

  /**
   * 供应商三级分类编码
   */
  supplierClassCode: string;

  /**
   * 状态（0禁用 1正常）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SupplierClassificationForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 运营主体ID
   */
  tenantId?: string | number;

  /**
   * 商品中心三级分类名称
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
   * 供应商三级分类ID
   */
  supplierClassId?: string | number;

  /**
   * 供应商三级分类名称
   */
  supplierClassName?: string;

  /**
   * 供应商三级分类编码
   */
  supplierClassCode?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SupplierClassificationQuery extends PageQuery {

  /**
   * 商品中心三级分类名称
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
   * 供应商三级分类ID
   */
  supplierClassId?: string | number;

  /**
   * 供应商三级分类名称
   */
  supplierClassName?: string;

  /**
   * 供应商三级分类编码
   */
  supplierClassCode?: string;

  /**
   * 状态（0禁用 1正常）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



