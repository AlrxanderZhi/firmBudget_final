export const baseURI = 'http://localhost:8080/api/v1';
export let doc = document;
export const csrfToken = document.cookie.replace(/(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$|^.*$/, '$1');