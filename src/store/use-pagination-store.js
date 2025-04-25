/**
 * @module usePaginationStore
 * @description Zustand store for managing pagination settings across different tables
 * @requires zustand
 * @requires zustand/middleware
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @description Creates a Zustand store for managing pagination settings
 * @function
 * @returns {Object} Store object with pagination state and actions
 * @property {Object} pageSizes - Stores pagination size settings for different tables
 * @property {Function} setPageSize - Updates the pagination size for a specific table
 */
export const usePaginationStore = create(
  persist(
    (set) => ({
      /**
       * @description Stores pagination size settings for different tables
       * @type {Object}
       * @property {number} [tableId] - Pagination size for a specific table
       */
      pageSizes: {},

      /**
       * @description Updates the pagination size for a specific table
       * @param {string} tableId - Unique identifier for the table
       * @param {number} size - New pagination size
       * @returns {void}
       */
      setPageSize: (tableId, size) =>
        set((state) => ({
          pageSizes: { ...state.pageSizes, [tableId]: size },
        })),
    }),
    {
      /**
       * @description Configuration for persisting the store
       * @type {Object}
       * @property {string} name - Name of the storage key
       */
      name: "pagination-store",
    }
  )
);
