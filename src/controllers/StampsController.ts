import HttpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import { stamps } from '@prisma/client';
import { NOTFOUND } from 'dns';
import { StampPresenter } from '../presenters/stamp.presenter';
// import { PresenterInterface } from '../presenters/types';
import { StampsRepository } from '../repositories/StampsRepository';
import { Controller } from './BaseController';
import { Stamp } from '../models/Stamp';

export class StampsController extends Controller {
  constructor(
    req: Request,
    res: Response,
    private repository = StampsRepository,
  ) {
    super(req, res);
    this.presenter = StampPresenter;
    this.model = new Stamp();
    this.init();
  }

  public async getById(id: number): Promise<void> {
    try {
      const opts = {
        fields: this.useFields,
      };
      const bigId = BigInt(id);
      const result = await this.repository.getById(bigId, opts);
      this.res
        .status(HttpStatus.OK)
        .send(this.render<stamps>(result));
    } catch (e) {
      console.error(e);
      this.res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  public async listStamps(): Promise<void> {
    try {
      const opts = {
        pagination: this.usePagination,
        sort: this.useSort,
        fields: this.useFields,
        filters: this.useFilters,
      };
      const results = await this.repository.listStamps(opts);
      this.res
        .status(HttpStatus.OK)
        .send(this.render<stamps>(results));
    } catch (e) {
      console.error(e);
      this.res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
