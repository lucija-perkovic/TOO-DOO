import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Item, List, ListRelations} from '../models';
import {ItemRepository} from './item.repository';

export class ListRepository extends DefaultCrudRepository<
  List,
  typeof List.prototype.uuid,
  ListRelations
> {

  public readonly items: HasManyRepositoryFactory<Item, typeof List.prototype.uuid>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(List, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
