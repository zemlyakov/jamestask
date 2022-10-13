export const getCars = () => {
  return fetch("https://www.ag-grid.com/example-assets/row-data.json").then(
    (response) => response.json()
  );
};
