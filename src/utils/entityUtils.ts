import { Address } from "@graphprotocol/graph-ts";
import { Account } from "../../generated/schema";

export function getOrCreateAccount(address: Address): Account {
    const id = address.toHexString();
    let account = Account.load(id);

    if (!account) {
       account = new Account(id); 
    }

    return account;
}