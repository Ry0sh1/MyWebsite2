import {Owner} from "../owner/owner";

export interface Computer{
  id: number;
  name: string;
  serial_number: string;
  status: Status;
  operational_status: OperationalStatus;
  operational_impact: OperationImpact;

  organizational_unit: string;
  cost_centre: number;
  location: string;
  owner: Owner;
  property: Property;

  inventory_number: number;
  inventory_item: string;
  end_of_operation: Date;

  domain: string;
  account_status: AccountStatus;
  dns_name: string;
  dns_server: string;
  standard_gateway: string;
  ip_address: string;
  ip_v6_address: string;

  manufacturer: string;
  model: string;
  year_of_manufacture: Date;
  processor: string;
  operation_system: OperationSystem;
}

export enum Status{
  ACTIVE = 'ACTIVE',
  OUTGOING = 'OUTGOING',
  RETIRED = 'RETIRED',
  DEFECTIVE = 'DEFECTIVE',
  INCOMING = 'INCOMING',
  STOCK = 'STOCK',
  RESERVED = 'RESERVED',
  UNKNOWN = 'UNKNOWN',
  ON_THE_WAY = 'ON_THE_WAY',
  MISSING = 'MISSING',
  SCRAPPED = 'SCRAPPED',
  RECYCLED = 'RECYCLED'
}
export enum Property{
  UNKNOWN = 'UNKNOWN',
  DEDICATED_TO_COMPANY = 'DEDICATED_TO_COMPANY',
  COMPANY_USED = 'COMPANY_USED',
  EMPLOYEE = 'EMPLOYEE',
  EXTERNAL = 'EXTERNAL'
}
export enum OperationSystem{
  WINDOWS11 = 'WINDOWS11',
  WINDOWS10 = 'WINDOWS10',
  WINDOWS11_PRO = 'WINDOWS_PRO',
  UBUNTU = 'UBUNTU',
  DEBIAN = 'DEBIAN',
  FEDORA = 'FEDORA',
  MAC_OS = 'MAC_OS'
}
export enum OperationalStatus {
  UNKNOWN = 'UNKNOWN',
  POWERED_ON = 'POWERED_ON',
  POWERED_OFF = 'POWERED_OFF',
  PAUSED = 'PAUSED'
}
export enum OperationImpact{
  PERSON = 'PERSON',
  WORKING_GROUP = 'WORKING_GROUP',
  COMPANY = 'COMPANY'
}
export enum AccountStatus{
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE'
}
