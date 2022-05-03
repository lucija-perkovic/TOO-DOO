import {authenticate} from '@loopback/authentication';
import {Entity, model, property, repository} from '@loopback/repository';
import {
  get, param
} from '@loopback/rest';
import {Item} from '../models';
import {ItemRepository, ListRepository} from '../repositories';

@authenticate('jwt')

@model()
export class ListItemsSchema extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  listId?: string;

  @property({
    type: 'string',
    id: true,
  })
  userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  listName: string;

  @property({
    type: Array,
    required: true,
  })
  items: Item[];
  constructor(data?: Partial<ListItemsSchema>) {
    super(data);
  }
}

export class UserListController {
  constructor(
    @repository(ListRepository)
    protected listRepository: ListRepository,
    @repository(ItemRepository)
    protected itemRepository: ItemRepository,
  ) { }

  @get('/users/{id}/lists', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
  ): Promise<{lists: ListItemsSchema[]}> {
    const listsR = await this.listRepository.find({where: {userId: id}});
    let items: Item[];
    let lists: ListItemsSchema[] = [];
    await Promise.all(listsR.map(async (list) => {
      const itemsL = await this.itemRepository.find({where: {listId: list.uuid}});
      items = itemsL.map((item: any) => {
        return item;
      });
      const listItems = new ListItemsSchema(
        {
          listId: list.uuid,
          userId: list.userId,
          listName: list.name,
          items: items
        }
      )
      lists.push(listItems)
      return true
    }))
    return {lists}
  }
}
