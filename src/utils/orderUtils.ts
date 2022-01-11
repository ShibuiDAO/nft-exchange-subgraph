import { BigInt } from "@graphprotocol/graph-ts";
import { Account, SellOrder } from "../../generated/schema";

export function getOrCreateSellOrder(seller: Account, contract: Account, tokenId: BigInt): SellOrder {
    const orderId = `${seller.id}-${contract.id}-${tokenId.toHexString()}-SELL`;

    let sellOrder = SellOrder.load(orderId);

    if (!sellOrder) {
        sellOrder = new SellOrder(orderId);
    }

    sellOrder.seller = seller.id;
    sellOrder.save();

    return sellOrder;
}
