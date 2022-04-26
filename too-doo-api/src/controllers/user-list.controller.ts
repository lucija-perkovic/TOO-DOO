import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  get, getModelSchemaRef, param
} from '@loopback/rest';
import {List} from '../models';
import {ListRepository} from '../repositories';

@authenticate('jwt')

export class UserListController {
  constructor(
    @repository(ListRepository)
    protected listRepository: ListRepository,
  ) { }

  @get('/users/{id}/lists', {
    responses: {
      '200': {
        description: 'Return lists for user',
        content: {
          'application/json': {
            schema: {
              type: 'array', lists: getModelSchemaRef(List),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
  ): Promise<List[]> {
    return this.listRepository.find({where: {userId: id}})
  }
}
