import { Registered as RegisteredEvent } from "../generated/ACIRegistry/ACIRegistry"
import { Registered } from "../generated/schema"

export function handleRegistered(event: RegisteredEvent): void {
  let entity = new Registered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.uid = event.params.uid
  entity.executor = event.params.executor
  entity.aci_uid = event.params.aci.uid
  entity.aci_executor = event.params.aci.executor
  entity.aci_owner = event.params.aci.owner
  entity.aci_cost = event.params.aci.cost
  entity.aci_costPer = event.params.aci.costPer
  entity.aci_metadataURI = event.params.aci.metadataURI
  entity.aci_apiurl = event.params.aci.apiurl
  entity.aci_status = event.params.aci.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
