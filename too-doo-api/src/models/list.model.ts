import {User, UserWithRelations} from '@loopback/authentication-jwt/dist/models/user.model';
import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Item, ItemWithRelations} from './item.model';

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

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<List>) {
    super(data);
  }
}

export interface ListRelations {
  items?: ItemWithRelations;
  user?: UserWithRelations;
}

export type ListWithRelations = List & ListRelations;
