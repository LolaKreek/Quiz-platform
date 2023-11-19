import { FC, Suspense } from 'react'
import { AppLoader } from '../components/AppLoader'

export const withSuspense = (Component:FC) => (props:any) => {
  return (
    <Suspense fallback={<AppLoader show />}>
      <Component {...props} />
    </Suspense>
  )
}