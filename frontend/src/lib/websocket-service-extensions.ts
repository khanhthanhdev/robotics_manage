// Extensions to websocket-service.ts types
import { AudienceDisplaySettings } from './websocket-service';

// Extended type for audience display settings
export interface ExtendedAudienceDisplaySettings extends AudienceDisplaySettings {
  fieldId?: string;
}
