import { type SchemaTypeDefinition } from 'sanity'
import { post } from './schemas/Post'
import { tag } from './schemas/Tag'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,tag],
}
