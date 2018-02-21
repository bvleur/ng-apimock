import {HttpHeaders, HttpStatusCode} from '../core/middleware/http';

/** Base client that takes care of the actual invoking of the apimock api.*/
class BaseApimockClient {
    apimockId: string;
    request: any;
    baseUrl: string;

    /** Constructor.*/
    constructor(baseUrl: string) {
        this.apimockId = require('uuid').v4();
        this.request = require('then-request');
        this.baseUrl = require('url-join')(baseUrl, 'ngapimock');
    }

    /**
     * Invokes the api and handles the response.
     * @param {string} url The url.
     * @param {string} method The method.
     * @param payload The payload.
     * @param {Function} reject The reject callback.
     * @param {Function} resolve The resolve callback.
     */
    invoke(url: string, method: string, payload: any, resolve: Function, reject: Function): void {
        const headers = JSON.parse(JSON.stringify(HttpHeaders.CONTENT_TYPE_APPLICATION_JSON));
        headers.cookie = `apimockid=${this.apimockId}`;
        this.request(method, url, {json: payload, headers: headers})
            .done((res: any) => res.statusCode === HttpStatusCode.OK ? resolve(res) : reject(res));
    }

    /**
     * Gets the mock state.
     * @param {Function} reject The reject callback.
     * @param {Function} resolve The resolve callback.
     */
    getMocksRequest(resolve: Function,
                    reject: Function): void {
        /** wrap it and return the parsed body */
        const _resolve = (res: any) => {
            return resolve(JSON.parse(res.body));
        };
        return this.invoke(this.baseUrl + '/mocks', 'GET', {}, _resolve, reject);
    }

    /**
     * Gets the variables state.
     * @param {Function} reject The reject callback.
     * @param {Function} resolve The resolve callback.
     */
    getVariablesRequest(resolve: Function,
                    reject: Function): void {
        /** wrap it and return the parsed body */
        const _resolve = (res: any) => {
            return resolve(JSON.parse(res.body));
        };
        return this.invoke(this.baseUrl + '/variables', 'GET', {}, _resolve, reject);
    }

    /**
     * Updates the mock state.
     * @param payload The payload.
     * @param {Function} reject The reject callback.
     * @param {Function} resolve The resolve callback.
     */
    updateMockRequest(payload: { name: string, scenario?: string, delay?: number, echo?: boolean }, resolve: Function,
                      reject: Function): void {
        this.invoke(this.baseUrl + '/mocks', 'PUT', payload, resolve, reject);
    }

    /**
     * Updates the variables.
     * @param payload The payload
     * @param {Function} reject The reject callback.
     * @param {Function} resolve The resolve callback.
     */
    setVariablesRequest(payload: { [key: string]: string }, resolve: Function, reject: Function): void {
        this.invoke(this.baseUrl + '/variables', 'PUT', payload, resolve, reject);
    }

    /**
     * Updates the variables.
     * @param key The key
     * @param {Function} reject The reject callback.
     * @param {Function} resolve The resolve callback.
     */
    deleteVariableRequest(key: string, resolve: Function, reject: Function): void {
        this.invoke(this.baseUrl + `/variables/${key}`, 'DELETE', {}, resolve, reject);
    }

    /**
     * Performs an action either defaults or passThrough.
     * @param payload The payload
     * @param {Function} reject The reject callback.
     * @param {Function} resolve The resolve callback.
     */
    performActionRequest(payload: { action: string }, resolve: Function, reject: Function): void {
        this.invoke(this.baseUrl + '/actions', 'PUT', payload, resolve, reject);
    }
}

export default BaseApimockClient;