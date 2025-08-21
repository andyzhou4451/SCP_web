export interface AfterSalesOrderVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 售后单号(系统生成)
   */
  afterSalesNo: string;

  /**
   * 原始售后单号(渠道)
   */
  originalAfterSalesNo: string;

  /**
   * 原始销售单号(渠道)
   */
  originalSalesOrderNo: string;

  /**
   * 关联订单ID
   */
  orderId: string | number;

  /**
   * 售后类型(退款/退货退款)
   */
  afterSalesType: string;

  /**
   * 售后状态
   */
  afterSalesStatus: string;

  /**
   * 售后手机号
   */
  afterSalesMobile: string;

  /**
   * 售后人
   */
  afterSalesName: string;

  /**
   * 售后金额
   */
  afterSalesPrice: number;

  /**
   * 退货仓库ID
   */
  warehouseId: string | number;

  /**
   * 销售渠道ID
   */
  saleChannelId: string | number;

  /**
   * 销售渠道名称
   */
  saleChannelName: string;

  /**
   * 店铺ID
   */
  saleShoppeId: string | number;

  /**
   * 店铺名称
   */
  saleShoppeName: string;

  /**
   * 申请时间
   */
  applyTime: string;

  /**
   * 审核退货时间
   */
  auditReturnTime: string;

  /**
   * 退货审核人
   */
  returnAuditor: number;

  /**
   * 审核退款时间
   */
  auditRefundTime: string;

  /**
   * 退款审核人
   */
  refundAuditor: number;

  /**
   * 售后原因
   */
  reason: string;

  /**
   * 备注
   */
  remark: string;

}

export interface AfterSalesOrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 售后单号(系统生成)
   */
  afterSalesNo?: string;

  /**
   * 原始售后单号(渠道)
   */
  originalAfterSalesNo?: string;

  /**
   * 原始销售单号(渠道)
   */
  originalSalesOrderNo?: string;

  /**
   * 关联订单ID
   */
  orderId?: string | number;

  /**
   * 售后类型(退款/退货退款)
   */
  afterSalesType?: string;

  /**
   * 售后状态
   */
  afterSalesStatus?: string;

  /**
   * 售后手机号
   */
  afterSalesMobile?: string;

  /**
   * 售后人
   */
  afterSalesName?: string;

  /**
   * 售后金额
   */
  afterSalesPrice?: number;

  /**
   * 退货仓库ID
   */
  warehouseId?: string | number;

  /**
   * 销售渠道ID
   */
  saleChannelId?: string | number;

  /**
   * 销售渠道名称
   */
  saleChannelName?: string;

  /**
   * 店铺ID
   */
  saleShoppeId?: string | number;

  /**
   * 店铺名称
   */
  saleShoppeName?: string;

  /**
   * 申请时间
   */
  applyTime?: string;

  /**
   * 审核退货时间
   */
  auditReturnTime?: string;

  /**
   * 退货审核人
   */
  returnAuditor?: number;

  /**
   * 审核退款时间
   */
  auditRefundTime?: string;

  /**
   * 退款审核人
   */
  refundAuditor?: number;

  /**
   * 售后原因
   */
  reason?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface AfterSalesOrderQuery extends PageQuery {

  /**
   * 售后单号(系统生成)
   */
  afterSalesNo?: string;

  /**
   * 原始售后单号(渠道)
   */
  originalAfterSalesNo?: string;

  /**
   * 原始销售单号(渠道)
   */
  originalSalesOrderNo?: string;

  /**
   * 关联订单ID
   */
  orderId?: string | number;

  /**
   * 售后类型(退款/退货退款)
   */
  afterSalesType?: string;

  /**
   * 售后状态
   */
  afterSalesStatus?: string;

  /**
   * 售后手机号
   */
  afterSalesMobile?: string;

  /**
   * 售后人
   */
  afterSalesName?: string;

  /**
   * 售后金额
   */
  afterSalesPrice?: number;

  /**
   * 退货仓库ID
   */
  warehouseId?: string | number;

  /**
   * 销售渠道ID
   */
  saleChannelId?: string | number;

  /**
   * 销售渠道名称
   */
  saleChannelName?: string;

  /**
   * 店铺ID
   */
  saleShoppeId?: string | number;

  /**
   * 店铺名称
   */
  saleShoppeName?: string;

  /**
   * 申请时间
   */
  applyTime?: string;

  /**
   * 审核退货时间
   */
  auditReturnTime?: string;

  /**
   * 退货审核人
   */
  returnAuditor?: number;

  /**
   * 审核退款时间
   */
  auditRefundTime?: string;

  /**
   * 退款审核人
   */
  refundAuditor?: number;

  /**
   * 售后原因
   */
  reason?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



