import fs from 'fs';
import { generateMock } from '@anatine/zod-mock';
import { SurveyJsonSchema } from './schema';

const mock = generateMock(SurveyJsonSchema, {
    stringMap: {
        title: () => `This is the name of the survey, hence testable`
    }
});

fs.writeFile('example.json', JSON.stringify(mock), {}, () => {});
