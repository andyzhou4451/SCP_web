import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SaleChannelVO, SaleChannelForm, SaleChannelQuery } from '@/api/biz/saleChannel/types';

/**
 * 查询销售渠道列表
 * @param query
 * @returns {*}
 */

export const listSaleChannel = (query?: SaleChannelQuery): AxiosPromise<SaleChannelVO[]> => {
  return request({
    url: '/biz/saleChannel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询销售渠道详细
 * @param id
 */
export const getSaleChannel = (id: string | number): AxiosPromise<SaleChannelVO> => {
  return request({
    url: '/biz/saleChannel/' + id,
    method: 'get'
  });
};

export const switchSaleChannelStatus = (id: string | number, status: '0' | '1') => {
  return request({ url: `/biz/saleChannel/${id}/status/${status}`, method: 'put' });
}
/**
 * 新增销售渠道
 * @param data
 */
// export const addSaleChannel = (data: SaleChannelForm) => {
//   return request({
//     url: '/biz/saleChannel',
//     method: 'post',
//     data: data
//   });
// };

/**
 * 修改销售渠道
 * @param data
 */
export const updateSaleChannel = (data: SaleChannelForm) => {
  return request({
    url: '/biz/saleChannel',
    method: 'put',
    data: data
  });
};

/**
 * 删除销售渠道
 * @param id
 */
export const delSaleChannel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/saleChannel/' + id,
    method: 'delete'
  });
};
