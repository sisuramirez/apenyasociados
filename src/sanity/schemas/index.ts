import { post, blockContent, schemaTypes as postSchemaTypes } from "./post";
import { service } from "./service";

export { post, blockContent, service };

// Combined schema types array for Sanity Studio
export const schemaTypes = [...postSchemaTypes, service];
