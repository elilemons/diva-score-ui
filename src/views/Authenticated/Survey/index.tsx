/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Divider, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
import { QuestionBlock, QuestionSet, Survey as SurveyType } from '@elilemons/diva-score-lib'
import { Layout } from '@root/components/elements/Layout'
import { ControlledCheckbox } from '@root/components/forms/fields/Checkbox/Controlled'
import { ControlledTextInput } from '@root/components/forms/fields/Text/Controlled'
import { ControlledTextAreaInput } from '@root/components/forms/fields/TextArea/Controlled'
import { Submit } from '@root/components/forms/Submit'
import { getSurveyByIdQuery } from '@root/queries/survey/getSurveyByIdQuery'
import { saveSurveyMutation } from '@root/queries/survey/saveSurveyMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_CHECKBOX_SIZING, APP_SPACING } from '@root/utils/appStyling'
import { toastErrors } from '@root/utils/toastErrors'
import { SurveyLoadingSkeleton } from '@root/views/Authenticated/Survey/loading'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const Survey: React.FC = () => {
  const { control, handleSubmit } = useForm<Partial<SurveyType>>()

  const { surveyId } = useParams<{ surveyId: string }>()
  const { data: surveyData, isError, error, isLoading } = getSurveyByIdQuery({ surveyId })
  const saveSurvey = saveSurveyMutation({ mutationKey: 'save-survey' })

  const toast = useToast()

  React.useEffect(() => {
    if (isError) {
      const e = error as GenericStatusErrorType
      toastErrors({ error: e, id: 'survey-load-error', title: 'Error loading survey' })
    }
  }, [isError, error])

  const onSubmit: SubmitHandler<Partial<SurveyType>> = async data => {
    // TODO Remove this test code
    console.log('ELITEST survey submitted', { data })
    // ^ TODO Remove this test code
    try {
      await saveSurvey.mutateAsync({ surveyId, survey: data })
      const toastId = 'survey-update-success'
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: 'The survey has been saved.',
          status: 'success',
        })
      }
    } catch (e) {
      const error = e as GenericStatusErrorType
      toastErrors({
        error,
        id: 'survey-update-error',
        title: 'Survey Update Error',
        description: 'There was an error saving the survey, please try again.',
      })
    }
  }

  return (
    <Layout
      topContent={<Heading data-cy='daily-survey-heading'>Daily Questions</Heading>}
      bottomContent={
        isLoading ? (
          <SurveyLoadingSkeleton />
        ) : (
          <Stack spacing={APP_SPACING.spacing}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                {surveyData &&
                  surveyData.surveyQuestionSets &&
                  surveyData.surveyQuestionSets.map(qs => {
                    const questionSet = qs as QuestionSet

                    return (
                      <React.Fragment key={questionSet.id}>
                        <Flex alignItems='flex-start' gap={2}>
                          <Heading>{questionSet.title}</Heading>
                          {!!questionSet.pointValue && questionSet.pointValue > 0 && (
                            <Badge colorScheme='green'>{questionSet.pointValue}</Badge>
                          )}
                        </Flex>

                        {questionSet.questions &&
                          questionSet.questions.map(q => {
                            const question = q as QuestionBlock

                            switch (question.questionTextFields.answer[0].blockType) {
                              case 'answerTextBlock':
                                return (
                                  <ControlledTextInput
                                    key={question.id}
                                    control={control}
                                    label={question.questionTextFields.question}
                                    name={question.questionFieldName}
                                    defaultValue={
                                      question.questionTextFields.answer[0].answerTextFields
                                        ?.answerTextValue || ''
                                    }
                                  />
                                )
                              case 'answerCheckboxBlock':
                                return (
                                  <ControlledCheckbox
                                    key={question.id}
                                    size={APP_CHECKBOX_SIZING.size}
                                    control={control}
                                    label={question.questionTextFields.question}
                                    name={question.questionFieldName}
                                    defaultValue={
                                      question.questionTextFields.answer[0].answerCheckboxFields
                                        ?.answerCheckboxValue || false
                                    }
                                  />
                                )
                              case 'answerRichTextBlock':
                                return (
                                  <ControlledTextAreaInput
                                    key={question.id}
                                    control={control}
                                    label={question.questionTextFields.question}
                                    name={question.questionFieldName}
                                    defaultValue={
                                      (question.questionTextFields.answer[0].answerRichTextFields
                                        ?.answerRichTextValue as any) || ''
                                    }
                                  />
                                )
                              default:
                                break
                            }
                          })}
                        <Divider color='brand.300' />
                      </React.Fragment>
                    )
                  })}
                <Submit
                  label='Submit'
                  control={control}
                  colorScheme={APP_BRAND_BUTTON.colorScheme}
                  bgGradient={APP_BRAND_BUTTON.bgGradient}
                />
              </Stack>
            </form>
          </Stack>
        )
      }
    />
  )
}

export default Survey
