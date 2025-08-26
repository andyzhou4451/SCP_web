import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BrandLibraryVO, BrandLibraryForm, BrandLibraryQuery } from '@/api/biz/brandLibrary/types';

/**
 * 查询商品品牌库列表
 * @param query
 * @returns {*}
 */

export const listBrandLibrary = (query?: BrandLibraryQuery): AxiosPromise<BrandLibraryVO[]> => {
  return request({
    url: '/biz/brandLibrary/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询商品品牌库详细
 * @param id
 */
export const getBrandLibrary = (id: string | number): AxiosPromise<BrandLibraryVO> => {
  return request({
    url: '/biz/brandLibrary/' + id,
    method: 'get'
  });
};

/**
 * 新增商品品牌库
 * @param data
 */
export const addBrandLibrary = (data: BrandLibraryForm) => {
  return request({
    url: '/biz/brandLibrary',
    method: 'post',
    data: data
  });
};

/**
 * 修改商品品牌库
 * @param data
 */
export const updateBrandLibrary = (data: BrandLibraryForm) => {
  return request({
    url: '/biz/brandLibrary',
    method: 'put',
    data: data
  });
};

/**
 * 删除商品品牌库
 * @param id
 */
export const delBrandLibrary = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/brandLibrary/' + id,
    method: 'delete'
  });
};
