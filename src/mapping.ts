import { BigInt, store } from "@graphprotocol/graph-ts"
import {
  ERC721ExchangeUpgradeable,
  BuyOrderAccepted,
  BuyOrderBooked,
  BuyOrderCanceled,
  BuyOrderUpdated,
  CollectionRoyaltyFeeAmountUpdated,
  CollectionRoyaltyPayoutAddressUpdated,
  SellOrderBooked,
  SellOrderCanceled,
  SellOrderFufilled,
  SellOrderUpdated
} from "../generated/ERC721ExchangeUpgradeable/ERC721ExchangeUpgradeable"
import { getOrCreateAccount } from "./utils/entityUtils"
import { getOrCreateSellOrder } from "./utils/orderUtils";

export function handleBuyOrderAccepted(event: BuyOrderAccepted): void { }

export function handleBuyOrderBooked(event: BuyOrderBooked): void { }

export function handleBuyOrderCanceled(event: BuyOrderCanceled): void { }

export function handleBuyOrderUpdated(event: BuyOrderUpdated): void { }

export function handleCollectionRoyaltyFeeAmountUpdated(
  event: CollectionRoyaltyFeeAmountUpdated
): void { }

export function handleCollectionRoyaltyPayoutAddressUpdated(
  event: CollectionRoyaltyPayoutAddressUpdated
): void { }

export function handleSellOrderBooked(event: SellOrderBooked): void {
  const account = getOrCreateAccount(event.params.seller);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const sellOrder = getOrCreateSellOrder(account, contract, event.params.tokenId);

  sellOrder.contract = contract.id;
  sellOrder.token = event.params.tokenId;
  sellOrder.expiration = event.params.expiration;
  sellOrder.price = event.params.price;

  sellOrder.save();
  contract.save();
  account.save();
}

export function handleSellOrderCanceled(event: SellOrderCanceled): void {
  const account = getOrCreateAccount(event.params.seller);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const sellOrder = getOrCreateSellOrder(account, contract, event.params.tokenId);

  store.remove('SellOrder', sellOrder.id);

  contract.save();
  account.save();
}

export function handleSellOrderFufilled(event: SellOrderFufilled): void { }

export function handleSellOrderUpdated(event: SellOrderUpdated): void {
  const account = getOrCreateAccount(event.params.seller);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const sellOrder = getOrCreateSellOrder(account, contract, event.params.tokenId);

  sellOrder.contract = contract.id;
  sellOrder.token = event.params.tokenId;
  sellOrder.expiration = event.params.expiration;
  sellOrder.price = event.params.price;

  sellOrder.save();
  contract.save();
  account.save();
}
