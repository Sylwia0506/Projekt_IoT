import { DataGrid } from '@mui/x-data-grid';
import { columns } from './mockCourses';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { courseLoading, courseSelector, getCourses } from '../../store/course/courseSlice';
import { useEffect, useState } from 'react';
import { CourseBody } from '../../store/course/types/courseTypes';


function Courses() {
  const dispatch = useAppDispatch()
  const courses = useAppSelector(courseSelector)
  const loading = useAppSelector(courseLoading)
  const [shownCourses, setShownCourses] = useState<CourseBody[]>([])

  
  useEffect(() => {
    void dispatch(getCourses())
  }, [dispatch])

  useEffect(() => {
    if (courses) {
      setShownCourses(courses.slice())
    }
  }, [courses])

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div style={{ height: 500, width: '100%', padding: '0 50px', marginTop: '50px' }}>
      <DataGrid
        rows={shownCourses}
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