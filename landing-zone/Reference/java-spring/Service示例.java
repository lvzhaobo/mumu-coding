package com.example.order.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.common.BizException;
import com.example.common.PageVO;
import com.example.order.dto.OrderCreateDTO;
import com.example.order.entity.Order;
import com.example.order.mapper.OrderMapper;
import com.example.order.vo.OrderVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

/**
 * 订单管理 Service 实现。
 * 约束要点：事务注解、分页模式、实体→VO 转换、异常用 BizException。
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderMapper orderMapper;

    @Override
    public PageVO<OrderVO> list(Integer page, Integer size) {
        Page<Order> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(Order::getCreateTime);

        Page<Order> result = orderMapper.selectPage(pageParam, wrapper);

        return PageVO.of(
                result.getRecords().stream()
                        .map(this::toVO)
                        .collect(Collectors.toList()),
                result.getTotal()
        );
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long create(OrderCreateDTO dto) {
        Order entity = new Order();
        // 使用 BeanUtils 或 MapStruct 复制字段
        entity.setProductId(dto.getProductId());
        entity.setQuantity(dto.getQuantity());
        entity.setStatus("PENDING");

        orderMapper.insert(entity);
        log.info("[OrderService.create] orderId={}, productId={}", entity.getId(), dto.getProductId());
        return entity.getId();
    }

    @Override
    public OrderVO getById(Long id) {
        Order entity = orderMapper.selectById(id);
        if (entity == null) {
            throw new BizException("订单不存在: " + id);
        }
        return toVO(entity);
    }

    private OrderVO toVO(Order entity) {
        OrderVO vo = new OrderVO();
        vo.setId(entity.getId());
        vo.setStatus(entity.getStatus());
        vo.setAmount(entity.getAmount());
        vo.setCreateTime(entity.getCreateTime());
        return vo;
    }
}
