/**
 * Interface of a dataset
 */
export interface Dataset {
    datasetId: string;
    iconPoints: IconPoint[];
}

/**
 * Interface of set of points with the same iconType
 */
export interface IconPoint {
    iconType: string;
    points: Point[];
}

/**
 * Interface of a dataset's points
 */
export interface Point {
    coordinateId: string;
    latitude: number;
    longitude: number;
}