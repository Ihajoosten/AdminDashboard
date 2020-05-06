import Vue from 'vue';
import Router from 'vue-router';
// import LoginModal from './components/user/Login.vue'

Vue.use(Router);

export const router = new Router({
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

// router.beforeEach((to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     // const publicPages = ['/login', '/register'];
//     // const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
  
//     if (!loggedIn) {
//         return openLoginModal();
//     }
  
//     next();
// })
  
// function openLoginModal() {
//     this.$buefy.modal.open({
//         parent: this,
//         component: LoginModal,
//         hasModalCard: true,
//         props: {}
//     });
// }