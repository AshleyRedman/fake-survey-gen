import { z } from 'zod';
import {
    questionTypes,
    QuestionNoteSchema,
    QuestionSingleLineSchema,
    QuestionMultilineSchema,
    QuestionDropdownSchema,
    QuestionChoiceSchema,
    QuestionGridSchema,
    QuestionDateTimeSchema,
    QuestionDateSchema,
    QuestionTimeSchema,
    SurveyLanguageTranslationsSchema,
    SurveyJsonSchema,
    PageSchema,
    FinalPageSchema,
    SurveyThemeSchema,
    SurveyLogoSchema
} from './schema';

export type Type = typeof questionTypes[keyof typeof questionTypes];

type Note = z.infer<typeof QuestionNoteSchema>;
type SingleLine = z.infer<typeof QuestionSingleLineSchema>;
type Multiline = z.infer<typeof QuestionMultilineSchema>;
type Dropdown = z.infer<typeof QuestionDropdownSchema>;
type Choice = z.infer<typeof QuestionChoiceSchema>;
type Grid = z.infer<typeof QuestionGridSchema>;
type DateTime = z.infer<typeof QuestionDateTimeSchema>;
type Date = z.infer<typeof QuestionDateSchema>;
type Time = z.infer<typeof QuestionTimeSchema>;

export type Questions = Note | SingleLine | Multiline | Dropdown | Choice | Grid | DateTime | Date | Time;

type SurveyLanguageTranslations = z.infer<typeof SurveyLanguageTranslationsSchema>;
type SurveyTheme = z.infer<typeof SurveyThemeSchema>;
type SurveyLogo = z.infer<typeof SurveyLogoSchema>;

export type SurveyJson = z.infer<typeof SurveyJsonSchema>;
export type PageJson = z.infer<typeof PageSchema>;
export type FinalPageJson = z.infer<typeof FinalPageSchema>;
