export interface OrderStatusLogVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 订单ID
   */
  orderNo: number;

  /**
   * 订单类型 1 销售单 2 退货单
   */
  orderType: string;

  /**
   * 原状态
   */
  oldStatus: string;

  /**
   * 新状态
   */
  newStatus: string;

  /**
   * 操作人ID
   */
  operatorId: string | number;

  /**
   * 操作内容
   */
  operatorType: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderStatusLogForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 订单ID
   */
  orderNo?: number;

  /**
   * 订单类型 1 销售单 2 退货单
   */
  orderType?: string;

  /**
   * 原状态
   */
  oldStatus?: string;

  /**
   * 新状态
   */
  newStatus?: string;

  /**
   * 操作人ID
   */
  operatorId?: string | number;

  /**
   * 操作内容
   */
  operatorType?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderStatusLogQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderNo?: number;

  /**
   * 订单类型 1 销售单 2 退货单
   */
  orderType?: string;

  /**
   * 原状态
   */
  oldStatus?: string;

  /**
   * 新状态
   */
  newStatus?: string;

  /**
   * 操作人ID
   */
  operatorId?: string | number;

  /**
   * 操作内容
   */
  operatorType?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



