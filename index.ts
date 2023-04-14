import fs from 'fs';

import { createSurveyMock } from './playground';

const mock = createSurveyMock({
    title: 'Mock survey title',
    description: 'Mock survey description',
    pages: [
        {
            id: 1,
            description: 'desc',
            isEditing: false,
            isLocked: false,
            questions: [],
            showDescription: false,
            showTitle: false,
            title: 'Page one',
            preventNewQuestions: false,
            visibleIf: undefined
        }
    ]
});

fs.writeFile('mock.json', JSON.stringify(mock), {}, () => {});
