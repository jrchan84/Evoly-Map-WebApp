import { 
    DynamoDBClient,
    ScanCommand,
    QueryCommand,
    ScanCommandOutput,
    QueryCommandOutput,
    AttributeValue
} from "@aws-sdk/client-dynamodb";
import { config } from "../db_config";

/**
 * Server-side interface of a dataset
 */
export interface Dataset {
    datasetId: string;
    points: Point[];
}

/**
 * Server-side representation of a dataset's points
 */
interface Point {
    coordinateId: string;
    latitude: number;
    longitude: number;
    iconType: string;
}

/**
 * Model layer wrapper around database operations
 */
export default class DatasetModel {
    private client: DynamoDBClient;
    // TODO: Caching?

    /**
     * @constructor Initializes a DynamoDB Client in the region set in db_config
     */
    constructor() {
        this.client = new DynamoDBClient({ region: config.REGION });
    }

    /**
     * Returns entries in dataset by dataset_id
     * @param req includes dataset_id from url in req.params
     * @public
     */
    public async getDatasets(): Promise<string[]> {
        const command = new ScanCommand({
            TableName: config.TABLE_NAME,
            ProjectionExpression: "dataset_id",
            Select: "SPECIFIC_ATTRIBUTES",
        });

        const response: ScanCommandOutput = await this.client.send(command)
        const entries: Record<string, AttributeValue>[] | undefined = response.Items;

        if (!entries || entries.length === 0) {
            return [];
        }

        const datasetIds = new Set<string>();

        entries.forEach((item) => {
            const datasetId = item["dataset_id"].S;
            datasetIds.add(datasetId!);
        });

        return Array.from(datasetIds);
    }

    /**
     * Returns entries in dataset by dataset_id
     * @param datasetId dataset_id from url in request params
     */
    public async getDatasetById(datasetId: string): Promise<Dataset | null> {
        const command = new QueryCommand({
            TableName: config.TABLE_NAME,
            KeyConditionExpression: "dataset_id = :dataset_id",
            ExpressionAttributeValues: {
                ":dataset_id": { S: datasetId },
            },
            ProjectionExpression: "dataset_id, coordinate_id, latitude, longitude, icon_type"
        });

        const response: QueryCommandOutput = await this.client.send(command);
        const entries: Record<string, AttributeValue>[] | undefined = response.Items;

        if (!entries || entries.length === 0) {
            return null;
        }

        const points: Point[] = entries.map((entry) => {
            const point: Point = {
                coordinateId: entry.coordinate_id.S!,
                latitude: parseFloat(entry.latitude.N!),
                longitude: parseFloat(entry.longitude.N!),
                iconType: entry.icon_type.S!,
            }
            return point;
        });

        const dataset: Dataset = {
            datasetId,
            points
        }

        return dataset;
    }
}