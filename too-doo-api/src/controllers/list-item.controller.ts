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
  List,
  Item,
} from '../models';
import {ListRepository} from '../repositories';

export class ListItemController {
  constructor(
    @repository(ListRepository) protected listRepository: ListRepository,
  ) { }

  @get('/lists/{id}/items', {
    responses: {
      '200': {
        description: 'Array of List has many Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Item>,
  ): Promise<Item[]> {
    return this.listRepository.items(id).find(filter);
  }

  @post('/lists/{id}/items', {
    responses: {
      '200': {
        description: 'List model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof List.prototype.uuid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItemInList',
            exclude: ['uuid'],
            optional: ['listId']
          }),
        },
      },
    }) item: Omit<Item, 'uuid'>,
  ): Promise<Item> {
    return this.listRepository.items(id).create(item);
  }

  @patch('/lists/{id}/items', {
    responses: {
      '200': {
        description: 'List.Item PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Partial<Item>,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.listRepository.items(id).patch(item, where);
  }

  @del('/lists/{id}/items', {
    responses: {
      '200': {
        description: 'List.Item DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.listRepository.items(id).delete(where);
  }
}
