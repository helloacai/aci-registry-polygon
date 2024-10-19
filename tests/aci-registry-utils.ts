import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address } from "@graphprotocol/graph-ts"
import { Registered } from "../generated/ACIRegistry/ACIRegistry"

export function createRegisteredEvent(
  uid: Bytes,
  executor: Address,
  aci: ethereum.Tuple
): Registered {
  let registeredEvent = changetype<Registered>(newMockEvent())

  registeredEvent.parameters = new Array()

  registeredEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromFixedBytes(uid))
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam("executor", ethereum.Value.fromAddress(executor))
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam("aci", ethereum.Value.fromTuple(aci))
  )

  return registeredEvent
}
