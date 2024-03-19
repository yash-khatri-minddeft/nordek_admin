import Login from '../../pages/Login'
import UserManagement from '../../pages/UserManagement'
import User from '../../pages/User'
import Swap from '../../pages/Swap'
import Pairs from '../../pages/Swap/components/Pairs'
import Tokens from '../../pages/Swap/components/Tokens'
import Transactions from '../../pages/Swap/components/Transactions'
import Pool from '../../pages/Pool'
import General from '../../pages/Pool/components/General'
import TransactionHistory from '../../pages/Pool/components/TransactionHistory'
import LPToken from '../../pages/LPToken'
import Fees from '../../pages/Fees'
import UserIcon from '../../assets/svg/user.svg'
import UserActiveIcon from '../../assets/svg/user-active.svg'
import SwapIcon from '../../assets/svg/swap.svg'
import SwapActiveIcon from '../../assets/svg/swap-active.svg'
import LpTokenIcon from '../../assets/svg/lp-token.svg'
import LpTokenActiveIcon from '../../assets/svg/lp-token-active.svg'
import PoolIcon from '../../assets/svg/pool.svg'
import PoolActiveIcon from '../../assets/svg/pool-active.svg'
import FeesIcon from '../../assets/svg/fees.svg'
import FeesActiveIcon from '../../assets/svg/fees-active.svg'
import RolesIcon from '../../assets/svg/roles.svg'
import RolesActiveIcon from '../../assets/svg/roles-active.svg'
import AdministrativeRoles from '../../pages/admin/AdministrativeRoles'
import CreateAdmin from '../../pages/admin/CreateAdmin'
import EditAdmin from '../../pages/admin/EditAdmin'
import Account from '../../pages/admin/Account'
import ChangePassword from '../../pages/admin/Account/components/ChangePassword'
import TwoFactorAuthentication from '../../pages/admin/Account/components/TwoFactorAuthentication'

export const ROUTES = {
    login: '/login',
    users: '/users',
    user: '/users/:id',
    swap: '/swap',
    pairs: '/swap',
    tokens: '/swap/tokens',
    transactions: '/swap/transactions',
    pool: '/pool',
    history: '/pool/history',
    lptoken: '/lptoken',
    fees: '/fees',
    roles: '/roles',
    create: '/roles/create',
    edit: '/roles/edit/:id',
    account: '/roles/account',
    two_fa: '/roles/account/2fa',
}

export const routes = {
    public: [{ path: ROUTES.login, Element: Login }],
    private: [
        { path: ROUTES.users, Element: UserManagement },
        { path: ROUTES.user, Element: User },
        { path: ROUTES.lptoken, Element: LPToken },
        { path: ROUTES.fees, Element: Fees },
        { path: ROUTES.roles, Element: AdministrativeRoles },
        { path: ROUTES.create, Element: CreateAdmin },
        { path: ROUTES.edit, Element: EditAdmin },
        {
            path: ROUTES.swap,
            Element: Swap,
            children: [
                {
                    path: ROUTES.pairs,
                    Element: Pairs,
                },
                {
                    path: ROUTES.tokens,
                    Element: Tokens,
                },
                {
                    path: ROUTES.transactions,
                    Element: Transactions,
                },
            ],
        },
        {
            path: ROUTES.pool,
            Element: Pool,
            children: [
                {
                    path: ROUTES.pool,
                    Element: General,
                },
                {
                    path: ROUTES.history,
                    Element: TransactionHistory,
                },
            ],
        },
        {
            path: ROUTES.account,
            Element: Account,
            children: [
                {
                    path: ROUTES.account,
                    Element: ChangePassword,
                },
                {
                    path: ROUTES.two_fa,
                    Element: TwoFactorAuthentication,
                },
            ],
        },
    ],
}

export const menuLinks = [
    {
        icon: UserIcon,
        iconActive: UserActiveIcon,
        title: 'User Management',
        link: ROUTES.users,
    },
    {
        icon: SwapIcon,
        iconActive: SwapActiveIcon,
        title: 'Exchange/Swap',
        link: ROUTES.swap,
    },
    {
        icon: LpTokenIcon,
        iconActive: LpTokenActiveIcon,
        title: 'LP Token',
        link: ROUTES.lptoken,
    },
    {
        icon: PoolIcon,
        iconActive: PoolActiveIcon,
        title: 'Pool Liquidity',
        link: ROUTES.pool,
    },
    {
        icon: FeesIcon,
        iconActive: FeesActiveIcon,
        title: 'Fees',
        link: ROUTES.fees,
    },
    {
        icon: RolesIcon,
        iconActive: RolesActiveIcon,
        title: 'Administrative roles',
        link: ROUTES.roles,
    },
]
