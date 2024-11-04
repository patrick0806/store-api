import { BaseEntity } from "@shared/entities/base.entity";

export interface IPaginationAndSort {
    page: number;
    size: number;
    sort: 'ASC' | 'DESC';
    orderBy: string;
    filter?: Record<string, any>;
}

export interface IPageResponse<T> {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    content: T[];
}

export interface IBaseRepository<T extends BaseEntity> {
    create: (data: Partial<T>) => Promise<T>;
    update: (id: number, data: Partial<T>) => Promise<T>;
    delete: (id: number) => Promise<void>;
    findById: (id: number) => Promise<T | null>;
    findAll: (pagination: IPaginationAndSort) => Promise<IPageResponse<T>>;
}