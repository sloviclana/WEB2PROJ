import OrderDto from "./OrderDto";

export default class OrderResponseDto {
    constructor(data) {
        this.orderDto = new OrderDto(data);
    }
}