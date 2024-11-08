//@ts-nocheck
import { Injectable } from "@nestjs/common";
import { IBaseRepository, IPageResponse, IPaginationAndSort } from "./baseRepository.interface";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class BaseRepository<T> implements IBaseRepository<T> {

    constructor(private repository: Repository<T>) { }

    async create(data: Partial<T>): Promise<T> {
        return this.repository.save(data);
    }

    async createMultiple(data: Partial<T>[]): Promise<T> {
        return this.repository.save(data);
    }

    async update(id: number, data: Partial<T>): Promise<T> {
        await this.repository.update(id, data);
        return this.repository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findById(id: number): Promise<T | null> {
        return this.repository.findOne({ where: { id }, relations: true });
    }

    async findAll({ page, size, orderBy = 'id', sort = 'ASC', filter }: IPaginationAndSort,): Promise<IPageResponse<T>> {
        const queryBuilder = this.repository.createQueryBuilder('entity');
        queryBuilder.orderBy(`entity.${orderBy}`, sort);

        if (filter && Object.keys(filter).length > 0) {
            Object.entries(filter).forEach(([key, value]) => {
                queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
            });
        }

        queryBuilder.skip((page - 1) * size).take(size);

        const [results, totalResults] = await queryBuilder.getManyAndCount();

        return {
            page,
            size,
            totalElements: totalResults,
            totalPages: Math.ceil(totalResults / size),
            content: results,
        }
    }
}