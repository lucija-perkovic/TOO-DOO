import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, List} from '../models';
import {ListRepository} from './list.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.uuid,
  UserRelations
> {

  public readonly lists: HasManyRepositoryFactory<List, typeof User.prototype.uuid>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ListRepository') protected listRepositoryGetter: Getter<ListRepository>,
  ) {
    super(User, dataSource);
    this.lists = this.createHasManyRepositoryFactoryFor('lists', listRepositoryGetter,);
    this.registerInclusionResolver('lists', this.lists.inclusionResolver);
  }
}
