/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Result } from './Result';

export type Entry = {
    createdOn?: string;
    title?: string;
    language?: string;
    url?: string;
    results?: Array<Result>;
    validUntil?: string | null;
    readonly indexedCount?: number;
    readonly indexedValidCount?: number;
    readonly indexedTotal?: number;
    readonly latestIndexedOn?: string | null;
};
