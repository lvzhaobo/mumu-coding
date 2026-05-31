# 09 — API 接口规格（促销活动系统）

---

| 项 | 值 |
|---|---|
| 模块编号 | MS-001 |
| 模块名称 | 促销活动系统 |
| 文档版本 | v1.0 |
| 阶段 | Design（How — 契约真源） |
| Base URL | `/api/v1/promotion`（所有端点以此前缀开头） |

---

> **本文是全部 API 端点的契约真源**。`05` 定义"用户要什么"，**09（本文）定义"后端必须返回什么"**，`13` 的测试断言以本文为准。

## 1. 端点总览

| # | 端点 | 方法 | 功能 | 成功码 |
|---|------|------|------|--------|
| 1 | `/api/v1/promotion/activities` | POST | 创建促销活动 | 201 |
| 2 | `/api/v1/promotion/activities` | GET | 查询活动列表 | 200 |
| 3 | `/api/v1/promotion/activities/{id}` | GET | 查询活动详情 | 200 |
| 4 | `/api/v1/promotion/activities/{id}` | PUT | 更新活动配置 | 200 |
| 5 | `/api/v1/promotion/activities/{id}` | DELETE | 删除活动 | 204 |
| 6 | `/api/v1/promotion/activities/{id}/submit` | PUT | 提交活动审核 | 200 |
| 7 | `/api/v1/promotion/activities/{id}/approve` | PUT | 审批活动 | 200 |
| 8 | `/api/v1/promotion/activities/{id}/preview` | GET | 预览活动配置 | 200 |
| 9 | `/api/v1/promotion/coupons` | POST | 创建优惠券 | 201 |
| 10 | `/api/v1/promotion/coupons` | GET | 查询优惠券列表 | 200 |
| 11 | `/api/v1/promotion/coupons/{couponId}/receive` | POST | 用户领取优惠券 | 200 |
| 12 | `/api/v1/promotion/coupons/recommend` | POST | 智能推荐优惠券 | 200 |
| 13 | `/api/v1/promotion/coupons/my` | GET | 查询当前用户优惠券 | 200 |
| 14 | `/api/v1/promotion/orders/calculate` | POST | 计算订单优惠 | 200 |
| 15 | `/api/v1/promotion/dashboard` | GET | 获取实时数据看板 | 200 |
| 16 | `/api/v1/promotion/dashboard/export` | GET | 导出数据报表 | 200 |
| 17 | `/api/v1/promotion/roles` | CRUD | 角色管理 | 200/201/204 |
| 18 | `/api/v1/promotion/logs` | GET | 查询操作日志 | 200 |

## 2. 统一响应规范

### 2.1 成功响应

```json
{
  "traceId": "tr_abc123def456...",
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 2.2 错误响应

```json
{
  "traceId": "tr_abc123def456...",
  "code": 400,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  }
}
```

### 2.3 错误码清单

| HTTP | error.code | 触发条件 | details |
|------|-----------|----------|---------|
| 400 | `EMPTY_QUERY` | 请求参数为空 | `{}` |
| 400 | `INVALID_QUERY` | 参数格式错误或校验失败 | `{"field": "字段名", "reason": "原因"}` |
| 400 | `COUPON_OUT_OF_STOCK` | 优惠券库存不足 | `{"couponId": "优惠券ID"}` |
| 400 | `COUPON_LIMIT_REACHED` | 用户已达到领取上限 | `{"userId": "用户ID", "couponId": "优惠券ID"}` |
| 401 | `UNAUTHORIZED` | 未登录或 token 失效 | `{}` |
| 403 | `FORBIDDEN` | 无操作权限 | `{"requiredRole": "需要的角色"}` |
| 404 | `COUPON_NOT_FOUND` | 优惠券不存在 | `{"couponId": "优惠券ID"}` |
| 404 | `ACTIVITY_NOT_FOUND` | 活动不存在 | `{"activityId": "活动ID"}` |
| 409 | `ACTIVITY_ALREADY_APPROVED` | 活动已通过审批 | `{"activityId": "活动ID", "status": "APPROVED"}` |
| 500 | `INTERNAL_ERROR` | 系统内部错误 | `{}` |
| 502 | `UPSTREAM_ERROR` | 依赖服务不可用 | `{"service": "服务名"}` |
| 503 | `SERVICE_UNAVAILABLE` | 服务降级或维护中 | `{"message": "服务维护中"}` |

## 3. 活动管理 API

### 3.1 POST `/api/v1/promotion/activities` — 创建促销活动

**请求体**：

| 字段 | 类型 | 必填 | 约束 | 说明 |
|------|------|------|------|------|
| `name` | string | 是 | 2-100字符 | 活动名称 |
| `description` | string | 否 | 最大500字符 | 活动描述 |
| `startTime` | string | 是 | ISO 8601格式 | 开始时间 |
| `endTime` | string | 是 | ISO 8601格式 | 结束时间 |
| `type` | string | 是 | FULL_REDUCTION/COUPON/MIXED | 活动类型 |
| `fullReductionThreshold` | number | 否 | >=1 | 满减阈值（满X元） |
| `fullReductionAmount` | number | 否 | >=1 | 满减金额（减X元） |
| `status` | string | 否 | 默认DRAFT | 活动状态 |

**成功响应**（201）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 201 |
| `message` | string | 是 | "创建成功" |
| `data` | object | 是 | 活动信息 |
| `data.id` | string | 是 | 活动ID |
| `data.name` | string | 是 | 活动名称 |
| `data.status` | string | 是 | 活动状态 |

### 3.2 GET `/api/v1/promotion/activities` — 查询活动列表

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `page` | number | 否 | 1 | 页码 |
| `size` | number | 否 | 20 | 每页数量 |
| `status` | string | 否 | - | 活动状态筛选 |
| `keyword` | string | 否 | - | 活动名称搜索 |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `message` | string | 是 | "success" |
| `data` | object | 是 | 返回数据 |
| `data.content` | array | 是 | 活动列表 |
| `data.totalElements` | number | 是 | 总记录数 |
| `data.totalPages` | number | 是 | 总页数 |

### 3.3 GET `/api/v1/promotion/activities/{id}` — 查询活动详情

**路径参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 活动ID |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `message` | string | 是 | "success" |
| `data` | object | 是 | 活动详情 |
| `data.id` | string | 是 | 活动ID |
| `data.name` | string | 是 | 活动名称 |
| `data.description` | string | 否 | 活动描述 |
| `data.startTime` | string | 是 | 开始时间 |
| `data.endTime` | string | 是 | 结束时间 |
| `data.type` | string | 是 | 活动类型 |
| `data.status` | string | 是 | 活动状态 |
| `data.coupons` | array | 是 | 关联优惠券列表 |

### 3.4 PUT `/api/v1/promotion/activities/{id}` — 更新活动配置

**路径参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 活动ID |

**请求体**：同创建活动（可选字段）

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `message` | string | 是 | "更新成功" |
| `data` | object | 是 | 更新后的活动信息 |

### 3.5 DELETE `/api/v1/promotion/activities/{id}` — 删除活动

**路径参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 活动ID |

**成功响应**（204）：无响应体

### 3.6 PUT `/api/v1/promotion/activities/{id}/submit` — 提交活动审核

**路径参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 活动ID |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `message` | string | 是 | "已提交审核" |
| `data.status` | string | 是 | "PENDING_APPROVAL" |

### 3.7 PUT `/api/v1/promotion/activities/{id}/approve` — 审批活动

**路径参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 活动ID |

**请求体**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `approved` | boolean | 是 | 是否通过 |
| `remark` | string | 否 | 审批意见 |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `message` | string | 是 | "审批成功" |
| `data.status` | string | 是 | "APPROVED" 或 "REJECTED" |

## 4. 优惠券 API

### 4.1 POST `/api/v1/promotion/coupons` — 创建优惠券

**请求体**：

| 字段 | 类型 | 必填 | 约束 | 说明 |
|------|------|------|------|------|
| `name` | string | 是 | 2-50字符 | 优惠券名称 |
| `type` | string | 是 | FULL_REDUCTION/DISCOUNT/FREE_SHIPPING | 优惠券类型 |
| `discountValue` | number | 是 | >0 | 折扣值（金额或比例） |
| `minConsumption` | number | 否 | >=0 | 最低消费（满减券必填） |
| `totalStock` | number | 是 | >=1 | 总库存 |
| `limitPerUser` | number | 是 | >=1 | 每人限领 |
| `validDays` | number | 是 | >=1 | 有效期天数 |
| `activityId` | string | 是 | - | 关联活动ID |

**成功响应**（201）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 201 |
| `message` | string | 是 | "创建成功" |
| `data.id` | string | 是 | 优惠券ID |

### 4.2 GET `/api/v1/promotion/coupons` — 查询优惠券列表

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `page` | number | 否 | 1 | 页码 |
| `size` | number | 否 | 20 | 每页数量 |
| `activityId` | string | 否 | - | 活动ID筛选 |
| `type` | string | 否 | - | 类型筛选 |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `data.content` | array | 是 | 优惠券列表 |
| `data.totalElements` | number | 是 | 总记录数 |

### 4.3 POST `/api/v1/promotion/coupons/{couponId}/receive` — 用户领取优惠券

**路径参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `couponId` | string | 是 | 优惠券ID |

**请求体**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `userId` | string | 是 | 用户ID |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `message` | string | 是 | "领取成功" |
| `data.userCouponId` | string | 是 | 用户优惠券ID |

### 4.4 POST `/api/v1/promotion/coupons/recommend` — 智能推荐优惠券

**请求体**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `userId` | string | 是 | 用户ID |
| `orderAmount` | number | 是 | 订单金额 |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `data.recommendedCoupon` | object | 是 | 推荐的优惠券 |
| `data.recommendedCoupon.id` | string | 是 | 优惠券ID |
| `data.recommendedCoupon.name` | string | 是 | 优惠券名称 |
| `data.recommendedCoupon.savings` | number | 是 | 可节省金额 |
| `data.availableCoupons` | array | 是 | 用户可用优惠券列表 |

## 5. 用户优惠券 API

### 5.1 GET `/api/v1/promotion/coupons/my` — 查询当前用户优惠券

> 用户ID 从 JWT Token 中解析，不通过 URL 路径传入，避免 A 用户越权查询 B 用户数据。

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `status` | string | 否 | - | USED/UNUSED/EXPIRED |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `data` | array | 是 | 用户优惠券列表 |
| `data[].id` | string | 是 | 用户优惠券ID |
| `data[].couponId` | string | 是 | 优惠券ID |
| `data[].status` | string | 是 | 状态 |
| `data[].expireTime` | string | 是 | 过期时间 |

## 6. 订单优惠计算 API

### 6.1 POST `/api/v1/promotion/orders/calculate` — 计算订单优惠

**请求体**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `userId` | string | 是 | 用户ID |
| `items` | array | 是 | 商品列表 |
| `items[].productId` | string | 是 | 商品ID |
| `items[].price` | number | 是 | 商品单价 |
| `items[].quantity` | number | 是 | 数量 |
| `selectedCouponId` | string | 否 | 用户选择的优惠券ID |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `data.subtotal` | number | 是 | 商品总价 |
| `data.fullReductionAmount` | number | 是 | 满减金额 |
| `data.couponAmount` | number | 是 | 优惠券抵扣金额 |
| `data.total` | number | 是 | 应付金额 |
| `data.recommendedCoupon` | object | 否 | 推荐优惠券 |
| `data.discountDetail` | array | 是 | 优惠明细 |

## 7. 数据看板 API

### 7.1 GET `/api/v1/promotion/dashboard` — 获取实时数据看板

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `timeRange` | string | 否 | REAL_TIME | REAL_TIME/TODAY/WEEK |
| `activityId` | string | 否 | - | 活动ID |

**成功响应**（200）：

| 字段 | 类型 | 必有 | 说明 |
|------|------|------|------|
| `traceId` | string | 是 | 链路追踪 ID |
| `code` | number | 是 | 200 |
| `data.orderCount` | number | 是 | 订单量 |
| `data.salesAmount` | number | 是 | 销售额 |
| `data.conversionRate` | number | 是 | 转化率(%) |
| `data.couponUsageRate` | number | 是 | 优惠券使用率(%) |
| `data.avgOrderValue` | number | 是 | 平均客单价 |
| `data.trend` | array | 是 | 趋势数据 |

### 7.2 GET `/api/v1/promotion/dashboard/export` — 导出数据报表

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `startDate` | string | 是 | - | 开始日期 |
| `endDate` | string | 是 | - | 结束日期 |

**成功响应**（200）：Excel 文件流

## 8. 参数校验规则汇总

| 端点 | 字段 | 规则 | 失败 HTTP | error.code |
|------|------|------|-----------|-----------|
| POST `/api/v1/promotion/activities` | `name` | 2-100字符 | 400 | `INVALID_QUERY` |
| POST `/api/v1/promotion/activities` | `startTime` | 必须早于 endTime | 400 | `INVALID_QUERY` |
| POST `/api/v1/promotion/coupons` | `name` | 2-50字符 | 400 | `INVALID_QUERY` |
| POST `/api/v1/promotion/coupons` | `totalStock` | >=1 | 400 | `INVALID_QUERY` |
| POST `/api/v1/promotion/coupons/{id}/receive` | `userId` | 非空 | 400 | `EMPTY_QUERY` |
| POST `/api/v1/promotion/orders/calculate` | `items` | 非空数组 | 400 | `EMPTY_QUERY` |

---

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-05-15 | 首版填写 |