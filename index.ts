import { generateMock } from '@anatine/zod-mock';
import {schema} from './schema';

const mock = generateMock(schema);


console.debug({mock});
