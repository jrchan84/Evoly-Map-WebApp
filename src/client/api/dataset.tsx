const API_URL = '/api/datasets';

export const getDatasets = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getDatasetsById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};