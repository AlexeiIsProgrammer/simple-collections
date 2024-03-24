import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import {
  SearchCollectionEntity,
  SearchItemEntity,
} from '../entity/search.entity/search.entity';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('q') q: string): Promise<{
    collections: SearchCollectionEntity[];
    items: SearchItemEntity[];
  }> {
    return this.searchService.search(q);
  }
}
