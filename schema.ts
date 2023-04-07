import { z } from 'zod';

const VisibleIfOptions = ['EQUAL_TO', 'NOT_EQUAL_TO', 'ONE_OF', 'NOT_ONE_OF'] as const;

const VisibleIfSchema = z
    .object({
        questionId: z.string().min(21).max(25).optional(),
        condition: z.enum(VisibleIfOptions).optional(),
        value: z.string().or(z.array(z.string())).optional()
    })
    .strict();

const Visibility = ['SHOW', 'HIDE', 'HIDE_IF_POPULATED'] as const;

const PrePopulationSchema = z.object({
    prePopulationParam: z.string().max(255).optional(),
    prePopulationVisibility: z.enum(Visibility).optional(),
    prePopulation: z
        .object({
            visibility: z.enum(Visibility),
            param: z.string().max(255)
        })
        .strict()
        .optional()
});

const QuestionValidationSchema = z.object({});

const questionTypes = {
    SINGLE_LINE: 'SINGLE_LINE',
    MULTI_LINE: 'MULTI_LINE',
    DROPDOWN: 'DROPDOWN',
    CHOICE: 'CHOICE',
    GRID: 'GRID',
    DATE_TIME: 'DATE_TIME',
    DATE: 'DATE',
    TIME: 'TIME',
    NOTE: 'NOTE'
} as const;

type QuestionType = typeof questionTypes[keyof typeof questionTypes];

const AnswerOptionSchema = z
    .object({
        id: z.number().min(0),
        value: z.string().max(1024)
    })
    .strict();

const BaseQuestionSchema = z
    .object({
        id: z.string().min(21).max(25),
        readonly: z.boolean(),
        isEditing: z.boolean(),
        isLocked: z.boolean().optional(),
        visibleIf: VisibleIfSchema.optional(),
        preventChange: z.enum(['NO_RULE', 'NO_EDIT', 'NO_DELETE']).optional(),
        fullWidth: z.boolean().optional()
    })
    .strict();

type BaseQuestion = z.infer<typeof BaseQuestionSchema>;

const QuestionNoteSchema = z
    .object({
        type: z.literal(questionTypes.NOTE),
        content: z.string()
    })
    .strict()
    .merge(BaseQuestionSchema);

type QuestionNote = z.infer<typeof QuestionNoteSchema>;

const QuestionSingleLineSchema = z
    .object({
        type: z.literal(questionTypes.SINGLE_LINE),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        description: z.string().max(2048).optional(),
        isRequired: z.boolean(),
        validation: QuestionValidationSchema.optional().nullable() // .optional() for BC
    })
    .strict()
    .merge(PrePopulationSchema)
    .merge(BaseQuestionSchema);

type QuestionSingleLine = z.infer<typeof QuestionSingleLineSchema>;

const QuestionMultilineSchema = z
    .object({
        type: z.literal(questionTypes.MULTI_LINE),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        description: z.string().max(2048).optional(),
        isRequired: z.boolean(),
        validation: QuestionValidationSchema.optional().nullable(), // .optional() for BC
        lines: z.number().min(2).max(10).optional() // MULTI_LINE
    })
    .strict()
    .merge(PrePopulationSchema)
    .merge(BaseQuestionSchema);

type QuestionMultiline = z.infer<typeof QuestionMultilineSchema>;

const QuestionDropdownSchema = z
    .object({
        type: z.literal(questionTypes.DROPDOWN),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        description: z.string().max(2048).optional(),
        isRequired: z.boolean(),
        values: z.array(AnswerOptionSchema).nonempty()
    })
    .strict()
    .merge(PrePopulationSchema)
    .merge(BaseQuestionSchema);

type QuestionDropdown = z.infer<typeof QuestionDropdownSchema>;

const QuestionChoiceSchema = z
    .object({
        type: z.literal(questionTypes.CHOICE),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        description: z.string().max(2048).optional(),
        isRequired: z.boolean(),
        values: z.array(AnswerOptionSchema).nonempty(),
        validation: QuestionValidationSchema.optional().nullable(),
        multicheck: z.boolean()
    })
    .strict()
    .merge(PrePopulationSchema)
    .merge(BaseQuestionSchema);

type QuestionChoice = z.infer<typeof QuestionChoiceSchema>;

const QuestionGridSchema = z
    .object({
        type: z.literal(questionTypes.GRID),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        description: z.string().max(2048).optional(),
        isRequired: z.boolean(),
        validation: QuestionValidationSchema.optional().nullable(),
        multicheck: z.boolean(),
        columns: z.array(AnswerOptionSchema).nonempty(),
        rows: z.array(AnswerOptionSchema).nonempty()
    })
    .strict()
    .merge(BaseQuestionSchema);

type QuestionGrid = z.infer<typeof QuestionGridSchema>;

const QuestionDateTimeSchema = z
    .object({
        type: z.literal(questionTypes.DATE_TIME),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        isRequired: z.boolean(),
        defaultValue: z.string().optional().nullable(),
        validation: QuestionValidationSchema.optional().nullable()
    })
    .strict()
    .merge(BaseQuestionSchema);

type QuestionDateTime = z.infer<typeof QuestionDateTimeSchema>;

const QuestionDateSchema = z
    .object({
        type: z.literal(questionTypes.DATE),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        isRequired: z.boolean(),
        defaultValue: z.string().optional().nullable(),
        validation: QuestionValidationSchema.optional().nullable()
    })
    .strict()
    .merge(BaseQuestionSchema);

type QuestionDate = z.infer<typeof QuestionDateSchema>;

const QuestionTimeSchema = z
    .object({
        type: z.literal(questionTypes.TIME),
        questionNumber: z.number().min(1),
        title: z.string().max(1024),
        isRequired: z.boolean(),
        defaultValue: z.string().optional().nullable(),
        validation: QuestionValidationSchema.optional().nullable()
    })
    .strict()
    .merge(BaseQuestionSchema);

const BasePageSchema = z.object({
    isLocked: z.boolean(),
    isEditing: z.boolean()
});

const PageSchema = z
    .object({
        id: z.number().min(1),
        title: z.string().max(1024),
        showTitle: z.boolean(),
        description: z.string().max(2048),
        showDescription: z.boolean(),
        preventNewQuestions: z.boolean().optional(),
        visibleIf: VisibleIfSchema.optional(),
        questions: z
            .union([
                QuestionChoiceSchema,
                QuestionDateSchema,
                QuestionDateTimeSchema,
                QuestionDropdownSchema,
                QuestionMultilineSchema,
                QuestionGridSchema,
                QuestionNoteSchema,
                QuestionSingleLineSchema,
                QuestionTimeSchema
            ])
            .array()
    })
    .strict()
    .merge(BasePageSchema);

const FinalPageSchema = z.object({ content: z.string() }).merge(BasePageSchema).strict();

const SurveyLanguageTranslationsSchema = z.object({
    selectOption: z.string().min(1).max(255),
    next: z.string().min(1).max(255),
    previous: z.string().min(1).max(255),
    submit: z.string().min(1).max(255),
    surveyComplete: z.string().min(1).max(255),
    responseID: z.string().min(1).max(255),
    poweredBy: z.string().min(1).max(255),
    requiredQuestions: z.string().min(1).max(255),
    page: z.string().min(1).max(255),
    of: z.string().min(1).max(255),
    copyright: z.string().min(1).max(255),
    surveyContactDetails: z.string().min(1).max(255),
    reportAbuse: z.string().min(1).max(255),
    download: z.string().min(1).max(255)
});

type SurveyLanguageTranslations = z.infer<typeof SurveyLanguageTranslationsSchema>;

const SurveyThemeSchema = z
    .object({
        name: z.enum(['Dark red', 'Red', 'Pink', 'Purple', 'Dark purple', 'Dark blue', 'Blue', 'Dark green', 'Green']),
        main: z.enum([
            'bg-red-800',
            'bg-red-700',
            'bg-pink-700',
            'bg-fuchsia-700',
            'bg-indigo-800',
            'bg-blue-800',
            'bg-sky-700',
            'bg-green-700', // Backwards compatibility
            'bg-green-800',
            'bg-lime-700'
        ]),
        text: z.enum([
            'text-red-800',
            'text-red-700',
            'text-pink-700',
            'text-fuchsia-700',
            'text-indigo-800',
            'text-blue-800',
            'text-sky-700',
            'text-green-700', // Backwards compatibility
            'text-green-800',
            'text-lime-700'
        ]),
        hover: z.enum([
            'hover:bg-red-900',
            'hover:bg-red-800',
            'hover:bg-pink-800',
            'hover:bg-fuchsia-800',
            'hover:bg-indigo-900',
            'hover:bg-blue-900',
            'hover:bg-sky-800',
            'hover:bg-green-700', // Backwards compatibility
            'hover:bg-green-900',
            'hover:bg-lime-800'
        ]),
        borderTop: z.enum([
            'border-t-red-800',
            'border-t-red-700',
            'border-t-pink-700',
            'border-t-fuchsia-700',
            'border-t-indigo-800',
            'border-t-blue-800',
            'border-t-sky-700',
            'border-t-green-700', // Backwards compatibility
            'border-t-green-800',
            'border-t-lime-700'
        ])
    })
    .strict();

const SurveyLogoSchema = z
    .object({
        url: z.string().min(1).max(2048),
        alt: z.string().max(1024),
        size: z.enum(['100px', '200px', '500px', '800px', '100%']),
        position: z.enum(['0 0 0 auto', '0 auto', '0 auto 0 0'])
    })
    .strict()
    .optional();

export const SurveyJsonSchema = z
    .object({
        title: z.string().min(1).max(1024),
        description: z.string().max(2048),
        showDescription: z.boolean(),
        displayResponseID: z.boolean().optional(),
        displayResponseDownload: z.boolean().optional(),
        displayProgressBar: z.boolean().optional(),
        displayQuestionNumbers: z.boolean(),
        pageReorderingDisabled: z.boolean(),
        anonymous: z.boolean(),
        isEditing: z.boolean(),
        logo: SurveyLogoSchema,
        theme: SurveyThemeSchema,
        pages: z.array(PageSchema),
        finalPage: FinalPageSchema
    })
    .strict();
