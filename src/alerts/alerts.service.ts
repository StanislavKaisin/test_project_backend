import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Alert, IAlertDocument } from 'src/schemas/alert.schema';
import { CreateAlertDto } from './dto/create-alert.dto';
import { PaginateModel } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertEntity } from './entities/alert.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

export interface IPaginationResponse {
  items?: AlertEntity[];
  meta?: {
    query: string;
    currentPage: number;
    itemCount?: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

@Injectable()
export class AlertsService {
  constructor(
    // @InjectModel(Alert.name)
    // private readonly alertsModel: PaginateModel<IAlertDocument>,
    @InjectRepository(AlertEntity)
    private alertRepository: Repository<AlertEntity>,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    try {
      const result = await this.alertRepository.save(createAlertDto);
      return result;
    } catch (error) {
      console.log(`error`, error);
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.alertRepository
      .createQueryBuilder('alert')
      .orderBy('number_of_views', 'DESC')
      .select('alert.*')
      .take(10)
      .execute();
  }

  async findAlertsPagination(
    query: string,
    options: { limit?: number; page?: number },
  ): Promise<IPaginationResponse> {
    let { limit, page } = options;

    if (query === '') {
      const queryBuilder = await this.alertRepository.find();
      const totalResults = queryBuilder.length;
      const totalPages = Math.ceil(totalResults / limit);
      if (page > totalPages) page = totalPages;
      const result = {} as IPaginationResponse;
      result.items = queryBuilder.slice(limit * (page - 1), limit * page);
      result.meta = {
        totalPages,
        query,
        currentPage: page,
        totalItems: totalResults,
        itemsPerPage: limit,
      };
      return result;
    }
    if (!query) {
      throw new BadRequestException('Wrong query!');
    }

    const queryBuilder = await this.alertRepository
      .createQueryBuilder()
      .select()
      .where('title LIKE :searchQuery', { searchQuery: `%${query}%` })
      .orWhere('description LIKE :searchQuery', { searchQuery: `%${query}%` })
      .getMany();

    const totalResults = queryBuilder.length;
    const totalPages = Math.ceil(totalResults / limit);
    if (page > totalPages) page = totalPages;
    const result = {} as IPaginationResponse;
    result.items = queryBuilder.slice(limit * (page - 1), limit * page);
    result.meta = {
      totalPages,
      query,
      currentPage: page,
      totalItems: totalResults,
      itemsPerPage: limit,
    };
    return result;
  }

  async findOne(_id: string) {
    const alert = await this.alertRepository.findOne({ _id: +_id });
    alert.number_of_views = alert.number_of_views + 1;
    await this.alertRepository.update(_id, alert);
    const result = await this.alertRepository
      .createQueryBuilder('alert')
      .where('alert._id = :_id', { _id: _id })
      .select('alert.*')
      .getRawOne();
    return result;
  }

  async findUserAlerts(owner: string) {
    // @ts-ignore
    const result = await this.alertRepository.find({ owner: owner });
    return result;
  }
}
