import fs from 'fs';
import { generateMock } from '@anatine/zod-mock';
import { SurveyJsonSchema } from './schema';

const mock = generateMock(SurveyJsonSchema);

fs.writeFile('example.json', JSON.stringify(mock), {}, () => {});
