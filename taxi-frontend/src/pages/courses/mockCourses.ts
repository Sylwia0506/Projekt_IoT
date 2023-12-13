import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'passengerCount', headerName: 'Liczba pasażerów', width: 130 },
  { field: 'taxi', headerName: 'Taksówka', width: 130 },
  {
    field: 'startPlace',
    headerName: 'Punkt startowy',

    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.startLatitude || ''}°  ${params.row.startLongitude || ''}°`,
  },
  {
    field: 'endPlace',
    headerName: 'Punkt końcowy',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.endLatitude || ''}°  ${params.row.endLongitude || ''}°`,
  },
  { field: 'fare', headerName: 'Cena (zł)', width: 130 },
];

export const rows = [
  { id: 1, passengerCount: 2, taxi: 123, startLatitude: 35, startLongitude: 180, endLatitude: 78, endLongitude: 45, fare: 70 },
  { id: 2, passengerCount: 1, taxi: 456, startLatitude: 80, startLongitude: -145, endLatitude: 79, endLongitude: -59, fare: 77 },
  { id: 3, passengerCount: 4, taxi: 123, startLatitude: 75, startLongitude: 89, endLatitude: 45, endLongitude: 80, fare: 78 },
  { id: 4, passengerCount: 3, taxi: 123, startLatitude: -75, startLongitude: -179, endLatitude: 60, endLongitude: 120, fare: 920 },
  { id: 5, passengerCount: 2, taxi: 789, startLatitude: 45, startLongitude: 120, endLatitude: -20, endLongitude: 89, fare: 789 },
  { id: 6, passengerCount: 3, taxi: 921, startLatitude: 89, startLongitude: 69, endLatitude: -15, endLongitude: 145, fare: 45 },
];