/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entry } from './Entry';

export type SearchIndex = {
    id?: string;
    title?: string;
    category?: string;
    domain?: string;
    createdOn?: string;
    validUntil?: string | null;
    entries?: Array<Entry>;
};
