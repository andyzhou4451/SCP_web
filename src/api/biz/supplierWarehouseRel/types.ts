export interface SupplierWarehouseRelVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 供应商ID，关联ls_supplier_info.id
   */
  supplierId: string | number;

  /**
   * 仓库ID，关联ls_warehouse_info.id
   */
  warehouseId: string | number;

  /**
   * 状态：0禁用 1正常
   */
  status: string;

  /**
   * 备注
   */
  remark: string;
}

export interface SupplierWarehouseRelForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 供应商ID，关联ls_supplier_info.id
   */
  supplierId?: string | number;

  /**
   * 仓库ID，关联ls_warehouse_info.id
   */
  warehouseId?: string | number;

  /**
   * 状态：0禁用 1正常
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface SupplierWarehouseRelQuery extends PageQuery {
  /**
   * 供应商ID，关联ls_supplier_info.id
   */
  supplierId?: string | number;

  /**
   * 仓库ID，关联ls_warehouse_info.id
   */
  warehouseId?: string | number;

  /**
   * 状态：0禁用 1正常
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
