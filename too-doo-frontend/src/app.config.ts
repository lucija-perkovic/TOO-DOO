import get from 'lodash/get';

interface ApplicationConfigJson {
    host: string;
    identityHost: string;
}

let config: ApplicationConfigJson;
config = get(window, 'REACT_APP_CONFIG');
export default config;