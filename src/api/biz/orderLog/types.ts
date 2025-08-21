export interface OrderLogVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 内部订单号
   */
  orderId: string | number;

  /**
   * 外部系统订单号
   */
  externalOrderId: string | number;

  /**
   * 系统来源 
   */
  systemSource: string;

  /**
   * 接口类型 
   */
  interfaceType: string;

  /**
   * 请求方向 (1 入站 2 出站)
   */
  direction: string;

  /**
   * 请求时间(精确到毫秒)
   */
  requestTime: string;

  /**
   * 响应时间(精确到毫秒)
   */
  responseTime: string;

  /**
   * 请求处理时长(毫秒)
   */
  durationMs: number;

  /**
   * 请求内容
   */
  requestBody: string;

  /**
   * 响应内容
   */
  responseBody: string;

  /**
   * HTTP状态码
   */
  responseCode: string;

  /**
   * 是否成功 (0-失败, 1-成功)
   */
  success: number;

  /**
   * 错误信息
   */
  errorMessage: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderLogForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 内部订单号
   */
  orderId?: string | number;

  /**
   * 外部系统订单号
   */
  externalOrderId?: string | number;

  /**
   * 系统来源 
   */
  systemSource?: string;

  /**
   * 接口类型 
   */
  interfaceType?: string;

  /**
   * 请求方向 (1 入站 2 出站)
   */
  direction?: string;

  /**
   * 请求时间(精确到毫秒)
   */
  requestTime?: string;

  /**
   * 响应时间(精确到毫秒)
   */
  responseTime?: string;

  /**
   * 请求处理时长(毫秒)
   */
  durationMs?: number;

  /**
   * 请求内容
   */
  requestBody?: string;

  /**
   * 响应内容
   */
  responseBody?: string;

  /**
   * HTTP状态码
   */
  responseCode?: string;

  /**
   * 是否成功 (0-失败, 1-成功)
   */
  success?: number;

  /**
   * 错误信息
   */
  errorMessage?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderLogQuery extends PageQuery {

  /**
   * 内部订单号
   */
  orderId?: string | number;

  /**
   * 外部系统订单号
   */
  externalOrderId?: string | number;

  /**
   * 系统来源 
   */
  systemSource?: string;

  /**
   * 接口类型 
   */
  interfaceType?: string;

  /**
   * 请求方向 (1 入站 2 出站)
   */
  direction?: string;

  /**
   * 请求时间(精确到毫秒)
   */
  requestTime?: string;

  /**
   * 响应时间(精确到毫秒)
   */
  responseTime?: string;

  /**
   * 请求处理时长(毫秒)
   */
  durationMs?: number;

  /**
   * 请求内容
   */
  requestBody?: string;

  /**
   * 响应内容
   */
  responseBody?: string;

  /**
   * HTTP状态码
   */
  responseCode?: string;

  /**
   * 是否成功 (0-失败, 1-成功)
   */
  success?: number;

  /**
   * 错误信息
   */
  errorMessage?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



