import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  NewGravatar,
  UpdatedGravatar
} from "../generated/Gravity/Gravity"
import { ExampleEntity } from "../generated/schema"

export function handleNewGravatar(event: NewGravatar): void {
  //验证是否以event.params.id.toHex()为id的实体
  let entity = new ExampleEntity(event.params.id.toHex())
  entity.owner = event.params.owner
  entity.displayName = event.params.dispalyName
  entity.imageUrl = event.params.imageUrl

  // 保存实体
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
  // - contract.gravatarToOwner(...)
  // - contract.gravatars(...)
  // - contract.ownerToGravatar(...)
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
   //验证是否以event.params.id.toHex()为id的实体
  let entity = ExampleEntity.load(event.params.id.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    //没有 则创建
    entity = new ExampleEntity(event.params.id.toHex())
  }

  //有则更新owner displayName imageUrl等数据
  entity.owner = event.params.owner
  entity.displayName = event.params.displayName
  entity.imageUrl = event.params.imageUrl

  // 保存实体
  entity.save()
}
