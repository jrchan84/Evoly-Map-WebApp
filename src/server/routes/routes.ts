import * as express from 'express';
import DatasetController from '../controllers/datasetController';
import DatasetModel from '../models/dataset';

const router = express.Router();
const model: DatasetModel = new DatasetModel();
const datasetController: DatasetController = new DatasetController(model);

router.get('/api/hello', (req, res) => {
    res.json('World');
});

router.get('/api/datasets', (req, res) => {
    datasetController.getDatasets(res);
});

router.get('/api/datasets/:dataset_id', (req, res) => {
    datasetController.getDatasetById(req, res);
});

export default router;