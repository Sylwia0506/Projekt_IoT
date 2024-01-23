type AppConstantsType = {
  apiUrl: string
  pageSize: number
}

const AppConstants: AppConstantsType = {
  apiUrl: import.meta.env.VITE_APP_API_URL,
  pageSize: 12,
}

export default AppConstants
