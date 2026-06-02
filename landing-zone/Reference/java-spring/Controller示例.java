package com.example.order.controller;

import com.example.order.dto.OrderCreateDTO;
import com.example.order.service.OrderService;
import com.example.order.vo.OrderVO;
import com.example.common.ResultVO;
import com.example.common.PageVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * 订单管理 Controller。
 * 约束要点：统一返回 ResultVO、参数用 @Valid 校验、关键节点记日志。
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /** 分页查询订单 */
    @GetMapping
    public ResultVO<PageVO<OrderVO>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size) {
        log.info("[OrderController.list] page={}, size={}", page, size);
        return ResultVO.success(orderService.list(page, size));
    }

    /** 创建订单 */
    @PostMapping
    public ResultVO<Long> create(@RequestBody @Valid OrderCreateDTO dto) {
        log.info("[OrderController.create] dto={}", dto);
        Long orderId = orderService.create(dto);
        log.info("[OrderController.create] created orderId={}", orderId);
        return ResultVO.success(orderId);
    }

    /** 查询订单详情 */
    @GetMapping("/{id}")
    public ResultVO<OrderVO> getById(@PathVariable Long id) {
        log.info("[OrderController.getById] id={}", id);
        return ResultVO.success(orderService.getById(id));
    }
}
