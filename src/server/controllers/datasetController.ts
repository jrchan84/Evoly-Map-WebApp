import { Request, Response } from "express";
import DatasetModel from "../models/dataset"
import { Dataset } from '../../shared/models/dataset';


/**
 * Dataset Controller for handling dataset requests
 */
export default class DatasetController {
    private model: DatasetModel;
    private cache: any;

    constructor(model: DatasetModel, cache: any) {
        this.model = model;
        this.cache = cache;
    } 

    /**
     * Returns list of datasets by dataset_id from DB
     */
    public async getDatasets(res: Response): Promise<void> {
        const cacheKey = 'datasets';
        try {
            // Check if data is in cache
            const cachedData: string[] = await this.cache.getDatasetFromCache(cacheKey);
            if (cachedData) {
                res.json(cachedData);
                return;
            }

            // If not, fetch from DB and store in cache
            const datasetIds: string[] = await this.model.getDatasets();
            await this.cache.setDatasetInCache(cacheKey, datasetIds);

            res.json(datasetIds);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to get datasets" });
        }
    }

    /**
     * Returns entries in dataset by dataset_id
     * @param req includes dataset_id from url in req.params
     */
    public async getDatasetById(req: Request, res: Response): Promise<void> {
        const { dataset_id } = req.params;

        try {
            // Check if data is in cache
            const cachedData: Dataset = await this.cache.getDatasetByIdFromCache(dataset_id);
            if (cachedData) {
                res.json(cachedData);
                return;
            }

            // If not, fetch from DB and store in cache
            const dataset: Dataset | null = await this.model.getDatasetById(dataset_id);
            if (!dataset) {
                res.status(404).json({ error: "Dataset not found" });
                return;
            } else {
                await this.cache.setDatasetByIdInCache(dataset_id, dataset);
                res.json(dataset);
            }
        } catch (err) {
            res.status(500).json({ error: "Failed to get dataset by ID" });
        }
    }
}