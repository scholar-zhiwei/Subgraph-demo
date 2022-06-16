import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  NewGravatar,
  UpdatedGravatar
} from "../generated/Gravity/Gravity"
import { ExampleEntity } from "../generated/schema"

export function handleNewGravatar(event: NewGravatar): void {
  //验证是否以event.transaction.from.toHex()为id的实体
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    //没有 则创建
    entity = new ExampleEntity(event.transaction.from.toHex())

    //设置格式
    entity.count = BigInt.fromI32(0)
  }

  //有则更新count id owner等数据
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.id = event.params.id
  entity.owner = event.params.owner

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
   //验证是否以event.transaction.from.toHex()为id的实体
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    //没有 则创建
    entity = new ExampleEntity(event.transaction.from.toHex())
    //设置格式
    entity.count = BigInt.fromI32(0)
  }

  //有则更新count id owner等数据
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.id = event.params.id
  entity.owner = event.params.owner

  // 保存实体
  entity.save()
}
