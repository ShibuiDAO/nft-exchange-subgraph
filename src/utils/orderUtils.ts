import { BigInt } from "@graphprotocol/graph-ts";
import { Account, BuyOrder, SellOrder } from "../../generated/schema";

export function getOrCreateSellOrder(seller: Account, contract: Account, tokenId: BigInt): SellOrder {
    const orderId = `${seller.id}-${contract.id}-${tokenId.toHexString()}-SELL`;

    let sellOrder = SellOrder.load(orderId);

    if (!sellOrder) {
        sellOrder = new SellOrder(orderId);
    }

    sellOrder.seller = seller.id;
    sellOrder.contract = contract.id;
    sellOrder.token = tokenId;
    sellOrder.save();

    return sellOrder;
}

export function getOrCreateBuyOrder(buyer: Account, contract: Account, tokenId: BigInt): BuyOrder {
    const orderId = `${buyer.id}-${contract.id}-${tokenId.toHexString()}-BUY`;

    let buyOrder = BuyOrder.load(orderId);

    if (!buyOrder) {
        buyOrder = new BuyOrder(orderId);
    }

    buyOrder.buyer = buyer.id;
    buyOrder.contract = contract.id;
    buyOrder.token = tokenId;
    buyOrder.save();

    return buyOrder;
}
