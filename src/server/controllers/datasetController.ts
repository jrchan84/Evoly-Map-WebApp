import { Request, Response } from "express";
import DatasetModel, { Dataset } from "../models/dataset"

/**
 * Dataset Controller for handling dataset requests
 */
export default class DatasetController {
    private model: DatasetModel;

    constructor(model: DatasetModel) {
        this.model = model;
    } 

    /**
     * Returns list of datasets by dataset_id from DB
     */
    public async getDatasets(res: Response): Promise<void> {
        try {
            const datasetIds: string[] = await this.model.getDatasets();
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
            const dataset: Dataset | null = await this.model.getDatasetById(dataset_id);

            if (!dataset) {
                res.status(404).json({ error: "Dataset not found" });
                return;
            } else {
                res.json(dataset);
            }
        } catch (err) {
            res.status(500).json({ error: "Failed to get dataset by ID" });
        }
    }
}