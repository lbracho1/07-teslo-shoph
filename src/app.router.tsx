import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router';

import { ShopLayouts } from './shop/layouts/ShopLayouts';
import { HomePage } from './shop/pages/home/HomePage';
import { ProductPage } from './shop/pages/product/ProductPage';
import { GenderPage } from './shop/pages/gender/GenderPage';

import { LoginPages } from './auth/pages/login/LoginPage';
import { RegisterPage } from './auth/pages/register/RegisterPage';

import { DashboardPage } from './admin/pages/dashboard/DashboardPage';
import { AdminProductPage } from './admin/pages/product/AdminProductPage';
import { AdminProductsPage } from './admin/pages/products/AdminProductsPage';
import { AdminRoute, NotAuthenticatedRoute } from './components/routes/ProtectedRoutes';

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
    // Main Routes
    {
        path: '/',
        element: <ShopLayouts />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'product/:idSlug',
                element: <ProductPage />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },
    // Auth Routes
    {
        path: '/auth',
        element: <NotAuthenticatedRoute>
            <AuthLayout />,
        </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: 'login',
                element: <LoginPages />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    },
    // Admin Routes
    {
        path: '/admin',
        element: <AdminRoute>
            <AdminLayout />,
        </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <AdminProductsPage />,
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />,
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    },
]);