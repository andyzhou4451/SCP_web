import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GoodsSpuVO, GoodsSpuForm, GoodsSpuQuery } from '@/api/biz/goodsSpu/types';

/**
 * 查询spu信息列表
 * @param query
 * @returns {*}
 */

export const listGoodsSpu = (query?: GoodsSpuQuery): AxiosPromise<GoodsSpuVO[]> => {
  return request({
    url: '/biz/goodsSpu/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询spu信息详细
 * @param id
 */
export const getGoodsSpu = (id: string | number): AxiosPromise<GoodsSpuVO> => {
  return request({
    url: '/biz/goodsSpu/' + id,
    method: 'get'
  });
};

/**
 * 新增spu信息
 * @param data
 */
export const addGoodsSpu = (data: GoodsSpuForm) => {
  return request({
    url: '/biz/goodsSpu',
    method: 'post',
    data: data
  });
};

/**
 * 修改spu信息
 * @param data
 */
export const updateGoodsSpu = (data: GoodsSpuForm) => {
  return request({
    url: '/biz/goodsSpu',
    method: 'put',
    data: data
  });
};


/**
 * 删除spu信息
 * @param id
 */
export const delGoodsSpu = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/goodsSpu/' + id,
    method: 'delete'
  });
};

/**
 * 查询商品分类树
 * @param data
 */
export const getClassificationAll = () => {
  return request({
    url: '/biz/classification/all',
    method: 'get'
  });
};

/**
 * 查询商品品牌
 * @param data
 */
export const getBrandLibraryAll = () => {
  return request({
    url: '/biz/brandLibrary/all',
    method: 'get'
  });
};

