import {Entity, model, property, hasMany} from '@loopback/repository';
import {Item} from './item.model';

@model()
export class List extends Entity {
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

  @hasMany(() => Item)
  items: Item[];

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<List>) {
    super(data);
  }
}

export interface ListRelations {
  // describe navigational properties here
}

export type ListWithRelations = List & ListRelations;
