import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  List,
} from '../models';
import {UserRepository} from '../repositories';

export class UserListController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/lists', {
    responses: {
      '200': {
        description: 'Array of User has many List',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(List)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<List>,
  ): Promise<List[]> {
    return this.userRepository.lists(id).find(filter);
  }

  @post('/users/{id}/lists', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(List)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.uuid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(List, {
            title: 'NewListInUser',
            exclude: ['uuid'],
            optional: ['userId']
          }),
        },
      },
    }) list: Omit<List, 'uuid'>,
  ): Promise<List> {
    return this.userRepository.lists(id).create(list);
  }

  @patch('/users/{id}/lists', {
    responses: {
      '200': {
        description: 'User.List PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(List, {partial: true}),
        },
      },
    })
    list: Partial<List>,
    @param.query.object('where', getWhereSchemaFor(List)) where?: Where<List>,
  ): Promise<Count> {
    return this.userRepository.lists(id).patch(list, where);
  }

  @del('/users/{id}/lists', {
    responses: {
      '200': {
        description: 'User.List DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(List)) where?: Where<List>,
  ): Promise<Count> {
    return this.userRepository.lists(id).delete(where);
  }
}
