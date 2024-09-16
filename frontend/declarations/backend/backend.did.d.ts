import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Stock {
  'name' : string,
  'quantity' : number,
  'price' : number,
  'symbol' : string,
}
export interface _SERVICE {
  'addOrUpdateStock' : ActorMethod<[string, string, number, number], undefined>,
  'getAllStocks' : ActorMethod<[], Array<Stock>>,
  'getTotalPortfolioValue' : ActorMethod<[], number>,
  'removeStock' : ActorMethod<[string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
