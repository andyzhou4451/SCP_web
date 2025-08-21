export interface OrderVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 租户ID
   */
  tenantId: string | number;

  /**
   * 系统订单号(拆单后生成)
   */
  orderNo: string;

  /**
   * 原始订单号
   */
  originalOrderNo: number;

  /**
   * 仓库ID
   */
  warehouseId: string | number;

  /**
   * 仓库名称
   */
  warehouseName: string;

  /**
   * 收货人姓名
   */
  receiverName: string;

  /**
   * 收货电话
   */
  receiverMobile: string;

  /**
   * 收货地址
   */
  receiverAddress: string;

  /**
   * 销售渠道id
   */
  saleChannelId: string | number;

  /**
   * 销售渠道名称
   */
  saleChannelName: number;

  /**
   * 销售店铺ID
   */
  saleShoppeId: string | number;

  /**
   * 销售店铺名称
   */
  saleShopepName: string;

  /**
   * 用户ID
   */
  userId: string | number;

  /**
   * 订单状态
   */
  saleStatus: string;

  /**
   * 售后状态
   */
  afterSalesStatus: string;

  /**
   * 拆分后订单金额
   */
  orderPrice: number;

  /**
   * 拆分后运费
   */
  shippingFee: number;

  /**
   * 拆分后优惠金额
   */
  discountFee: number;

  /**
   * 拆分后实付金额
   */
  paidPrice: string | number;

  /**
   * 支付方式
   */
  paymentMethod: string;

  /**
   * 支付时间
   */
  paymentTime: string;

  /**
   * 发货时间
   */
  shippingTime: string;

  /**
   * 取消时间
   */
  cancelTime: string;

  /**
   * 完成时间
   */
  finishTime: string;

  /**
   * 订单备注
   */
  remark: string;
}

export interface OrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 系统订单号(拆单后生成)
   */
  orderNo?: string;

  /**
   * 原始订单号
   */
  originalOrderNo?: number;

  /**
   * 仓库ID
   */
  warehouseId?: string | number;

  /**
   * 仓库名称
   */
  warehouseName?: string;

  /**
   * 收货人姓名
   */
  receiverName?: string;

  /**
   * 收货电话
   */
  receiverMobile?: string;

  /**
   * 收货地址
   */
  receiverAddress?: string;

  /**
   * 销售渠道id
   */
  saleChannelId?: string | number;

  /**
   * 销售渠道名称
   */
  saleChannelName?: number;

  /**
   * 销售店铺ID
   */
  saleShoppeId?: string | number;

  /**
   * 销售店铺名称
   */
  saleShopepName?: string;

  /**
   * 用户ID
   */
  userId?: string | number;

  /**
   * 订单状态
   */
  saleStatus?: string;

  /**
   * 售后状态
   */
  afterSalesStatus?: string;

  /**
   * 拆分后订单金额
   */
  orderPrice?: number;

  /**
   * 拆分后运费
   */
  shippingFee?: number;

  /**
   * 拆分后优惠金额
   */
  discountFee?: number;

  /**
   * 拆分后实付金额
   */
  paidPrice?: string | number;

  /**
   * 支付方式
   */
  paymentMethod?: string;

  /**
   * 支付时间
   */
  paymentTime?: string;

  /**
   * 发货时间
   */
  shippingTime?: string;

  /**
   * 取消时间
   */
  cancelTime?: string;

  /**
   * 完成时间
   */
  finishTime?: string;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 订单备注
   */
  remark?: string;
}

export interface OrderQuery extends PageQuery {
  /**
   * 租户ID
   */
  tenantId?: string | number;

  /**
   * 系统订单号(拆单后生成)
   */
  orderNo?: string;

  /**
   * 原始订单号
   */
  originalOrderNo?: number;

  /**
   * 仓库ID
   */
  warehouseId?: string | number;

  /**
   * 仓库名称
   */
  warehouseName?: string;

  /**
   * 收货人姓名
   */
  receiverName?: string;

  /**
   * 收货电话
   */
  receiverMobile?: string;

  /**
   * 收货地址
   */
  receiverAddress?: string;

  /**
   * 销售渠道id
   */
  saleChannelId?: string | number;

  /**
   * 销售渠道名称
   */
  saleChannelName?: number;

  /**
   * 销售店铺ID
   */
  saleShoppeId?: string | number;

  /**
   * 销售店铺名称
   */
  saleShopepName?: string;

  /**
   * 用户ID
   */
  userId?: string | number;

  /**
   * 订单状态
   */
  saleStatus?: string;

  /**
   * 售后状态
   */
  afterSalesStatus?: string;

  /**
   * 拆分后订单金额
   */
  orderPrice?: number;

  /**
   * 拆分后运费
   */
  shippingFee?: number;

  /**
   * 拆分后优惠金额
   */
  discountFee?: number;

  /**
   * 拆分后实付金额
   */
  paidPrice?: string | number;

  /**
   * 支付方式
   */
  paymentMethod?: string;

  /**
   * 支付时间
   */
  paymentTime?: string;

  /**
   * 发货时间
   */
  shippingTime?: string;

  /**
   * 取消时间
   */
  cancelTime?: string;

  /**
   * 完成时间
   */
  finishTime?: string;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
