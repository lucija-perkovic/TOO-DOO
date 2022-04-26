import {belongsTo, Entity, model, property} from '@loopback/repository';
import {List, ListWithRelations} from './list.model';

@model()
export class Item extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  uuid?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @belongsTo(() => List)
  listId: string;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  list: ListWithRelations;
}

export type ItemWithRelations = Item & ItemRelations;
