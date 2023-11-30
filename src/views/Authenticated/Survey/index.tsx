import { Badge, Divider, Flex, Heading, Stack } from '@chakra-ui/react'
import { QuestionBlock, QuestionSet, Survey as SurveyType } from '@elilemons/diva-score-lib'
import { Layout } from '@root/components/elements/Layout'
import { ControlledCheckbox } from '@root/components/forms/fields/Checkbox/Controlled'
import { ControlledTextInput } from '@root/components/forms/fields/Text/Controlled'
import { ControlledTextAreaInput } from '@root/components/forms/fields/TextArea/Controlled'
import { Submit } from '@root/components/forms/Submit'
import { getSurveyByIdQuery } from '@root/queries/survey/getSurveyByIdQuery'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_CHECKBOX_SIZING, APP_SPACING } from '@root/utils/appStyling'
import { toastErrors } from '@root/utils/toastErrors'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const Survey: React.FC = () => {
  const { control, handleSubmit } = useForm<Partial<SurveyType>>()

  const { surveyId } = useParams<{ surveyId: string }>()
  const { data: surveyData, isError, error } = getSurveyByIdQuery({ surveyId })

  React.useEffect(() => {
    if (surveyData) {
      // TODO Remove this test code
      console.log('ELITEST survey loaded', { survey: surveyData })
      // ^ TODO Remove this test code
    }
  }, [surveyData])

  React.useEffect(() => {
    if (isError) {
      const e = error as GenericStatusErrorType
      toastErrors({ error: e, id: 'survey-load-error', title: 'Error loading survey' })
    }
  }, [isError, error])

  const onSubmit: SubmitHandler<Partial<SurveyType>> = async data => {
    try {
      // answer survey
      // TODO Remove this test code
      console.log('ELITEST submitted survey', { data })
      // ^ TODO Remove this test code
    } catch (e) {
      const error = e as GenericStatusErrorType
      toastErrors({
        error,
        id: 'sign-up-error',
        title: 'Account Creation Error',
        description: 'There was an error creating your account, please try again.',
      })
    }
  }

  return (
    <Layout
      topContent={<Heading data-cy='daily-survey-heading'>Daily Questions</Heading>}
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={APP_SPACING.spacing}>
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
                                />
                              )
                            case 'answerRichTextBlock':
                              return (
                                <ControlledTextAreaInput
                                  key={question.id}
                                  control={control}
                                  label={question.questionTextFields.question}
                                  name={question.questionFieldName}
                                />
                              )
                            default:
                              break
                          }
                        })}
                      <Divider />
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
      }
    />
  )
}

export default Survey
