import test, { describe } from 'node:test';
import assert from 'node:assert';

import { createSurveyMock, SurveyJson } from './playground';

describe('Test here', () => {
    test('Generation creates a mock survey with 2 single line questions', (t) => {
        const pre: Partial<SurveyJson> = {
            title: 'Hello',
            description: 'Hello',
            showDescription: true,
            theme: {
                hover: 'hover:bg-blue-900',
                borderTop: 'border-t-blue-800',
                main: 'bg-blue-800',
                name: 'Dark green',
                text: 'text-green-800'
            }
        };

        const m = createSurveyMock(pre);

        assert.deepStrictEqual(pre, m);
    });
});
