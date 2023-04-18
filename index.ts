import fs from 'fs';

import { createSurveyMock } from './playground';

const mock = createSurveyMock({
    title: 'Mock survey title',
    description: 'Mock survey description'
});

fs.writeFile('mock.json', JSON.stringify(mock), {}, () => {});
