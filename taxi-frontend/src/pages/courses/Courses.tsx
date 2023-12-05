import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './mockCourses';


function Courses() {
  return (
    <div style={{ height: 500, width: '100%', padding: '0 50px', marginTop: '50px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
      />
    </div>
  );
}

export default Courses