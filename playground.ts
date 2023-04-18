import { generateMock } from '@anatine/zod-mock';
import {
    PageSchema,
    QuestionChoiceSchema,
    QuestionDateSchema,
    QuestionDateTimeSchema,
    QuestionDropdownSchema,
    QuestionGridSchema,
    QuestionMultilineSchema,
    QuestionNoteSchema,
    QuestionSingleLineSchema,
    QuestionTimeSchema,
    SurveyJsonSchema
} from './schema';
import type { Questions, SurveyJson, PageJson, Type } from './types';
import { ZodSchema } from 'zod';

/**
 * @param args Only supports obj values of strings, e.g `title`, `description`, but not `theme`
 */
export function createSurveyMock(args: Partial<SurveyJson>): SurveyJson {
    const build: Record<string, () => string> = {};

    Object.entries(args).forEach(([key, value]) => {
        if (typeof value === 'string') {
            build[key] = () => value;
        }
    });

    const mock = generateMock(SurveyJsonSchema, {
        stringMap: build,
        throwOnUnknownType: true
    });

    return mock;
}

export function createPageMock(args: Partial<PageJson>): PageJson {
    const build = {};
    const mock = generateMock(PageSchema, {
        stringMap: build,
        throwOnUnknownType: true
    });

    return mock;
}

export function createQuestionMock(args: Partial<Questions> & { type: Type }) {
    let schema: ZodSchema | undefined = undefined;

    if (args.type === 'NOTE') {
        schema = QuestionNoteSchema;
    } else if (args.type === 'SINGLE_LINE') {
        schema = QuestionSingleLineSchema;
    } else if (args.type === 'MULTI_LINE') {
        schema = QuestionMultilineSchema;
    } else if (args.type === 'CHOICE') {
        schema = QuestionChoiceSchema;
    } else if (args.type === 'DROPDOWN') {
        schema = QuestionDropdownSchema;
    } else if (args.type === 'GRID') {
        schema = QuestionGridSchema;
    } else if (args.type === 'DATE_TIME') {
        schema = QuestionDateTimeSchema;
    } else if (args.type === 'DATE') {
        schema = QuestionDateSchema;
    } else if (args.type === 'TIME') {
        schema = QuestionTimeSchema;
    }

    if (!schema) {
        throw new Error('Invalid arguments provided.');
    }

    const build = {};

    const mock = generateMock(schema, {
        stringMap: build,
        throwOnUnknownType: true
    });
}
