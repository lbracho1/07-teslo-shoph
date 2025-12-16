import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { ShopLayouts } from './shop/layouts/ShopLayouts';
import { HomePage } from './shop/pages/home/HomePage';
import { ProductPage } from './shop/pages/product/ProductPage';
import { GenderPage } from './shop/pages/gender/GenderPage';
import { LoginPages } from './auth/pages/login/LoginPages';
import { RegisterPage } from './auth/pages/register/RegisterPage';
import { DashboardPage } from './admin/pages/dashboard/DashboardPage';
import { AdminProductsPage } from './admin/pages/products/AdminProductsPage';
import { AdminProductPage } from './admin/pages/product/AdminProductPage';

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

export const appRouter = createBrowserRouter([
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
        element: <AuthLayout />,
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
        element: <AdminLayout />,
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