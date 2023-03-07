import { FieldModel } from '@syncfusion/ej2-schedule';

interface CustomFieldModel extends FieldModel {
  customField1?: { name: string, default?: string };
  customField2?: { name: string, default?: string };
 
}