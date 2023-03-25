import * as express from 'express';
import DatasetController from '../controllers/datasetController';
import DatasetModel from '../models/dataset';
import { RedisCache } from '../cache/redis';

const router = express.Router();
const model: DatasetModel = new DatasetModel();
const redisCache = new RedisCache();
const datasetController: DatasetController = new DatasetController(model, redisCache);

router.get('/api/datasets', (req, res) => {
    datasetController.getDatasets(res);
});

router.get('/api/datasets/:dataset_id', (req, res) => {
    datasetController.getDatasetById(req, res);
});

export default router;