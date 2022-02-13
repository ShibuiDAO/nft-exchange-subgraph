import { bigInt, BigInt, store } from "@graphprotocol/graph-ts"
import {
  ERC721ExchangeUpgradeable,
  BuyOrderAccepted,
  BuyOrderBooked,
  BuyOrderCanceled,
  BuyOrderUpdated,
  SellOrderBooked,
  SellOrderCanceled,
  SellOrderFufilled,
  SellOrderUpdated
} from "../generated/ERC721ExchangeUpgradeable/ERC721ExchangeUpgradeable"
import { getOrCreateAccount } from "./utils/entityUtils"
import { getOrCreateBuyOrder, getOrCreateSellOrder } from "./utils/orderUtils";

export function handleBuyOrderAccepted(event: BuyOrderAccepted): void {
  const buyer = getOrCreateAccount(event.params.buyer);
  const seller = getOrCreateAccount(event.params.seller);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);

  buyer.buyVolume = bigInt.plus(buyer.buyVolume, event.params.offer);
  seller.sellVolume = bigInt.plus(seller.sellVolume, event.params.offer);
  contract.volume = bigInt.plus(contract.volume, event.params.offer);

  contract.save();
  buyer.save();
  seller.save();
}

export function handleBuyOrderBooked(event: BuyOrderBooked): void {
  const buyer = getOrCreateAccount(event.params.buyer);
  const owner = getOrCreateAccount(event.params.owner);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const buyOrder = getOrCreateBuyOrder(buyer, contract, event.params.tokenId);

  buyOrder.owner = owner.id;
  buyOrder.expiration = event.params.expiration;
  buyOrder.offer = event.params.offer;

  buyOrder.save();
  buyer.save();
  owner.save();
}

export function handleBuyOrderCanceled(event: BuyOrderCanceled): void {
  const buyer = getOrCreateAccount(event.params.buyer);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const buyOrder = getOrCreateBuyOrder(buyer, contract, event.params.tokenId);

  store.remove('BuyOrder', buyOrder.id);

  contract.save();
  buyer.save();
}

export function handleBuyOrderUpdated(event: BuyOrderUpdated): void {
  const buyer = getOrCreateAccount(event.params.buyer);
  const owner = getOrCreateAccount(event.params.owner);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const buyOrder = getOrCreateBuyOrder(buyer, contract, event.params.tokenId);

  buyOrder.owner = owner.id;
  buyOrder.expiration = event.params.expiration;
  buyOrder.offer = event.params.offer;

  buyOrder.save();
  buyer.save();
  owner.save();
}

export function handleSellOrderBooked(event: SellOrderBooked): void {
  const account = getOrCreateAccount(event.params.seller);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const sellOrder = getOrCreateSellOrder(account, contract, event.params.tokenId);

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

export function handleSellOrderFufilled(event: SellOrderFufilled): void {
  const account = getOrCreateAccount(event.params.seller);
  const buyer = getOrCreateAccount(event.params.buyer);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);

  account.sellVolume = bigInt.plus(account.sellVolume, event.params.price);
  buyer.buyVolume = bigInt.plus(buyer.buyVolume, event.params.price);
  contract.volume = bigInt.plus(contract.volume, event.params.price);

  contract.save();
  account.save();
  buyer.save();
}

export function handleSellOrderUpdated(event: SellOrderUpdated): void {
  const account = getOrCreateAccount(event.params.seller);
  const contract = getOrCreateAccount(event.params.tokenContractAddress);
  const sellOrder = getOrCreateSellOrder(account, contract, event.params.tokenId);

  sellOrder.expiration = event.params.expiration;
  sellOrder.price = event.params.price;

  sellOrder.save();
  contract.save();
  account.save();
}
