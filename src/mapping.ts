import { BigInt } from "@graphprotocol/graph-ts"
import {
  ERC721ExchangeUpgradeable,
  BuyOrderAccepted,
  BuyOrderBooked,
  BuyOrderCanceled,
  BuyOrderUpdated,
  CollectionRoyaltyFeeAmountUpdated,
  CollectionRoyaltyPayoutAddressUpdated,
  OwnershipTransferred,
  Paused,
  SellOrderBooked,
  SellOrderCanceled,
  SellOrderFufilled,
  SellOrderUpdated,
  Unpaused
} from "../generated/ERC721ExchangeUpgradeable/ERC721ExchangeUpgradeable"
import { ExampleEntity } from "../generated/schema"

export function handleBuyOrderAccepted(event: BuyOrderAccepted): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.buyer = event.params.buyer
  entity.seller = event.params.seller

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.buyOrderExists(...)
  // - contract.getBuyOrder(...)
  // - contract.getRoyaltyPayoutAddress(...)
  // - contract.getRoyaltyPayoutRate(...)
  // - contract.getSellOrder(...)
  // - contract.owner(...)
  // - contract.paused(...)
  // - contract.sellOrderExists(...)
  // - contract.version(...)
}

export function handleBuyOrderBooked(event: BuyOrderBooked): void {}

export function handleBuyOrderCanceled(event: BuyOrderCanceled): void {}

export function handleBuyOrderUpdated(event: BuyOrderUpdated): void {}

export function handleCollectionRoyaltyFeeAmountUpdated(
  event: CollectionRoyaltyFeeAmountUpdated
): void {}

export function handleCollectionRoyaltyPayoutAddressUpdated(
  event: CollectionRoyaltyPayoutAddressUpdated
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleSellOrderBooked(event: SellOrderBooked): void {}

export function handleSellOrderCanceled(event: SellOrderCanceled): void {}

export function handleSellOrderFufilled(event: SellOrderFufilled): void {}

export function handleSellOrderUpdated(event: SellOrderUpdated): void {}

export function handleUnpaused(event: Unpaused): void {}
