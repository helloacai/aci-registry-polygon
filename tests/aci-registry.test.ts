import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address } from "@graphprotocol/graph-ts"
import { Registered } from "../generated/schema"
import { Registered as RegisteredEvent } from "../generated/ACIRegistry/ACIRegistry"
import { handleRegistered } from "../src/aci-registry"
import { createRegisteredEvent } from "./aci-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let uid = Bytes.fromI32(1234567890)
    let executor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let aci = "ethereum.Tuple Not implemented"
    let newRegisteredEvent = createRegisteredEvent(uid, executor, aci)
    handleRegistered(newRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Registered created and stored", () => {
    assert.entityCount("Registered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Registered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "uid",
      "1234567890"
    )
    assert.fieldEquals(
      "Registered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "executor",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Registered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "aci",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
