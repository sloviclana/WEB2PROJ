import OrderShowDto from "./OrderShowDto";

export default class OrderListResponseDto {
    constructor(data) {
        this.ordersArray = data;
    }
}