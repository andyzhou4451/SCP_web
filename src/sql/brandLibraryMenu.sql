-- 菜单 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[0]}, '商品品牌库', '3', '1', 'brandLibrary', 'biz/brandLibrary/index', 1, 0, 'C', '0', '0', 'biz:brandLibrary:list', '#', 103, 1, sysdate(), null, null, '商品品牌库菜单');

-- 按钮 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[1]}, '商品品牌库查询', ${table.menuIds[0]}, '1',  '#', '', 1, 0, 'F', '0', '0', 'biz:brandLibrary:query',        '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[2]}, '商品品牌库新增', ${table.menuIds[0]}, '2',  '#', '', 1, 0, 'F', '0', '0', 'biz:brandLibrary:add',          '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[3]}, '商品品牌库修改', ${table.menuIds[0]}, '3',  '#', '', 1, 0, 'F', '0', '0', 'biz:brandLibrary:edit',         '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[4]}, '商品品牌库删除', ${table.menuIds[0]}, '4',  '#', '', 1, 0, 'F', '0', '0', 'biz:brandLibrary:remove',       '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[5]}, '商品品牌库导出', ${table.menuIds[0]}, '5',  '#', '', 1, 0, 'F', '0', '0', 'biz:brandLibrary:export',       '#', 103, 1, sysdate(), null, null, '');
