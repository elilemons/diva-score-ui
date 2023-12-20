/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Button,
  Divider,
  Fade,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { QuestionBlock, QuestionSet, Survey as SurveyType } from '@elilemons/diva-score-lib'
import { useWindowSize } from '@react-hook/window-size'
import { Layout } from '@root/components/elements/Layout'
import { ControlledCheckbox } from '@root/components/forms/fields/Checkbox/Controlled'
import { ControlledTextInput } from '@root/components/forms/fields/Text/Controlled'
import { ControlledTextAreaInput } from '@root/components/forms/fields/TextArea/Controlled'
import { Submit } from '@root/components/forms/Submit'
import { getSurveyByIdQuery } from '@root/queries/survey/getSurveyByIdQuery'
import { saveSurveyMutation } from '@root/queries/survey/saveSurveyMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import {
  APP_ACCENT_BUTTON,
  APP_BRAND_BUTTON,
  APP_CHECKBOX_SIZING,
  APP_SPACING,
} from '@root/utils/appStyling'
import { toastErrors } from '@root/utils/toastErrors'
import { SurveyLoadingSkeleton } from '@root/views/Authenticated/Survey/loading'
import { SurveyScoreAnimation } from '@root/views/Authenticated/Survey/scoreAnimation'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GiMagicBroom } from 'react-icons/gi'
import { useParams } from 'react-router-dom'

const Survey: React.FC = () => {
  const { control, reset, handleSubmit } = useForm<Partial<SurveyType>>()
  const { surveyId } = useParams<{ surveyId: string }>()
  const { data: surveyData, isError, error, isLoading } = getSurveyByIdQuery({ surveyId })

  const [showAnimation, setShowAnimation] = React.useState<boolean>(false)
  const [width, height] = useWindowSize()

  const saveSurvey = saveSurveyMutation({ mutationKey: 'save-survey' })
  const toast = useToast()

  React.useEffect(() => {
    if (isError) {
      const e = error as GenericStatusErrorType
      toastErrors({ error: e, id: 'survey-load-error', title: 'Error loading survey' })
    }
  }, [isError, error])

  const blankState = {
    body1: false,
    body2: false,
    mind1: false,
    spirit1: '',
    connection1: false,
    goals1: '',
    goals2: false,
    other1: '',
  } as Partial<SurveyType>

  const onSubmit: SubmitHandler<Partial<SurveyType>> = async data => {
    try {
      await saveSurvey.mutateAsync({ surveyId, survey: data }).then(res => {
        if (res && res.doc && res.doc.pointsEarned && res.doc.pointsEarned > 0) {
          setShowAnimation(true)
        }
      })

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
    <>
      {showAnimation ? (
        <Fade in={showAnimation} transition={{ enter: { duration: 1 }, exit: { duration: 1 } }}>
          <SurveyScoreAnimation
            score={surveyData?.pointsEarned || 0}
            width={width}
            height={height}
            onClose={() => setShowAnimation(false)}
          />
        </Fade>
      ) : (
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
                      surveyData.surveyQuestionSets.map((qs, index) => {
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
                              questionSet.questions.map((question: QuestionBlock) => {
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
                                          (question.questionTextFields.answer[0]
                                            .answerRichTextFields?.answerRichTextValue as any) || ''
                                        }
                                      />
                                    )
                                  default:
                                    break
                                }
                              })}
                            {surveyData &&
                              surveyData.surveyQuestionSets &&
                              index < surveyData.surveyQuestionSets.length - 1 && (
                                <Divider color='brand.300' />
                              )}
                          </React.Fragment>
                        )
                      })}
                    <Box py={1} position='relative'>
                      <Box position='absolute' top='-2' width='100%'>
                        {!!surveyData &&
                          !!surveyData.pointsEarned &&
                          surveyData.pointsEarned > 0 && (
                            <Flex data-cy='score' alignItems='center' justifyContent='center'>
                              <Text
                                color={'brand.500'}
                                bgGradient={APP_BRAND_BUTTON.bgGradient}
                                bgClip='text'
                                fontWeight={600}
                              >
                                Current Score: {surveyData.pointsEarned}
                              </Text>
                            </Flex>
                          )}
                      </Box>
                    </Box>

                    <Flex
                      width={'100%'}
                      alignItems='stretch'
                      justifyContent='space-between'
                      gap={2}
                    >
                      <Button
                        data-cy='clear'
                        leftIcon={<GiMagicBroom />}
                        variant='outline'
                        colorScheme={APP_ACCENT_BUTTON.colorScheme}
                        width={'100%'}
                        onClick={() =>
                          reset(blankState, { keepValues: false, keepDefaultValues: false })
                        }
                      >
                        Clear
                      </Button>
                      <Submit
                        label='Submit'
                        control={control}
                        colorScheme={APP_BRAND_BUTTON.colorScheme}
                        bgGradient={APP_BRAND_BUTTON.bgGradient}
                        width={'100%'}
                      />
                    </Flex>
                  </Stack>
                </form>
              </Stack>
            )
          }
        />
      )}
    </>
  )
}

export default Survey
