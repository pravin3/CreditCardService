import {start} from 'elastic-apm-node';
import {env} from '../env';

if (env.apm.active) {
    start();
}
