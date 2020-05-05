import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '*',
            name: 'NotFound',
            component: () => import('./components/basic/NotFound.vue')
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('./components/basic/Home.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./components/user/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('./components/user/Register.vue')
        },
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: () => import('./components/user/ResetPassword.vue')
        },
        {
            path: '/account',
            name: 'Account',
            component: () => import('./components/user/Account.vue')
        },
        {
            path: '/balance',
            name: 'Balance',
            component: () => import('./components/balance/Balance.vue')
        },
        {
            path: '/companies',
            name: 'Companies',
            component: () => import('./components/company/CompanyList.vue')
        },
        {
            path: '/invoices',
            name: 'Invoices',
            component: () => import('./components/invoice/InvoiceList.vue')
        },
        {
            path: '/products',
            name: 'Products',
            component: () => import('./components/product/ProductList.vue')
        },
        {
            path: '/transactions',
            name: 'Transactions',
            component: () => import('./components/transaction/TransactionList.vue')
        }
    ],
    mode: 'history'
});

export default router;