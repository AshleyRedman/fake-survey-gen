import test, { describe } from 'node:test';
import assert from 'node:assert';

import { createSurveyMock } from './playground';
import type { SurveyJson } from './types';

describe('Test here', () => {
    test('Generation creates a mock survey with 2 single line questions', (t) => {
        const pre: Partial<SurveyJson> = {
            title: 'Hello',
            description: 'Hello'
        };

        const m = createSurveyMock(pre);

        assert.equal(pre.title, m.title);
    });
});
