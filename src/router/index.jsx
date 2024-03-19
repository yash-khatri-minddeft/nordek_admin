import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ROUTES, routes } from './constants/routes'
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'

export const Router = () => {
    return (
        <Routes>
            {routes.public.map(({ path, Element }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <PublicRoute>
                            <Element />
                        </PublicRoute>
                    }
                />
            ))}
            {routes.private.map(({ path, Element, children }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <PrivateRoute>
                            <Element />
                        </PrivateRoute>
                    }
                >
                    {children?.map(({ path, Element }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))}
                </Route>
            ))}
            <Route path="*" element={<Navigate to={ROUTES.login} />} />
        </Routes>
    )
}
