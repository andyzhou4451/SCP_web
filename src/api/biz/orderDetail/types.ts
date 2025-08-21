export interface OrderDetailVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 租户ID
   */
  tenantId: string | number;

  /**
   * 订单ID(关联拆单后订单)
   */
  orderNo: number;

  /**
   * SPU ID
   */
  spuId: string | number;

  /**
   * SPU名称
   */
  spuName: string;

  /**
   * 商品编码ID
   */
  skuId: string | number;

  /**
   * 商品名称
   */
  skuName: string;

  /**
   * 商品规格
   */
  skuAttr: string;

  /**
   * 商品规格
   */
  specification: string;

  /**
   * 商品分类ID
   */
  classId: string | number;

  /**
   * 品牌ID
   */
  brandId: string | number;

  /**
   * 供应商ID
   */
  supplierId: string | number;

  /**
   * 出库仓库ID
   */
  warehouseId: string | number;

  /**
   * 商品数量
   */
  quantity: string;

  /**
   * 已退货数量
   */
  returnQuantity: string;

  /**
   * 商品单价
   */
  salePriceUnit: number;

  /**
   * 商品总价
   */
  totalPrice: number;

  /**
   * 优惠金额
   */
  discountAmount: number;

  /**
   * 实付金额
   */
  payAmount: number;

  /**
   * 计价方式(计重/计件)
   */
  priceMethod: string;

  /**
   * 商品重量(克重商品使用)
   */
  weight: number;

  /**
   * 工费(克重商品使用)
   */
  processingFee: number;

  /**
   * 进价(供应商结算用)
   */
  purchasePrice: number;

  /**
   * 创建日期
   */
  createTime: String;
}

export interface OrderDetailForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 订单ID(关联拆单后订单)
   */
  orderNo?: number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SPU名称
   */
  spuName?: string;

  /**
   * 商品编码ID
   */
  skuId?: string | number;

  /**
   * 商品名称
   */
  skuName?: string;

  /**
   * 商品规格
   */
  skuAttr?: string;

  /**
   * 商品规格
   */
  specification?: string;

  /**
   * 商品分类ID
   */
  classId?: string | number;

  /**
   * 品牌ID
   */
  brandId?: string | number;

  /**
   * 供应商ID
   */
  supplierId?: string | number;

  /**
   * 出库仓库ID
   */
  warehouseId?: string | number;

  /**
   * 商品数量
   */
  quantity?: string;

  /**
   * 已退货数量
   */
  returnQuantity?: string;

  /**
   * 商品单价
   */
  salePriceUnit?: number;

  /**
   * 商品总价
   */
  totalPrice?: number;

  /**
   * 优惠金额
   */
  discountAmount?: number;

  /**
   * 实付金额
   */
  payAmount?: number;

  /**
   * 计价方式(计重/计件)
   */
  priceMethod?: string;

  /**
   * 商品重量(克重商品使用)
   */
  weight?: number;

  /**
   * 工费(克重商品使用)
   */
  processingFee?: number;

  /**
   * 进价(供应商结算用)
   */
  purchasePrice?: number;

  /**
   * 创建日期
   */
  createTime?: string;
}

export interface OrderDetailQuery extends PageQuery {
  /**
   * 租户ID
   */
  tenantId?: string | number;

  /**
   * 订单ID(关联拆单后订单)
   */
  orderNo?: number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SPU名称
   */
  spuName?: string;

  /**
   * 商品编码ID
   */
  skuId?: string | number;

  /**
   * 商品名称
   */
  skuName?: string;

  /**
   * 商品规格
   */
  skuAttr?: string;

  /**
   * 商品规格
   */
  specification?: string;

  /**
   * 商品分类ID
   */
  classId?: string | number;

  /**
   * 品牌ID
   */
  brandId?: string | number;

  /**
   * 供应商ID
   */
  supplierId?: string | number;

  /**
   * 出库仓库ID
   */
  warehouseId?: string | number;

  /**
   * 商品数量
   */
  quantity?: string;

  /**
   * 已退货数量
   */
  returnQuantity?: string;

  /**
   * 商品单价
   */
  salePriceUnit?: number;

  /**
   * 商品总价
   */
  totalPrice?: number;

  /**
   * 优惠金额
   */
  discountAmount?: number;

  /**
   * 实付金额
   */
  payAmount?: number;

  /**
   * 计价方式(计重/计件)
   */
  priceMethod?: string;

  /**
   * 商品重量(克重商品使用)
   */
  weight?: number;

  /**
   * 工费(克重商品使用)
   */
  processingFee?: number;

  /**
   * 进价(供应商结算用)
   */
  purchasePrice?: number;

  /**
   * 创建日期
   */
  createTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
