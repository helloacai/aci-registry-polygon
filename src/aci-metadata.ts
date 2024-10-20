import { json, Bytes, dataSource, JSONValue, JSONValueKind } from '@graphprotocol/graph-ts'
import { ACIMetadata } from '../generated/schema'
  
  export function handleMetadata(content: Bytes): void {
    let aciMetadata = new ACIMetadata(dataSource.stringParam())
    const value = json.fromBytes(content).toObject()
    if (value) {
        const name = value.get('name')
        const description = value.get('description')
        
        
        if(name && name.kind == JSONValueKind.STRING) {
            aciMetadata.name = name.toString()
        }

        if(description && description.kind == JSONValueKind.STRING) {
            aciMetadata.description = description.toString()
        }
  
        aciMetadata.save()
    }
  }