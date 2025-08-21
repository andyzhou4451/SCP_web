export interface SensitiveWordVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 敏感词
   */
  sensitiveWords: string;

  /**
   * 敏感等级：高危、低危
   */
  sensitiveLevel: string;

  /**
   * 状态（0禁用 1正常)
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SensitiveWordForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 敏感词
   */
  sensitiveWords?: string;

  /**
   * 敏感等级：高危、低危
   */
  sensitiveLevel?: string;

  /**
   * 状态（0禁用 1正常)
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SensitiveWordQuery extends PageQuery {

  /**
   * 敏感词
   */
  sensitiveWords?: string;

  /**
   * 敏感等级：高危、低危
   */
  sensitiveLevel?: string;

  /**
   * 状态（0禁用 1正常)
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



