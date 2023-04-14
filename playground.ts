import { z } from 'zod';
import { generateMock } from '@anatine/zod-mock';
import { SurveyJsonSchema } from './schema';

export type SurveyJson = z.infer<typeof SurveyJsonSchema>;

export function createSurveyMock(args: Partial<SurveyJson>): SurveyJson {
    const build = {};

    Object.entries(args).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];

        // @todo Current the mock only acceps string overrides, deeper objects are unsupported
        // This might be easier to pass in as a seed
        if (typeof value === 'string') {
            // @ts-expect-error todo build up a better objet to seed
            build[key] = () => value;
        }

        return entry;
    });

    const mock = generateMock(SurveyJsonSchema, {
        stringMap: build,
        throwOnUnknownType: true
    });

    return mock;
}
