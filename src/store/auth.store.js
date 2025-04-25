import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAuthStore = create(persist((set, get)=>(
    {
        /**
         * @description Initial authentication state
         * @property {string} token - JWT token for API authentication
         * @property {Object|null} user - User information object
         * @property {boolean} isAuth - Authentication status flag
         * @property {Array} roles - Array of user roles
         * @property {Array} permissions - Array of user permissions
         * @property {boolean} showPaymentModal - Flag to control payment modal visibility
         * @property {boolean} showTransportModal - Flag to control transport modal visibility
         * @property {boolean} showCountDown - Flag to control countdown timer visibility
         */
        token             : "", 
        user              : null, 
        isAuth            : false,
        roles             : [],
        permissions       : [],
        showPaymentModal  : false, 
        showTransportModal: false, 
        showCountDown     : false, 

        /**
         * @description Sets the authentication token and updates the authentication status
         * @param {string} token - JWT token received from the login response
         * @returns {void}
         */
        setToken: (token) => {
            set(() => (
                {
                    token, 
                    isAuth: true
                }
            ))
        }, 

        /**
         * @description Updates the user information in the store
         * @param {Object} user - User information object containing company, plans, branches, etc.
         * @returns {void}
         */
        setUser: (user) => set({ user }),

        /**
         * @description Updates the user roles in the store
         * @param {Array} roles - Array of user roles
         * @returns {void}
         */
        setRoles: (roles) => set(() => ({ roles })), 

        /**
         * @description Updates the user permissions in the store
         * @param {Array} permissions - Array of user permissions
         * @returns {void}
         */
        setPermissions: ((permissions)=>{
            set(()=>(
                {
                    permissions: permissions
                }
            ))
        }),

        /**
         * @description Checks if the user has a specific role
         * @param {string} role - Role to check
         * @returns {boolean} - True if user has the role, false otherwise
         */
        hasValidRole: ((role)=>{
            const roles = get().roles; 
            return roles.includes(role);
        }), 

        /**
         * @description Checks if the user has a specific permission
         * @param {string} permission - Permission to check
         * @returns {boolean} - True if user has the permission, false otherwise
         */
        hasValidPermission: ((permission)=>{
            const permissions = get().permissions;
            return permissions.includes(permission);
        }), 

        /**
         * @description Clears all authentication data and resets the store to initial state
         * @returns {void}
         */
        logout: () => {
            set(() => ({
                token: "", 
                user: null,
                isAuth: false,
                roles: [],
                permissions: [],
                showPaymentModal: false,
                showTransportModal: false,
                showCountDown: false
            }));
        }
    }), 
    {
        name: "auth",
        getStorage: () => sessionStorage
    }
))